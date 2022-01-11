import axios from 'axios';
import React, { useState } from 'react';
const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);
  const doRequest = async () => {
    try {
      const response = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      console.log(error);
      setErrors(
        <div className='alert alert-danger'>
          <h4>Oops...</h4>
          <ul className='my-0'>
            {error.response.data.errors.map((error) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };
  return { doRequest, errors };
};

export default useRequest;
