import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { productActions } from '../../store/reducers/productSlice';
import { useDispatch } from 'react-redux';

const ProductsHeader = ({ products, setCurrProducts, setprodConfig }) => {
  const [showAllBtn, setShowAllBtn] = useState(false);
  const dispatch = useDispatch();

  const search = (e) => {
    e.preventDefault();
    const searchQuery = e.target[0].value.toLowerCase();
    const search = products.filter((prod) =>
      prod.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCurrProducts(search);
    setShowAllBtn(true);
  };

  return (
    <Row className='my-4 p-0'>
      {/* Search functionality */}
      <Col xs={12} lg={6}>
        <Form onSubmit={search} className='d-flex gap-2 products-header'>
          <Form.Group>
            <Form.Control type='text' placeholder='Search products' />
          </Form.Group>
          <Button type='submit'>Search</Button>
          {showAllBtn && (
            <Button
              type='button'
              variant='success'
              onClick={() => {
                // Remove search query
                setCurrProducts(products);
                // remove 'all' button
                setShowAllBtn(false);
              }}
            >
              All
            </Button>
          )}
        </Form>
      </Col>
      <Col
        xs={12}
        lg={6}
        className='d-lg-flex gap-3 justify-content-end products-header-btn'
      >
        <Button
          className='btn btn-info w-50 d-xs-block mb-sm-2 mb-lg-0'
          onClick={() => {
            dispatch(productActions.resetCurrProduct());
            setprodConfig({ show: true, action: 'create' });
          }}
        >
          Add product
        </Button>
      </Col>
    </Row>
  );
};

export default ProductsHeader;
