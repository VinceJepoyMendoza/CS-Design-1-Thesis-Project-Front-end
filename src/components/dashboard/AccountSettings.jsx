import React, { useState } from 'react';

import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../store/reducers/userSlice';
import { updateUserInfo } from '../../store/actions/userActions';
import Loader from '../general/Loader';
import PopupMessage from '../general/PopupMessage';
import Title from '../general/Title';
import AccountSettingsModal from './AccountSettingsModal';
import NoUser from '../general/NoUser';

const AccountSettings = () => {
  const { isLoading, popupMessage } = useSelector((state) => state.general);
  const {
    setUserFname,
    setUserMname,
    setUserLname,
    setUserContact,
    setUserEmail,
  } = userActions;
  const { _id, fname, mname, lname, contact, email } = useSelector(
    (state) => state.user.info
  );
  const [confirmPassword, setconfirmPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  // Send user update request
  const submitHandler = (e) => {
    e.preventDefault();
    const infos = {
      fname,
      mname,
      lname,
      contact,
      email,
      confirmPassword,
    };
    // Add password if exist
    const password = e.target[5].value;
    if (password) infos.password = password;

    dispatch(updateUserInfo(_id, infos, setIsEditing, setconfirmPassword));
  };

  return fname ? (
    <Form
      className='bg-secondary p-4 p-lg-5 login-form d-flex flex-column gap-2 mx-auto'
      onSubmit={submitHandler}
    >
      <Title text='Account Settings' />
      <Form.Group>
        <Form.Label>First name</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter first name'
          size='lg'
          disabled={isLoading || !isEditing}
          value={fname}
          onChange={(e) => {
            dispatch(setUserFname(e.target.value));
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Middle name</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter middle name'
          size='lg'
          disabled={isLoading || !isEditing}
          value={mname}
          onChange={(e) => dispatch(setUserMname(e.target.value))}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Last name</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter last name'
          size='lg'
          disabled={isLoading || !isEditing}
          value={lname}
          onChange={(e) => dispatch(setUserLname(e.target.value))}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Contact</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter contact'
          size='lg'
          disabled={isLoading || !isEditing}
          value={contact}
          onChange={(e) => dispatch(setUserContact(e.target.value))}
        />
      </Form.Group>
      <Form.Group controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter email'
          size='lg'
          disabled={isLoading || !isEditing}
          value={email}
          onChange={(e) => dispatch(setUserEmail(e.target.value))}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          size='lg'
          disabled={isLoading || !isEditing}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Confirm password</Form.Label>
        <span className='text-danger '>*</span>
        <Form.Control
          type='password'
          placeholder='Confirm Password'
          size='lg'
          disabled={isLoading || !isEditing}
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
        />
      </Form.Group>
      <footer className='d-flex flex-column gap-4 text-center mt-2'>
        <Button
          variant={isEditing ? 'danger' : 'primary'}
          type='button'
          size='lg'
          disabled={isLoading}
          className='w-100'
          onClick={() => setIsEditing((e) => !e)}
        >
          {isLoading ? <Loader /> : isEditing ? 'Cancel' : 'Edit'}
        </Button>
        <Button
          variant='success'
          type='submit'
          size='lg'
          className={`w-100 d-${isEditing ? 'block' : 'none'}`}
        >
          {isLoading ? <Loader /> : 'Submit Changes'}
        </Button>
        <Button
          variant='danger'
          type='button'
          size='lg'
          className={`w-100 d-${!isEditing ? 'block' : 'none'}`}
          onClick={() => setShowModal(true)}
        >
          Delete Account
        </Button>
      </footer>
      <PopupMessage
        show={popupMessage.show}
        type={popupMessage.type}
        message={popupMessage.message}
      />
      {showModal && (
        <AccountSettingsModal
          show={showModal}
          setShowModal={setShowModal}
          id={_id}
          isLoading={isLoading}
          popupMessage={popupMessage}
        />
      )}
    </Form>
  ) : (
    <NoUser />
  );
};

export default AccountSettings;
