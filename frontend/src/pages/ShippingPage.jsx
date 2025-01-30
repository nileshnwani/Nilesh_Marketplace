import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import Meta from '../components/Meta';

const ShippingPage = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <Meta title="Shipping" />

      <Card className="p-4 shadow-sm rounded-3">
        <h2 className="text-center mb-4 text-primary">Shipping Details</h2>

        <Form onSubmit={submitHandler} className="d-flex flex-column gap-3">
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              type="text"
              placeholder="Enter your street address"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              type="text"
              placeholder="Enter your city"
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              type="text"
              placeholder="Enter postal code"
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              type="text"
              placeholder="Enter country"
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>

          <Button className="w-100 btn-lg shadow mt-3" variant="primary" type="submit">
            Continue
          </Button>
        </Form>
      </Card>
    </FormContainer>
  );
};

export default ShippingPage;
