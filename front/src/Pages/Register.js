import React from 'react';

const Register = () => {
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
          />
        </div>
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
        <button className="mainButton">Register</button>
      </div>
    </div>
  );
};

export default Register;
