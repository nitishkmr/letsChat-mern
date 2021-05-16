import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ChatroomPage from './Pages/ChatroomPage';
import Dashboard from './Pages/Dashboard';
import IndexPage from './Pages/IndexPage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import io from 'socket.io-client';
import { Toast } from 'toaster-js';

function App() {
  // socket functionality is created in App.js, Login component will be used to call setSocket(), then the created 'socket' will be sent to other components
  // since sending via props in req here, so render is used below
  const [socket, setSocket] = React.useState(null);

  React.useEffect(() => {
    setupSocket();
    //esline-disable-next-line
  }, []);

  const setupSocket = () => {
    const token = localStorage.getItem('token');
    if (token.length > 0 && !socket) {
      const newSocket = io('http://localhost:5000', {
        query: {
          token: localStorage.getItem('token'),
        },
      });

      newSocket.on('disconnect', () => {
        setSocket(null);
        // setTimeout(setupSocket, 3000);
        new Toast('Socket Disconnected', Toast.TYPE_ERROR, 2000);
      });

      newSocket.on('connect', () => {
        new Toast('Socket Connected', Toast.TYPE_DONE, 2000);
      });
      setSocket(newSocket);
    }
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={IndexPage} exact />
        <Route
          path="/login"
          render={() => <Login setupSocket={setupSocket} />}
          exact
        />
        <Route path="/register" component={Register} exact />
        <Route
          path="/dashboard"
          render={() => <Dashboard setupSocket={socket} />}
          exact
        />
        <Route
          path="/chatroom/:id"
          render={() => <ChatroomPage setupSocket={socket} />}
          exact
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
