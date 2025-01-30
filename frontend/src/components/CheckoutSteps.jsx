import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4 d-flex">
      {/* Sign In Step */}
      <Nav.Item className="mx-3">
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link 
              className={`px-4 py-2 rounded-pill ${step1 ? 'text-white bg-success' : 'text-muted'}`}
            >
              Sign In
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className="px-4 py-2 rounded-pill text-muted">
            Sign In
          </Nav.Link>
        )}
      </Nav.Item>

      {/* Shipping Step */}
      <Nav.Item className="mx-3">
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link 
              className={`px-4 py-2 rounded-pill ${step2 ? 'text-white bg-success' : 'text-muted'}`}
            >
              Shipping
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className="px-4 py-2 rounded-pill text-muted">
            Shipping
          </Nav.Link>
        )}
      </Nav.Item>

      {/* Payment Step */}
      <Nav.Item className="mx-3">
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link 
              className={`px-4 py-2 rounded-pill ${step3 ? 'text-white bg-success' : 'text-muted'}`}
            >
              Payment
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className="px-4 py-2 rounded-pill text-muted">
            Payment
          </Nav.Link>
        )}
      </Nav.Item>

      {/* Place Order Step */}
      <Nav.Item className="mx-3">
        {step4 ? (
          <LinkContainer to="/place-order">
            <Nav.Link 
              className={`px-4 py-2 rounded-pill ${step4 ? 'text-white bg-success' : 'text-muted'}`}
            >
              Place Order
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className="px-4 py-2 rounded-pill text-muted">
            Place Order
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
