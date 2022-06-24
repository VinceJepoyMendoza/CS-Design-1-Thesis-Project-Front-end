import React, { useState, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../store/actions/userActions';
import Loader from '../general/Loader';
import PopupMessage from '../general/PopupMessage';

const AccountSettingsModal = ({
  show,
  setShowModal,
  id,
  isLoading,
  popupMessage,
}) => {
  const [isContinued, setIsContinued] = useState(false);
  const password = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(deleteUser(id, password.current.value));
  };

  return (
    <Modal show={show} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isContinued ? (
          'Are you sure you want to delete your account?'
        ) : (
          <Form>
            <Form.Group>
              <Form.Label>Please enter your password to continue</Form.Label>
              <span className='text-danger '>*</span>
              <Form.Control
                type='password'
                placeholder='Confirm Password'
                ref={password}
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button
          variant='danger'
          type='button'
          onClick={() => {
            !isContinued ? setIsContinued(true) : handleSubmit();
          }}
        >
          {isLoading ? (
            <Loader />
          ) : isContinued ? (
            'Delete Account Permanently'
          ) : (
            'Continue'
          )}
        </Button>
        <PopupMessage
          show={popupMessage.show}
          type={popupMessage.type}
          message={popupMessage.message}
          className='w-100 mt-3'
        />
      </Modal.Footer>
    </Modal>
  );
};

export default AccountSettingsModal;
