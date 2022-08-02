import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PredictOutput = ({ predictOutput, handleClose }) => {
  const { show, data } = predictOutput;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header
        closeButton
        className={`bg-${data.data?.success ? 'light' : 'danger'} text-white`}
      >
        <Modal.Title>
          {data.data?.success ? 'Prediction successful' : 'Prediction failed'}
        </Modal.Title>
      </Modal.Header>
      {data.data?.success ? (
        <Modal.Body className='text-center d-flex gap-4 flex-column'>
          <h5>Gradient Boost predicted your sale to be</h5>
          <h3>{data.data.data.toFixed(2)}</h3>
          <small className='text-muted'>error: {data.data.error}%</small>
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
