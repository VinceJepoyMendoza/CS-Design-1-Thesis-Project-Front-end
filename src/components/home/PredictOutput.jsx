import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PredictOutput = ({ predictOutput, handleClose }) => {
  const { show, data } = predictOutput;

  // retrieving the first two decimal for error - 7.123 => 12
  const error = (data.data?.error % 1).toFixed(2).split('.')[1];

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header
        closeButton
        className={`bg-${data.data?.success ? 'light' : 'danger text-white'} `}
      >
        <Modal.Title>
          {data.data?.success ? 'Prediction successful' : 'Prediction failed'}
        </Modal.Title>
      </Modal.Header>
      {data.data?.success ? (
        <Modal.Body className='text-center d-flex gap-4 flex-column'>
          <h5>Gradient Boost predicted your sale to be</h5>
          <h3>{data.data.data.toFixed(2)}</h3>
          <small className='text-muted'>Error: {error}%</small>
        </Modal.Body>
      ) : (
        <Modal.Body className='text-center d-flex gap-4 flex-column'>
          <h3>{data.data?.message}</h3>
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button variant='primary' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PredictOutput;
