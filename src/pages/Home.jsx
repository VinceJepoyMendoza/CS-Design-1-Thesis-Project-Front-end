import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import homeBG from '../images/homeBG.jpg';
import Title from '../components/general/Title';
import Prediction from '../components/home/Prediction';
import PredictOutput from '../components/home/PredictOutput';
import { authAxios } from '../store/actions/userActions';
import { generalActions } from '../store/reducers/generalSlice';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/general/Loader';

const Home = () => {
  const { isLoading } = useSelector((state) => state.general);
  const [predictOutput, setPredictOutput] = useState({
    show: false,
    message: '',
    data: { success: false },
  });
  const [file, setFile] = useState(null);
  const [predictConfig, setPredictConfig] = useState({
    name: '',
    date: '',
    price: 0,
    quantity: 0,
    location: '',
  });
  const dispatch = useDispatch();

  const predictionHandler = async (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append('data', file);
    form.append('productName', predictConfig.name);
    form.append('date', predictConfig.date);
    form.append('price', predictConfig.price);
    form.append('quantity', predictConfig.quantity);
    form.append('location', predictConfig.location);

    dispatch(generalActions.setIsLoading(true));

    await authAxios
      .post('/predict_sales/create', form)
      .then((resp) => {
        setPredictOutput({ show: true, data: resp.data });

        dispatch(generalActions.setIsLoading(false));
      })
      .catch((err) => {
        console.log(err.response);
        setPredictOutput({
          show: true,
          data: err.response.data,
        });

        dispatch(generalActions.setIsLoading(false));
      });
  };

  return (
    <>
      <PredictOutput
        predictOutput={predictOutput}
        handleClose={() =>
          setPredictOutput({
            show: false,
            data: {},
          })
        }
      />
      <section>
        <div className='main-home'>
          <img src={homeBG} alt='sale' />
          <h1>Sales Prediction using Gradient Boost Model</h1>
        </div>
      </section>
      <Container fluid='md' className='my-5' style={{ minHeight: '100vh' }}>
        <Title text='Predict your sales using gradient boost model' />
        <Form
          className='w-50 mx-auto bg-secondary mt-5 p-4'
          onSubmit={predictionHandler}
        >
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Input your previous sales</Form.Label>
            <Form.Control
              type='file'
              accept='.csv, text/csv'
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Form.Text className='text-muted'>
              Instructions:
              <ul>
                <li>Only accept csv files.</li>
                <li>
                  Make sure your file has the following columns:
                  <ul>
                    <li>Order_Date</li>
                    <li>Location</li>
                    <li>Category</li>
                    <li>Product</li>
                    <li>Quantity</li>
                    <li>Price</li>
                    <li>Sale</li>
                  </ul>
                </li>
              </ul>
            </Form.Text>
          </Form.Group>
          <hr />
          <h4 className='mt-4 text-center mb-3'>
            Enter new data to be predicted
          </h4>
          {/* Prediction form */}
          <Prediction
            predictConfig={predictConfig}
            setPredictConfig={setPredictConfig}
          />
          <Button variant='primary' type='submit' className='mt-3'>
            {isLoading ? <Loader /> : 'Submit'}
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Home;
