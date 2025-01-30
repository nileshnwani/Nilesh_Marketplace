import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, ListGroup, Button, Image, Card } from 'react-bootstrap';
import { useGetOrderDetailsQuery, usePayOrderMutation, useUpdateDeliverMutation, useGetRazorpayApiKeyQuery } from '../slices/ordersApiSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addCurrency } from '../utils/addCurrency';
import axios from 'axios';

const OrderDetailsPage = () => {
  const { id: orderId } = useParams();
  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: isPayOrderLoading }] = usePayOrderMutation();
  const [updateDeliver, { isLoading: isUpdateDeliverLoading }] = useUpdateDeliverMutation();
  const { userInfo } = useSelector(state => state.auth);
  const { data: razorpayApiKey } = useGetRazorpayApiKeyQuery();

  const paymentHandler = async () => {
    try {
      const { data } = await axios.post('/api/v1/payment/razorpay/order', {
        amount: order.totalPrice * 100,
        currency: 'INR',
        receipt: `receipt#${orderId}`
      });
      const options = {
        key: razorpayApiKey.razorpayKeyId,
        amount: data.amount,
        currency: data.currency,
        name: 'MERN Shop',
        description: 'Test Transaction',
        order_id: data.id,
        handler: async response => {
          try {
            const res = await axios.post(`/api/v1/payment/razorpay/order/validate`, response);
            await payOrder({ orderId, details: { ...res.data, email: order?.user?.email } });
            toast.success(res.data.message);
          } catch (error) {
            toast.error(error?.data?.message || error.error);
          }
        },
        prefill: {
          name: order?.user?.name,
          email: order?.user?.email
        },
        theme: { color: '#FFC107' }
      };
      new window.Razorpay(options).open();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const deliveredHandler = async () => {
    try {
      await updateDeliver(orderId);
      toast.success('Order Delivered');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <Meta title={'Order Details'} />
      {isLoading ? <Loader /> : error ? <Message variant='danger'>{error?.data?.message || error.error}</Message> : (
        <>
          <h1 className='text-center my-4'>Order ID: {orderId}</h1>
          <Row>
            <Col md={8}>
              <Card className='p-4 shadow-sm'>
                <ListGroup variant='flush'>
                  <ListGroup.Item><h2>📍 Shipping Details</h2></ListGroup.Item>
                  <ListGroup.Item><strong>Name:</strong> {order?.user?.name}</ListGroup.Item>
                  <ListGroup.Item><strong>Email:</strong> {order?.user?.email}</ListGroup.Item>
                  <ListGroup.Item><strong>Address:</strong> {order?.shippingAddress?.address}, {order?.shippingAddress?.city}, {order?.shippingAddress?.postalCode}, {order?.shippingAddress?.country}</ListGroup.Item>
                  <ListGroup.Item>
                    {order?.isDelivered ? <Message variant='
                    '>Delivered on {new Date(order?.deliveredAt).toLocaleString()}</Message> : <Message variant='danger'>Not Delivered</Message>}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
              <Card className='p-4 shadow-sm mt-3'>
                <ListGroup variant='flush'>
                  <ListGroup.Item><h2>💳 Payment Details</h2></ListGroup.Item>
                  <ListGroup.Item><strong>Method:</strong> {order?.paymentMethod}</ListGroup.Item>
                  <ListGroup.Item>
                    {order?.isPaid ? <Message variant='success'>Paid on {new Date(order?.paidAt).toLocaleString()}</Message> : <Message variant='danger'>Not Paid</Message>}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
              <Card className='p-4 shadow-sm mt-3'>
                <ListGroup variant='flush'>
                  <ListGroup.Item><h2>🛒 Order Items</h2></ListGroup.Item>
                  {order?.orderItems?.map(item => (
                    <ListGroup.Item key={item._id} className='d-flex align-items-center'>
                      <Image src={item.image} alt={item.name} fluid rounded className='me-3' width={50} />
                      <Link to={`/product/${item._id}`} className='text-dark fw-bold' style={{ textDecoration: 'none' }}>{item.name}</Link>
                      <span className='ms-auto'>{item.qty} x {addCurrency(item.price)} = <strong>{addCurrency(item.qty * item.price)}</strong></span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </Col>
            <Col md={4}>
              <Card className='shadow-lg p-4'>
                <ListGroup variant='flush'>
                  <ListGroup.Item><h2>📋 Order Summary</h2></ListGroup.Item>
                  <ListGroup.Item><Row><Col>Items:</Col><Col className='fw-bold'>{addCurrency(order?.itemsPrice)}</Col></Row></ListGroup.Item>
                  <ListGroup.Item><Row><Col>Shipping:</Col><Col className='fw-bold'>{addCurrency(order?.shippingPrice)}</Col></Row></ListGroup.Item>
                  <ListGroup.Item><Row><Col>Tax:</Col><Col className='fw-bold'>{addCurrency(order?.taxPrice)}</Col></Row></ListGroup.Item>
                  <ListGroup.Item><Row><Col>Total:</Col><Col className='fw-bold text-primary fs-5'>{addCurrency(order?.totalPrice)}</Col></Row></ListGroup.Item>
                  {!order?.isPaid && !userInfo.isAdmin && (
                    <ListGroup.Item><Button className='w-100 btn-lg' variant='primary' onClick={paymentHandler} disabled={isPayOrderLoading}>💳 Pay Order</Button></ListGroup.Item>
                  )}
                  {userInfo?.isAdmin && order?.isPaid && !order?.isDelivered && (
                    <ListGroup.Item><Button className='w-100 btn-lg' variant='primary' onClick={deliveredHandler} disabled={isUpdateDeliverLoading}>📦 Mark as Delivered</Button></ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
export default OrderDetailsPage;
