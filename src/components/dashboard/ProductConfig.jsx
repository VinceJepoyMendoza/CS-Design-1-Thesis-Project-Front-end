import React, { useEffect } from 'react';
import { Form, Button, Col, Row, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProduct,
  updateProduct,
} from '../../store/actions/productsActions';
import { fetchProduct } from '../../store/actions/productsActions';
import { productActions } from '../../store/reducers/productSlice';
import PopupMessage from '../general/PopupMessage';
import Loader from '../general/Loader';

const ProductConfig = ({ show, action, productId, setprodConfig }) => {
  const user = useSelector((state) => state.user.info);
  const productInfo = useSelector((state) => state.products.currProduct);
  const { isLoading, popupMessage } = useSelector((state) => state.general);
  const { _id, name, category, price, stock, size, color, flavor } =
    productInfo;
  const {
    setCurrProdName,
    setCurrProdCategory,
    setCurrProdPrice,
    setCurrProdStock,
    setCurrProdSize,
    setCurrProdColor,
    setCurrProdFlavor,
  } = productActions;
  const dispatch = useDispatch();

  // Product submit handler
  const submitProductHandler = () => {
    action === 'create'
      ? dispatch(createProduct(productInfo, user._id))
      : dispatch(updateProduct(productInfo, _id, user._id, setprodConfig));
  };

  useEffect(() => {
    action === 'edit' && dispatch(fetchProduct(productId));
  }, [dispatch, action, productId]);

  return (
    <Modal show={show}>
      <Modal.Header className='bg-primary text-white'>
        <Modal.Title className='mx-auto'>
          {action === 'create' ? 'Create Product' : 'Update product'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-secondary w-100'>
        <Form className='d-flex flex-column gap-3 mt-3 p-4'>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              value={name}
              onChange={(e) => dispatch(setCurrProdName(e.target.value))}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type='text'
              value={category}
              onChange={(e) => dispatch(setCurrProdCategory(e.target.value))}
            />
          </Form.Group>
          <Row className='d-flex'>
            <Col>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='number'
                  value={price}
                  onChange={(e) => dispatch(setCurrProdPrice(e.target.value))}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type='number'
                  value={stock}
                  onChange={(e) => dispatch(setCurrProdStock(e.target.value))}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label>Size</Form.Label>
            <Form.Control
              type='text'
              value={size}
              onChange={(e) => dispatch(setCurrProdSize(e.target.value))}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Color</Form.Label>
            <Form.Control
              type='text'
              value={color}
              onChange={(e) => dispatch(setCurrProdColor(e.target.value))}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Flavor</Form.Label>
            <Form.Control
              type='text'
              value={flavor}
              onChange={(e) => dispatch(setCurrProdFlavor(e.target.value))}
            />
          </Form.Group>
          <PopupMessage
            show={popupMessage.show}
            type={popupMessage.type}
            message={popupMessage.message}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='secondary'
          onClick={() => setprodConfig({ show: false })}
        >
          cancel
        </Button>
        <Button type='submit' onClick={submitProductHandler}>
          {isLoading ? <Loader /> : action === 'create' ? 'Create' : 'Update'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductConfig;
