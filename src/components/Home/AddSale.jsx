import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

const AddSale = ({
  index,
  tempId,
  interval,
  price,
  stock,
  sale,
  deleteSale,
}) => {
  return (
    <Row as='form' className='border border-dark mb-2 position-relative'>
      <h4
        style={{
          position: 'absolute',
          top: '1rem',
          left: '0',
          textAlign: 'left',
        }}
      >
        {index + 1}
      </h4>
      <Col>
        <Form.Group className='p-3'>
          <Form.Label>Date</Form.Label>
          <Form.Control type='month' min='0' placeholder='month number' />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group className='p-3'>
          <Form.Label>Stock</Form.Label>
          <Form.Control type='number' min='0' placeholder='Stock' />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group className='p-3'>
          <Form.Label>Price</Form.Label>
          <Form.Control type='number' min='0' placeholder='Price' />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group className='p-3'>
          <Form.Label>Sale</Form.Label>
          <Form.Control type='number' min='0' placeholder='Sale' />
        </Form.Group>
      </Col>
      <Button
        variant='danger'
        size='sm'
        className='sale-delete'
        onClick={() => deleteSale(tempId)}
      >
        X
      </Button>
    </Row>
  );
};

export default AddSale;
