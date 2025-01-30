import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-75 py-4">
      <Row className="justify-content-md-center w-100">
        <Col xs={12} md={8} lg={6}>
          <div className="border p-4 rounded shadow-lg bg-white">
            {children}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
