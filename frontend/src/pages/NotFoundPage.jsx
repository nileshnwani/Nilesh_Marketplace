import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import Meta from '../components/Meta';

const NotFoundPage = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Meta title="404 Not Found" />
      <Card className="text-center shadow-lg p-4 border-0" style={{ maxWidth: '450px' }}>
        <Card.Body>
          <h1 className="display-1 fw-bold text-danger">404</h1>
          <Card.Title className="fs-3">Oops! Page Not Found</Card.Title>
          <Card.Text className="text-muted">
            The page you’re looking for doesn’t exist or was moved.
          </Card.Text>
          <Button href="/" variant="primary" className="mt-3 px-4 py-2">
            Go Home
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NotFoundPage;
