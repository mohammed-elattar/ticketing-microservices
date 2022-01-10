import axios from 'axios';
import React, { useState } from 'react';

const signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/users/signup', {
        email,
        password,
      });
    } catch (error) {
      setErrors(error.response.data.errors);
    }
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
      {errors.length > 0 && (
        <div className='alert alert-danger'>
          <h4>Oops...</h4>
          <ul className='my-0'>
            {errors.map((error) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        </div>
      )}
      <button type='submit' className='btn btn-primary'>
        Submit
      </button>
    </form>
  );
};

export default signup;
