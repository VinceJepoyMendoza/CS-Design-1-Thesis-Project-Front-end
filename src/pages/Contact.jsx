import React, { useRef } from 'react';
import { Container, Form, FloatingLabel, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { generalActions } from '../store/reducers/generalSlice';
import emailjs from '@emailjs/browser';
import Loader from '../components/general/Loader';
import PopupMessage from '../components/general/PopupMessage';
import Title from '../components/general/Title';

const Contact = () => {
  const { isLoading, popupMessage } = useSelector((state) => state.general);
  const form = useRef();
  const dispatch = useDispatch();

  const sendForm = (e) => {
    e.preventDefault();

    // Start loading
    dispatch(generalActions.setIsLoading(true));

    // Send email to gmail
    emailjs
      .sendForm(
        'service_rxtpn0i',
        'template_953ffav',
        form.current,
        'AoeIAe8NJ7nHJMxIy'
      )
      .then(() => {
        e.target.reset();

        dispatch(
          generalActions.setPopupMessage({
            show: true,
            type: 'success',
            message: 'Message successful',
          })
        );

        // Stop loading
        dispatch(generalActions.setIsLoading(false));
      })
      .catch((err) => {
        dispatch(
          generalActions.setPopupMessage({
            show: true,
            type: 'danger',
            message: err.text,
          })
        );

        // Stop loading
        dispatch(generalActions.setIsLoading(false));
      });
  };

  return (
    <Container as='section' fluid='sm' className='contact-form'>
      <Title text='Have any questions?' />
      <Form
        onSubmit={sendForm}
        ref={form}
        className='bg-light mt-3 p-5 d-flex flex-column gap-3'
      >
        <FloatingLabel label='name' className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Enter name'
            name='name'
            className='border border-dark'
          />
        </FloatingLabel>
        <FloatingLabel label='topic' className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Enter Topic'
            name='topic'
            className='border border-dark'
          />
        </FloatingLabel>
        <FloatingLabel label='contact' className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Enter Contact'
            name='contact'
            className='border border-dark'
          />
        </FloatingLabel>
        <FloatingLabel label='message' className='mb-3'>
          <Form.Control
            as='textarea'
            placeholder='Enter Message'
            name='message'
            className='border border-dark'
            style={{ height: '250px' }}
          />
        </FloatingLabel>
        <Button type='submit' variant='outline-dark'>
          {isLoading ? <Loader variant='primary' /> : 'Send Message'}
        </Button>
        <PopupMessage
          show={popupMessage.show}
          type={popupMessage.type}
          message={popupMessage.message}
        />
      </Form>
    </Container>
  );
};

export default Contact;
