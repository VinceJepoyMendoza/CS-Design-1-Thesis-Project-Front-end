import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const Predictions = ({ predictAttr }) => {
  return (
    <Row as='form' className='border border-dark mb-2'>
      <Col className='p-3'>
        <Form.Label>Interval</Form.Label>
        <Form.Control type='number' min='0' placeholder='interval' />
      </Col>
      <Col className='p-3'>
        <Form.Label>stock</Form.Label>
        <Form.Control type='number' min='0' placeholder='stock' />
      </Col>
      <Col className='p-3'>
        <Form.Label>{predictAttr === 'sale' ? 'price' : 'sale'}</Form.Label>
        <Form.Control
          type='number'
          min='0'
          placeholder={predictAttr === 'sale' ? 'price' : 'sale'}
        />
      </Col>
      <Col className='p-3'>
        <Form.Label>{predictAttr !== 'sale' ? 'price' : 'sale'}</Form.Label>
        <Form.Control
          type='number'
          min='0'
          placeholder={predictAttr !== 'sale' ? 'price' : 'sale'}
          disabled
        />
      </Col>
    </Row>
  );
};

export default Predictions;
