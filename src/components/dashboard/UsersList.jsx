import React, { useEffect, useState, useRef } from 'react';
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Button,
  Modal,
} from 'react-bootstrap';
import { fetchUsers } from '../../store/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { updateRole, deleteUser } from '../../store/actions/userActions';
import User from './User';
import Title from '../general/Title';
import PopupMessage from '../general/PopupMessage';
import Loader from '../general/Loader';

const Users = () => {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.user.info);
  const { userList } = useSelector((state) => state.user);
  const { isLoading, popupMessage } = useSelector((state) => state.general);
  // Filter users
  const [filter, setFilter] = useState('all');
  const admins = userList.filter((user) => user.role === 'admin');
  const users = userList.filter((user) => user.role === 'user');
  const [modalInfo, setModalInfo] = useState({
    show: false,
    user: {},
    isDone: false,
    action: 'update',
    isContinue: false,
  });
  const confPassword = useRef(null);

  const newUserList =
    filter === 'admin' ? admins : filter === 'user' ? users : userList;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const searchUser = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
  };

  const confirmDelete = () =>
    dispatch(deleteUser(modalInfo.user._id, confPassword.current.value));

  // Current user is not admin
  if (currUser.role !== 'admin')
    return (
      <h1 className='text-center py-5'>
        Eror 401: Unauthorized. <br />
        Only System Admin is allowed to access this route.
      </h1>
    );

  return (
    <Container className='py-4'>
      <Title text='Users list' />
      <Row className='mt-5 mb-4'>
        <Col className='d-flex gap-2 align-items-center'>
          <h5 className='pe-3'>Filter:</h5>
          <Button variant='light' onClick={() => setFilter('all')}>
            All
          </Button>
          <Button variant='info' onClick={() => setFilter('admin')}>
            Admins
          </Button>
          <Button variant='warning' onClick={() => setFilter('user')}>
            Users
          </Button>
        </Col>
        <Col>
          <Form className='d-flex gap-2' onSubmit={searchUser}>
            <Form.Group className='w-100'>
              <Form.Control type='text' placeholder="Enter user's name" />
            </Form.Group>
            <Button type='submit'>Search</Button>
          </Form>
        </Col>
      </Row>
      <Table variant='dark' striped bordered hover>
        <thead>
          <tr className='text-center'>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>isAdmin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {newUserList.map((user, index) => (
            <User
              user={user}
              key={index}
              filter={filter}
              setModalInfo={setModalInfo}
              isCurrUser={currUser._id === user._id}
            />
          ))}
        </tbody>
      </Table>
      <Modal
        show={modalInfo.show}
        onHide={() => setModalInfo({ show: false, user: {} })}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modalInfo.action === 'update'
              ? "Update user's role"
              : 'Delete user'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!modalInfo.isContinue ? (
            <p>Are you sure to save changes?</p>
          ) : (
            <Form>
              <Form.Group>
                <Form.Label>
                  Confirm your password <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  type='password'
                  placeholder='password'
                  ref={confPassword}
                />
              </Form.Group>
            </Form>
          )}
          <PopupMessage
            show={popupMessage.show}
            type={popupMessage.type}
            message={popupMessage.message}
            className='mt-3'
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => setModalInfo({ show: false })}
          >
            Close
          </Button>
          <Button
            variant='primary'
            className={`d-${modalInfo.isDone ? 'none' : 'inline-block'}`}
            onClick={() => {
              if (modalInfo.isContinue) return confirmDelete();

              modalInfo.action === 'update'
                ? dispatch(
                    updateRole(
                      modalInfo.user._id,
                      modalInfo.user.isAdmin ? 'user' : 'admin',
                      setModalInfo
                    )
                  )
                : setModalInfo((e) => {
                    return {
                      ...e,
                      isContinue: true,
                      action: 'delete',
                    };
                  });
            }}
          >
            {isLoading ? (
              <Loader />
            ) : modalInfo.action !== 'update' ? (
              'Continue'
            ) : !modalInfo.isContinue ? (
              'Update user'
            ) : (
              'Delete user'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Users;
