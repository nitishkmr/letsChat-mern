import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const ChatroomPage = ({ match, socket }) => {
  const chatroomId = match.params.id;

  return (
    <div className="chatroomBox">
      <div className="chatroomSection">
        <div className="cardHeader">Chatroom Name</div>
        <div className="chatroomContent">
          <div className="message">
            <span className="otherMessage">Kit:</span> Hello
          </div>
          <div className="message">
            <span className="ownMessage">Me:</span> Hello Kit
          </div>
        </div>
      </div>
      <div className="chatroomAction">
        <input
          className="inputBox"
          type="text"
          name="message"
          placeholder="Say something!"
        />
        <button className="join">Send</button>
      </div>
    </div>
  );
};

export default withRouter(ChatroomPage);
