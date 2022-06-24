import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NoUser = () => {
  return (
    <Container className='text-center py-5'>
      <h1>You must Login First to access this page</h1>
      <h4 className='mt-5'>
        Go to{' '}
        <Link to='/authenticate/login' className='text-white'>
          Login{' '}
        </Link>
        Page
      </h4>
    </Container>
  );
};

export default NoUser;
