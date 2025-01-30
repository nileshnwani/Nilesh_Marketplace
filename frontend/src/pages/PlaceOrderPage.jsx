import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Button, ListGroup, Card, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import CheckoutSteps from '../components/CheckoutSteps';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import Meta from '../components/Meta';
import { addCurrency } from '../utils/addCurrency';

const PlaceOrderPage = () => {
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = useSelector(state => state.cart);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
    if (!paymentMethod) {
      navigate('/payment');
    }
  }, [shippingAddress, paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Meta title={'Place Order'} />
      <h1 className="text-center my-4">🛍️ Place Your Order</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item className="p-4 bg-light rounded">
              <h2>📍 Shipping</h2>
              <p className="mb-0">
                <strong>Address:</strong> {shippingAddress.address},{' '}
                {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item className="p-4 bg-light rounded mt-3">
              <h2>💳 Payment Method</h2>
              <p className="mb-0">
                <strong>Method:</strong> {paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item className="p-4 bg-light rounded mt-3">
              <h2>🛒 Order Items</h2>
              <ListGroup variant='flush'>
                {cartItems.map(item => (
                  <ListGroup.Item key={item._id} className="py-3">
                    <Row className="align-items-center">
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={6}>
                        <Link
                          to={`/product/${item._id}`}
                          className="text-dark fw-bold"
                          style={{ textDecoration: 'none' }}
                        >
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={4} className="fw-bold">
                        {item.qty} x {addCurrency(item.price)} ={' '}
                        <span className="text-primary">
                          {addCurrency(item.qty * item.price)}
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card className="shadow-lg border-0 rounded">
            <ListGroup variant='flush'>
              <ListGroup.Item className="p-4">
                <h2 className="fw-bold">📋 Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item className="p-3">
                <Row>
                  <Col>Items:</Col>
                  <Col className="fw-bold">{addCurrency(Number(itemsPrice))}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="p-3">
                <Row>
                  <Col>Shipping:</Col>
                  <Col className="fw-bold">{addCurrency(Number(shippingPrice))}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="p-3">
                <Row>
                  <Col>Tax:</Col>
                  <Col className="fw-bold">{addCurrency(Number(taxPrice))}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="p-3">
                <Row>
                  <Col>Total:</Col>
                  <Col className="fw-bold text-primary fs-5">
                    {addCurrency(Number(totalPrice))}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="p-4">
                <Button
                  className="w-100 btn-lg"
                  variant="primary"
                  disabled={cartItems.length === 0 || isLoading}
                  onClick={placeOrderHandler}
                >
                  ✅ Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
