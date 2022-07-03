import React from 'react';
import { Button } from 'react-bootstrap';
import { GrUserAdmin } from 'react-icons/gr';
import { AiFillDelete } from 'react-icons/ai';

const User = ({ user, isCurrUser, setModalInfo }) => {
  const { _id, fname, mname, lname, email, role } = user;
  const isAdmin = role === 'admin';

  return (
    <tr>
      <td>{_id}</td>
      <td>{`${lname}, ${fname} ${mname && mname}`}</td>
      <td>{email}</td>
      <td>{role === 'admin' ? 'Yes' : 'No'}</td>
      <td className='d-flex gap-3 justify-content-center'>
        <Button
          variant={isAdmin ? 'warning' : 'info'}
          onClick={() =>
            setModalInfo({
              show: true,
              user: { _id, isAdmin },
              action: 'update',
            })
          }
        >
          {isAdmin ? 'Demote' : 'Make Admin'} <GrUserAdmin />
        </Button>
        <Button
          variant='danger'
          className='d-flex gap-2 align-items-center'
          disabled={isCurrUser}
          onClick={() =>
            setModalInfo({ show: true, user: { _id }, action: 'delete' })
          }
        >
          Delete <AiFillDelete />
        </Button>
      </td>
    </tr>
  );
};

export default User;
