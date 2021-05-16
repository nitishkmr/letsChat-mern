import React from 'react';
import axios from 'axios';
import { Toast } from 'toaster-js';

const Register = (props) => {
  const nameRef = React.createRef();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const registerUser = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post('http://localhost:5000/user/register', {
        name,
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        new Toast(response.data.message, Toast.TYPE_DONE, 2000);
        props.history.push('/login');
      })
      .catch((err) => {
        console.log(err.response.data.message);
        new Toast(err.response.data.message, Toast.TYPE_ERROR, 2000);
      });
  };

  return (
    <div className="box">
      <div className="cardHeader">Register</div>
      <div className="cardBody">
        <div className="inputGroup">
          <p>Name</p>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your Name"
            ref={nameRef}
          />
        </div>
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
        <button onClick={registerUser} className="mainButton">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
