import React, { useEffect } from 'react';
import Product from './Product';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProducts } from '../../store/actions/productsActions';
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { deleteProduct } from '../../store/actions/productsActions';
import Title from '../general/Title';
import ProductsHeader from './ProductsHeader';
import ProductConfig from './ProductConfig';

const Products = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.info);
  const products = useSelector((state) => state.products.items);
  const [currProducts, setCurrProducts] = useState(products);
  const [showDelModal, setShowDelModal] = useState(false);
  const [prodConfig, setprodConfig] = useState({
    show: false,
    action: '',
    productId: '',
  });
  const [currProd, setCurrProd] = useState({ name: '', id: '' });

  // Fetching user's products
  useEffect(() => {
    userInfo._id && dispatch(fetchUserProducts(userInfo._id));
  }, [dispatch, userInfo]);

  useEffect(() => {
    setCurrProducts(products);
  }, [products]);

  return products.length ? (
    <>
      <Title text='Products' />
      <ProductsHeader
        products={products}
        setCurrProducts={setCurrProducts}
        setprodConfig={setprodConfig}
        show={prodConfig.show}
      />
      <ProductConfig
        show={prodConfig.show}
        action={prodConfig.action}
        productId={prodConfig.productId}
        setprodConfig={setprodConfig}
      />
      <Table striped borderless hover variant='dark'>
        <thead className='text-center'>
          <tr>
            <th>Stock</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Size</th>
            <th>Color</th>
            <th>Flavor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currProducts.map((product, index) => (
            <Product
              key={index}
              product={product}
              setCurrProd={setCurrProd}
              setShowModal={setShowDelModal}
              setprodConfig={setprodConfig}
            />
          ))}
        </tbody>
      </Table>
      {/* Popup modal for deletion */}
      <Modal show={showDelModal} onHide={() => setShowDelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {currProd.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowDelModal(false)}>
            Close
          </Button>
          <Button
            variant='primary'
            onClick={() => {
              dispatch(deleteProduct(currProd.id, userInfo._id));
              setShowDelModal(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  ) : (
    <h1 className='text-center'>You currently don't have any products</h1>
  );
};

export default Products;
