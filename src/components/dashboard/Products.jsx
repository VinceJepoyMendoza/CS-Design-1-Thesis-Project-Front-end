import React, { useEffect } from 'react';
import Product from './Product';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProducts } from '../../store/actions/productsActions';
import Loader from '../general/Loader';
import Title from '../general/Title';

const Products = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.info);
  const products = useSelector((state) => state.products.items);
  const { isLoading } = useSelector((state) => state.general);

  // Fetching user's products
  useEffect(() => {
    userInfo._id && dispatch(fetchUserProducts(userInfo._id));
  }, [dispatch, userInfo]);

  return isLoading ? (
    <div className='d-flex justify-content-center'>
      <Loader variant='dark' />
    </div>
  ) : products.length ? (
    <>
      <Title text='Products' />
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
            <th className='d-none d-lg-block'>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </tbody>
      </Table>
    </>
  ) : (
    <h1 className='text-center'>You currently don't have any products</h1>
  );
};

export default Products;
