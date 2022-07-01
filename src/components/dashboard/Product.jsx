import React from 'react';
import { Button } from 'react-bootstrap';

const Product = ({ product, setCurrProd, setShowModal, setprodConfig }) => {
  const { _id, name, price, stock, category, size, color, flavor } = product;

  return (
    <>
      <tr className='text-center'>
        <td>{stock}</td>
        <td>{name}</td>
        <td>{price}</td>
        <td>{category}</td>
        <td>{size}</td>
        <td>{color}</td>
        <td>{flavor}</td>
        <td>
          <div className='mb-2'>
            <Button
              className='btn btn-warning btn-sm w-100'
              onClick={() => {
                setprodConfig({ show: true, action: 'edit', productId: _id });
              }}
            >
              Edit
            </Button>
          </div>
          <div className='mb-2'>
            <Button
              variant='danger'
              size='sm'
              className='w-100'
              onClick={() => {
                // Set current prod
                setCurrProd({ name, id: _id });
                // Open modal
                setShowModal(true);
              }}
            >
              Delete
            </Button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default Product;
