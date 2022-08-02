import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const Prediction = ({ predictConfig, setPredictConfig }) => {
  return (
    <>
      <Row>
        <Col>
          <Form.Group className='mb-3'>
            <Form.Label>Product</Form.Label>
            <Form.Control
              type='text'
              required
              placeholder='Enter Product Name'
              value={predictConfig.name}
              onChange={(e) =>
                setPredictConfig((a) => ({ ...a, name: e.target.value }))
              }
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className='mb-3'>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type='date'
              required
              value={predictConfig.date}
              onChange={(e) =>
                setPredictConfig((a) => ({ ...a, date: e.target.value }))
              }
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className='mb-3'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              required
              placeholder='Enter Price'
              value={predictConfig.price}
              onChange={(e) =>
                setPredictConfig((a) => ({ ...a, price: e.target.value }))
              }
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className='mb-3'>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type='number'
              required
              placeholder='Enter Quantity'
              value={predictConfig.quantity}
              onChange={(e) =>
                setPredictConfig((a) => ({ ...a, quantity: e.target.value }))
              }
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className='mb-3'>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type='text'
              required
              placeholder='Enter Location'
              value={predictConfig.location}
              onChange={(e) =>
                setPredictConfig((a) => ({ ...a, location: e.target.value }))
              }
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default Prediction;
