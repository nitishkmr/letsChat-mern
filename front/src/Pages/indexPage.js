import React from 'react';

const IndexPage = (props) => {
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      props.history.push('/login');
    } else {
      props.history.push('/dashboard');
    }
    // esline-disable-next-line
  }, [props]);

  return <></>;
};

export default IndexPage;
