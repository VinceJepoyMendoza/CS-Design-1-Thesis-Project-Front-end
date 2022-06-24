import React from 'react';

import { Container } from 'react-bootstrap';
import { Routes, Route, Navigate } from 'react-router-dom';
import Products from '../components/dashboard/Products';
import AccountSettings from '../components/dashboard/AccountSettings';

const Dashboard = () => {
  return (
    <Container fluid='md' as='section' className='py-4'>
      <Routes>
        <Route path='/products' element={<Products />} />
        <Route path='/account-settings' element={<AccountSettings />} />
        <Route path='/*' element={<Navigate to='/*' />} />
      </Routes>
    </Container>
  );
};

export default Dashboard;
