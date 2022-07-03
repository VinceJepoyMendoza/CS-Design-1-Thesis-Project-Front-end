import React from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Products from '../components/dashboard/Products';
import AccountSettings from '../components/dashboard/AccountSettings';
import UserList from '../components/dashboard/UsersList';

const Dashboard = () => {
  const { _id } = useSelector((state) => state.user.info);

  return !_id ? (
    <Container className='py-5 text-center'>
      <h1>Please login first to access this route</h1>
      <Link to='/authenticate/login' className='btn btn-primary px-4'>
        Login
      </Link>
    </Container>
  ) : (
    <Container fluid='md' as='section' className='py-4'>
      <Routes>
        <Route path='/users' element={<UserList />} />
        <Route path='/products' element={<Products />} />
        <Route path='/account-settings' element={<AccountSettings />} />
        <Route path='/*' element={<Navigate to='/*' />} />
      </Routes>
    </Container>
  );
};

export default Dashboard;
