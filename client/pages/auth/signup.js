import Router from 'next/router';
import React, { useState } from 'react';
import useRequest from '../../hooks/use-request';

const signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    doRequest();
  };
  return (
    <form onSubmit={onSubmit}>
      <h1>Sign up </h1>
      <div className='form-group'>
        <label>Email address</label>
        <input
          type='email'
          className='form-control'
          placeholder='Enter email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className='form-group'>
        <label>Password</label>
        <input
          type='password'
          className='form-control'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errors}
      <button type='submit' className='btn btn-primary'>
        Login
      </button>
    </form>
  );
};

export default signup;
