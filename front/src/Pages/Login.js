import React from 'react';

const Login = () => {
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
          />
        </div>
        <div className="inputGroup">
          <p>Password</p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <button className="mainButton">Login</button>
      </div>
    </div>
  );
};

export default Login;
