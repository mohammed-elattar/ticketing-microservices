import React from 'react';
import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  return <div>{currentUser ? 'signedIn' : 'Not Signedin'}</div>;
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  try {
    const { data } = await client.get('/api/users/currentuser');

    return data;
  } catch (error) {
    return { currentUser: null };
  }
};

export default LandingPage;
