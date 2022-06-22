import React from 'react';
import { Container } from 'react-bootstrap';
import { useLocation, Navigate } from 'react-router-dom';
import LoginForm from '../components/login-register/LoginForm';
import RegisterForm from '../components/login-register/RegisterForm';

const Login = () => {
  const location = useLocation();

  return (
    <Container
      as='section'
      fluid
      className='d-flex justify-content-center align-items-center min-vh-100'
    >
      {location.pathname === '/authenticate/login' ? (
        <LoginForm />
      ) : location.pathname === '/authenticate/register' ? (
        <RegisterForm />
      ) : (
        <Navigate to='/*' />
      )}
    </Container>
  );
};

export default Login;
