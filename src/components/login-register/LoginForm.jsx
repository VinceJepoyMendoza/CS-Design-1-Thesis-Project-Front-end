import React from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { attemptLogin } from '../../store/actions/userActions';
import PopupMessage from '../general/PopupMessage';

const LoginAccount = () => {
  const dispatch = useDispatch();
  const { isLoading, popupMessage } = useSelector((state) => state.general);

  const submit = (e) => {
    e.preventDefault();
    const creds = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    dispatch(attemptLogin(creds));
  };

  return (
    <Form
      className='bg-secondary p-4 p-lg-5 login-form d-flex flex-column gap-4'
      onSubmit={submit}
    >
      <Form.Group controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control type='email' placeholder='Enter email' size='lg' />
      </Form.Group>
      <Form.Group controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='Password' size='lg' />
      </Form.Group>
      <footer className='d-flex flex-column gap-4 text-center'>
        <Button variant='primary' type='submit' size='lg' className='w-100'>
          {isLoading ? <Spinner animation='border' variant='light' /> : 'Login'}
        </Button>
        <small>
          Don't have an account?{' '}
          <Link to='/authenticate/register'>Register</Link> now.
        </small>
      </footer>
      <PopupMessage
        show={popupMessage.show}
        type={popupMessage.type}
        message={popupMessage.message}
      />
    </Form>
  );
};

export default LoginAccount;
