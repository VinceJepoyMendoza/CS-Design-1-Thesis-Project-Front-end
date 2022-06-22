import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({ variant }) => {
  return <Spinner animation='border' variant={variant || 'light'} />;
};

export default Loader;
