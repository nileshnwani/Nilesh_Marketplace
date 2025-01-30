import React from 'react';
import { Row, Col, Button, Table, Card, ListGroup } from 'react-bootstrap';
import { FaCheck, FaXmark } from 'react-icons/fa6';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import ProfileForm from '../components/ProfileForm';
import { addCurrency } from '../utils/addCurrency';

const ProfilePage = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <>
      <Meta title={'User Profile'} />
      <Row className="my-3">
        {/* Profile Section */}
        <Col md={4} lg={3}>
          <Card className="shadow-sm">
            <Card.Header as="h5" className='bg-primary text-white'>My Profile</Card.Header>
            <Card.Body>
              <ProfileForm />
            </Card.Body>
          </Card>
        </Col>

        {/* Orders Section */}
        <Col md={8} lg={9}>
          <Card className="shadow-sm ">
            <Card.Header as="h5" className='bg-primary text-white'>My Orders</Card.Header>
            <Card.Body>
              {isLoading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error?.data?.message || error.error}</Message>
              ) : (
                <Table striped hover responsive size="sm" className="my-3">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAID</th>
                      <th>DELIVERED</th>
                      <th>DETAILS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>{addCurrency(order.totalPrice)}</td>
                        <td>
                          {order.isPaid ? (
                            <FaCheck style={{ color: 'green' }} />
                          ) : (
                            <FaXmark style={{ color: 'red' }} />
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            <FaCheck style={{ color: 'green' }} />
                          ) : (
                            <FaXmark style={{ color: 'red' }} />
                          )}
                        </td>
                        <td>
                          <LinkContainer to={`/order/${order._id}`}>
                            <Button className="btn-sm" variant="primary">
                              Details
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;
