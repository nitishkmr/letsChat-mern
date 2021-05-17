import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Toast } from 'toaster-js';

const ChatroomPage = ({ match, socket, history }) => {
  const chatroomId = match.params.id;
  const [messages, setMessages] = React.useState([]);
  const messageRef = React.useRef();
  const [loading, setLoading] = React.useState(true);
  const [prevMessages, setPrevMessages] = React.useState([]);
  const [roomName, setRoomName] = React.useState('');

  React.useEffect(() => {
    // console.log('CALLED');
    // console.log(socket);
    if (socket) {
      socket.on('newMessage', (message) => {
        setMessages([...messages, message]);
        // console.log(message);
      });
    }
  }, [messages]);

  React.useEffect(() => {
    if (socket) {
      getRoomInfo();
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

  const getRoomInfo = () => {
    axios
      .post('http://localhost:5000/chatroom/chatroomInfo', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        chatroomId,
      })
      .then((response) => {
        setPrevMessages(response.data.prevMessages);
        setRoomName(response.data.chatroomName);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err.response.data.message);
        new Toast(err, Toast.TYPE_ERROR, 2000);
      });
  };

  return (
    <div className="chatroomBox">
      <button
        className="logoutbutton"
        onClick={() => history.push('/dashboard')}
      >
        Back to Dashboard
      </button>
      <div className="chatroomSection">
        {loading ? (
          <div className="cardHeader">Loading ... </div>
        ) : (
          <div className="cardHeader">{roomName} </div>
        )}

        <div className="chatroomContent">
          {loading ? (
            <div> Loading previous messages... please wait </div>
          ) : (
            prevMessages.map((prevMsg, i) => (
              <div key={i} className="message">
                <span className="otherMessage">{prevMsg.username}: </span>
                {prevMsg.message}
              </div>
            ))
          )}

          {messages.map((message, i) => (
            <div key={i} className="message">
              <span className="otherMessage">{message.name}: </span>
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
