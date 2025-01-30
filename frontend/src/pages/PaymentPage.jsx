import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Card, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import Meta from '../components/Meta';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('Razorpay');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/place-order');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Meta title="Payment Method" />

      <Card className="p-4 shadow-sm rounded-3">
        <h2 className="text-center mb-4 text-primary">Select Payment Method</h2>

        <Form onSubmit={submitHandler}>
          <ListGroup variant="flush">
            <ListGroup.Item className="p-3">
              <Form.Check
                type="radio"
                id="Razorpay"
                label="Razorpay"
                name="paymentMethod"
                value="Razorpay"
                checked={paymentMethod === 'Razorpay'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="fs-5"
              />
            </ListGroup.Item>
          </ListGroup>

          <Button className="mt-4 w-100 btn-lg shadow" variant="primary" type="submit">
            Continue
          </Button>
        </Form>
      </Card>
    </FormContainer>
  );
};

export default Payment;
