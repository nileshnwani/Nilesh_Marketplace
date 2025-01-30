import React from 'react';
import Meta from '../../components/Meta';
import { useAdminsQuery } from '../../slices/usersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AdminListPage = () => {
  const { data: admins, isLoading, error } = useAdminsQuery({});

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <Meta title={'Admin List'} />
          <h1 className="text-center text-primary">Admins</h1>
        </Col>
        <Col className="text-end">
          <LinkContainer to={'/admin/create'}>
            <Button className="my-3 px-4" variant="primary" size="lg">
              Add Admin
            </Button>
          </LinkContainer>
        </Col>
      </Row>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped hover bordered responsive size="sm" className="shadow-sm rounded">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {admins?.map(admin => (
              <tr key={admin._id}>
                <td>{admin._id}</td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>

                <td>
                  <LinkContainer to={`/admin/user/update/${admin._id}`}>
                    <Button className="btn-sm mx-1" variant="primary">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    className="btn-sm mx-1"
                    variant="danger"
                    onClick={() => {}}
                    style={{ cursor: 'pointer' }}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AdminListPage;
