import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from './store/actions/userActions';

import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navigation from './components/general/Navigation';
import Contact from './pages/Contact';
import NotFound from './components/general/NotFound';

const App = () => {
  const token = localStorage.getItem('SPGBMToken');
  const { info } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // Fetch user infos with token
  useEffect(() => {
    token && dispatch(fetchUserInfo());
  }, [token, dispatch]);

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path='/' element={<Navigate to='/welcome' />} />
        <Route path='/welcome' element={<Home />} />
        <Route
          path='/authenticate/login'
          element={!info.fname ? <Login /> : <Navigate to='/welcome' />}
        />
        <Route
          path='/authenticate/register'
          element={!info.fname ? <Login /> : <Navigate to='/welcome' />}
        />
        <Route path='/dashboard/*' element={<Dashboard />} />
        <Route path='/*' element={<Navigate to='/page-not-found' />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/page-not-found' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
