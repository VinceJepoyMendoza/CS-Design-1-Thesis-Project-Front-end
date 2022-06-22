import React from 'react';
import { Button } from 'react-bootstrap';

const Product = ({ product }) => {
  const { name, price, stock, category, size, color, flavor, description } =
    product;

  return (
    <tr className='text-center'>
      <td>{stock}</td>
      <td>{name}</td>
      <td>{price}</td>
      <td>{category}</td>
      <td>{size}</td>
      <td>{color}</td>
      <td>{flavor}</td>
      <td className='d-none d-lg-table-cell'>{description}</td>
      <td>
        <div className='mb-2'>
          <Button variant='warning' size='sm' className='w-100'>
            Purchase
          </Button>
        </div>
        <div className='mb-2'>
          <Button variant='info' size='sm' className='w-100'>
            Edit
          </Button>
        </div>
        <div className='mb-2'>
          <Button variant='danger' size='sm' className='w-100'>
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default Product;
