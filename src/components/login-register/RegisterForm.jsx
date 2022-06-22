import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Form, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { registerNewUser } from '../../store/actions/userActions';
import PopupMessage from '../general/PopupMessage';

const RegisterForm = () => {
  const { isLoading, popupMessage } = useSelector((state) => state.general);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    const clearInputs = () => e.target.reset();

    const userInfo = {
      fname: e.target[0].value,
      mname: e.target[1].value,
      lname: e.target[2].value,
      contact: e.target[3].value,
      email: e.target[4].value,
      password: e.target[5].value,
      confirmPassword: e.target[6].value,
    };
    // Send register attempt
    dispatch(registerNewUser(userInfo, clearInputs));
  };

  return (
    <Form
      className='bg-secondary p-4 p-lg-5 login-form d-flex flex-column gap-2 mt-3'
      onSubmit={submitHandler}
    >
      <Form.Group>
        <Form.Label>First name</Form.Label>
        <span className='text-danger '>*</span>
        <Form.Control type='text' placeholder='Enter first name' size='lg' />
      </Form.Group>
      <Form.Group>
        <Form.Label>Middle name</Form.Label>
        <Form.Control type='text' placeholder='Enter middle name' size='lg' />
      </Form.Group>
      <Form.Group>
        <Form.Label>Last name</Form.Label>
        <span className='text-danger '>*</span>
        <Form.Control type='text' placeholder='Enter last name' size='lg' />
      </Form.Group>
      <Form.Group>
        <Form.Label>Contact</Form.Label>
        <Form.Control type='text' placeholder='Enter contact' size='lg' />
      </Form.Group>
      <Form.Group controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <span className='text-danger '>*</span>
        <Form.Control type='email' placeholder='Enter email' size='lg' />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <span className='text-danger '>*</span>
        <Form.Control type='password' placeholder='Password' size='lg' />
      </Form.Group>
      <Form.Group>
        <Form.Label>Confirm password</Form.Label>
        <span className='text-danger '>*</span>
        <Form.Control
          type='password'
          placeholder='Confirm Password'
          size='lg'
        />
      </Form.Group>
      <footer className='d-flex flex-column gap-4 text-center mt-2'>
        <Button variant='primary' type='submit' size='lg' className='w-100'>
          {isLoading ? (
            <Spinner animation='border' variant='light' />
          ) : (
            'Register'
          )}
        </Button>
        <small>
          Already have an account? <Link to='/authenticate/login'>Login</Link>{' '}
          now.
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

export default RegisterForm;
