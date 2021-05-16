import React from 'react';
import axios from 'axios';
import { Toast } from 'toaster-js';
import { withRouter } from 'react-router-dom';

const Login = (props) => {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const loginUser = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post('http://localhost:5000/user/login', {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        new Toast(response.data.message, Toast.TYPE_DONE, 2000);
        localStorage.setItem('token', response.data.token);
        props.history.push('/dashboard');
        props.setupSocket();
      })
      .catch((err) => {
        console.log(err.response.data.message);
        new Toast(err.response.data.message, Toast.TYPE_ERROR, 2000);
      });
  };

  return (
    <div className="box">
      <div className="cardHeader">Login</div>
      <div className="cardBody">
        <div className="inputGroup">
          <p>Email</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            ref={emailRef}
          />
        </div>
        <div className="inputGroup">
          <p>Password</p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            ref={passwordRef}
          />
        </div>
        <button onClick={loginUser} className="mainButton">
          Login
        </button>
        <br />
        <p>Not registered?</p>

        <button
          onClick={() => {
            props.history.push('/register');
          }}
          className="mainButton"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default withRouter(Login); // since render was used in App.js instead of component so props wouldn't have been avlbl
