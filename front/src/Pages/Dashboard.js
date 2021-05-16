import React from 'react';
import axios from 'axios';
import { Toast } from 'toaster-js';
import { Link, withRouter } from 'react-router-dom';

const Dashboard = (props) => {
  const [chatrooms, setChatrooms] = React.useState([]);

  React.useEffect(() => {
    getChatrooms();
    //eslint-disable-next-line
  }, []);

  const getChatrooms = () => {
    axios
      .get('http://localhost:5000/chatroom', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setChatrooms(response.data);
      })
      .catch((err) => {
        // setTimeout(getChatrooms(), 3000);
        console.log(err.response.data.message);
        new Toast(err.response.data.message, Toast.TYPE_ERROR, 2000);
      });
  };

  const chatroomNameRef = React.createRef();

  const createChatroom = () => {
    const chatroomName = chatroomNameRef.current.value;
    axios
      .post('http://localhost:5000/chatroom', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        name: chatroomName,
      })
      .then((response) => {
        new Toast(response.data.message, Toast.TYPE_DONE, 2000);
      })
      .catch((err) => {
        // setTimeout(getChatrooms(), 3000);
        new Toast(err.response.data.message, Toast.TYPE_ERROR, 2000);
        if (err.response.data.message === 'Unauthorized') {
          props.history.push('./login');
        }
        console.log(err.response.data.message);
      });
  };

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
            ref={chatroomNameRef}
          />
        </div>

        <button onClick={createChatroom} className="mainButton">
          Create Chatroom
        </button>

        <div className="chatrooms">
          {chatrooms.map((chatroom) => (
            <div key={chatroom._id} className="chatroom">
              <div>{chatroom.name}</div>
              <Link to={'/chatroom/' + chatroom._id}>
                <button>Join</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Dashboard);
