import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  try {
    const { data } = await client.get('/api/users/currentuser');
    console.log(data);
    return { pageProps, currentUser: data.currentUser };
  } catch (error) {
    return { pageProps, currentUser: null };
  }
};

export default AppComponent;
