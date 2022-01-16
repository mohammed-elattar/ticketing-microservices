import React from 'react';

const LandingPage = () => {
  return <div>Mohammed Elattar</div>;
};

LandingPage.getInitialProps = async () => {
  if (typeof window === undefined) {
    // we are on the server and the request should be made to ingress service
  } else {
    // we are on the client and the request can be made to the '/api' directly
  }
};

export default LandingPage;
