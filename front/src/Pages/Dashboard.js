import React from 'react';

const Dashboard = () => {
  return (
    <div className="box">
      <div className="cardHeader">Chatrooms</div>
      <div className="cardBody">
        <div className="inputGroup">
          <p>Chatroom Name</p>
          <input
            type="text"
            name="chatroomName"
            id="chatroomName"
            placeholder="Enter a new Chatroom name"
          />
        </div>

        <button className="mainButton">Create Chatroom</button>

        <div className="chatrooms">
          <div className="chatroom">
            <div>Chatroom1</div>
            <button>Join</button>
          </div>
          <div className="chatroom">
            <div>Chatroom2</div>
            <button>Join</button>
          </div>
          <div className="chatroom">
            <div>Chatroom3</div>
            <button>Join</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
