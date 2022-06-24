import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { generalActions } from '../../store/reducers/generalSlice';

import { Alert } from 'react-bootstrap';

const PopupMessage = ({ show, type, message, className }) => {
  let customMessage = null;
  const dispatch = useDispatch();
  const popup = useSelector((state) => state.general.popupMessage);

  useEffect(() => {
    const timeout = setTimeout(
      () => dispatch(generalActions.setPopupMessage({ show: false })),
      3500
    );
    return () => clearTimeout(timeout);
  }, [popup, dispatch]);

  // Message is object
  if (typeof message === 'object') {
    const inputs = message.inputs;
    customMessage = (
      <span>
        {inputs.map((resp, index) => (
          <p key={index}>{resp.message}</p>
        ))}
      </span>
    );
  }

  return (
    <Alert
      variant={type}
      style={{ display: show ? 'block' : 'none' }}
      className={`text-center ${className && className}`}
    >
      {typeof message === 'object' ? customMessage : message}
    </Alert>
  );
};

export default PopupMessage;
