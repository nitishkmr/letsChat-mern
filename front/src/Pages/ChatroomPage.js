import React from 'react';
import { withRouter } from 'react-router-dom';

const ChatroomPage = ({ match, socket }) => {
  const chatroomId = match.params.id;
  const [messages, setMessages] = React.useState([]);
  const messageRef = React.useRef();

  React.useEffect(() => {
    // console.log('CALLED');
    // console.log(socket);
    if (socket) {
      socket.on('newMessage', (message) => {
        setMessages([...messages, message]);
        console.log(message);
      });
    }
  }, [messages]);

  React.useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', {
        chatroomId,
      });
    }

    return () => {
      // when component will unmount
      if (socket) {
        socket.emit('leaveRoom', {
          chatroomId,
        });
      }
    };
    // eslint-disable-next-line
  }, []);

  const sendMessage = () => {
    if (socket) {
      console.log(messageRef.current.value);
      socket.emit('chatroomMessage', {
        chatroomId,
        message: messageRef.current.value,
      });
      messageRef.current.value = '';
    }
  };

  return (
    <div className="chatroomBox">
      <div className="chatroomSection">
        <div className="cardHeader">Chatroom Name</div>
        <div className="chatroomContent">
          {messages.map((message, i) => (
            <div key={i} className="message">
              <span className="otherMessage">{message.name}:</span>
              {message.message}
            </div>
          ))}
        </div>
      </div>
      <div className="chatroomAction">
        <input
          className="inputBox"
          type="text"
          name="message"
          placeholder="Say something!"
          ref={messageRef}
        />
        <button onClick={sendMessage} className="join">
          Send
        </button>
      </div>
    </div>
  );
};

export default withRouter(ChatroomPage);
