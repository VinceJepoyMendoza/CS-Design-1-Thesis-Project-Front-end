import React, { useState } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
// import { useSelector, useDispatch } from 'react-redux';
// import { salesActions } from '../store/reducers/salesSlice';
import homeBG from '../images/homeBG.jpg';
import Title from '../components/general/Title';
import AddSale from '../components/Home/AddSale';
import Predictions from '../components/Home/Predictions';

const Home = () => {
  // const sales = useSelector((state) => state.sales.trainData);
  // const dispatch = useDispatch();
  const [tempId, setTempId] = useState(0);

  const [predictAttr, setPredictAttr] = useState('sale');

  const [trainData, setTrainData] = useState([
    {
      id: Math.random(),
      interval: 0,
      price: 0,
      stock: 0,
      sale: 0,
    },
  ]);

  const [predictions, setPredictions] = useState([
    {
      id: 'pd' + 0,
      interval: 0,
      price: 0,
      stock: 0,
      sale: 0,
    },
  ]);

  const deleteSale = (id) =>
    setTrainData(trainData.filter((sale) => sale.id !== id));

  return (
    <>
      <section>
        <div className='main-home'>
          <img src={homeBG} alt='sale' />
          <h1>Sales Prediction using Gradient Boost Model</h1>
        </div>
      </section>
      <Container
        fluid='md'
        className='my-5 text-center'
        style={{ minHeight: '100vh' }}
      >
        <Title text='Enter your previous sales' />
        <h4 className={`my-3 d-${trainData.length < 8 ? 'block' : 'none'}`}>
          We recommend atleast 8 sales data
        </h4>
        {/* Previous Sales */}
        {trainData.map((sale, index) => (
          <AddSale
            key={index}
            index={index}
            sales={sale}
            tempId={tempId}
            deleteSale={deleteSale}
          />
        ))}
        {/* Add sale btn */}
        <Button
          type='button'
          className='my-5'
          onClick={() => {
            setTrainData((e) => [
              ...e,
              {
                id: tempId,
                interval: 0,
                price: 0,
                stock: 0,
                sale: 0,
              },
            ]);
            setTempId((e) => e + 1);
          }}
        >
          Add Sale
        </Button>
        {/* Prediction configs */}
        <Title text='Prediction configurations' />
        <Row as='form'>
          <Col xs={3}>
            <Form.Group className='mb-3'>
              <Form.Label className='font-weight-bold'>
                Choose attribute to predict
              </Form.Label>
              <Form.Select
                onChange={(e) => setPredictAttr(e.target.value)}
                defaultValue={predictAttr}
              >
                <option value='price'>Price</option>
                <option value='sale'>Sale</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        {predictions.map((item, index) => (
          <Predictions
            key={index}
            item={item}
            predictAttr={predictAttr}
            setPredictions={setPredictions}
          />
        ))}
        {/* Add sale btn */}
        <Button
          type='button'
          className='my-5 me-3'
          onClick={() =>
            setPredictions((e) => [
              ...e,
              {
                id: e.length,
                interval: 0,
                price: 0,
                stock: 0,
                sale: 0,
              },
            ])
          }
        >
          Add Prediction
        </Button>
        <Button variant='info'>Predict now</Button>
      </Container>
    </>
  );
};

export default Home;
