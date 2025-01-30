import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import {
  Row,
  Col,
  Card,
  ListGroup,
  Form,
  Image,
  Button,
  ListGroupItem
} from 'react-bootstrap';
import { FaIndianRupeeSign } from 'react-icons/fa6';

import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import Meta from '../components/Meta';
import { addCurrency } from '../utils/addCurrency';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async id => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <>
      <Meta title={'Shopping Cart'} />
      <h1 className="text-center my-4">🛒 Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty 👉 <Link to='/'>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map(item => (
                <ListGroup.Item className='my-3 p-3 border rounded' key={item._id}>
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link
                        to={`/product/${item._id}`}
                        className='product-title text-dark fw-bold'
                        style={{ textDecoration: 'none' }}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2} className="fw-bold">
                      {addCurrency(item.price)}
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={e =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {Array.from({ length: item.countInStock }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash style={{ color: 'red', fontSize: '1.2rem' }} />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          {cartItems.length > 0 && (
            <Card className="shadow-lg border-0 rounded">
              <ListGroup variant='flush'>
                <ListGroup.Item className="p-4">
                  <h2 className="fw-bold">
                    Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                  </h2>
                  <p className="fs-5 text-primary fw-bold">
                    {addCurrency(
                      cartItems.reduce(
                        (acc, item) => acc + item.qty * item.price,
                        0
                      )
                    )}
                  </p>
                </ListGroup.Item>
                <ListGroupItem className="p-4">
                  <Button
                    className='w-100 btn-lg'
                    variant='primary'
                    type='button'
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    🚀 Proceed To Checkout
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          )}
        </Col>
      </Row>
    </>
  );
};

export default CartPage;
