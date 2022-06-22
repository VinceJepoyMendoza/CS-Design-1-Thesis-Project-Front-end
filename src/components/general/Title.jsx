import React from 'react';

const Title = ({ text }) => {
  return (
    <h2 className='d-block text-center pt-2 pb-3 main-title text-capitalize'>
      {text}
    </h2>
  );
};

export default Title;
