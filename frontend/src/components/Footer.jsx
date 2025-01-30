import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <>
      <br />
      <footer className="bg-dark text-light py-4 mt-5 shadow-lg rounded-top custom-navbar">
        <Container>
          <Row className="text-center text-md-start">
            {/* About Section */}
            <Col md={4} className="mb-3">
              <h5 className="fw-bold text-uppercase">About Us</h5>
              <p className="opacity-75">
                We provide high-quality services and innovative solutions to ensure customer satisfaction.
              </p>
            </Col>

            {/* Quick Links */}
            <Col md={4} className="mb-3">
              <h5 className="fw-bold text-uppercase">Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="/" className="text-light text-decoration-none opacity-75 d-block">Home</a></li>
                <li><a href="/about" className="text-light text-decoration-none opacity-75 d-block">About</a></li>
                <li><a href="/services" className="text-light text-decoration-none opacity-75 d-block">Services</a></li>
                <li><a href="/contact" className="text-light text-decoration-none opacity-75 d-block">Contact</a></li>
              </ul>
            </Col>

            {/* Contact Information */}
            <Col md={4} className="mb-3">
              <h5 className="fw-bold text-uppercase">Contact Us</h5>
              <ul className="list-unstyled opacity-75">
                <li>Email: <a href="mailto:info@example.com" className="text-light text-decoration-none">info@example.com</a></li>
                <li>Phone: <a href="tel:+1234567890" className="text-light text-decoration-none">+1 1234567890</a></li>
                <li>Address: Aurangabad Maharastra</li>
              </ul>
            </Col>
          </Row>

          {/* Footer Bottom */}
          <Row className="mt-3">
            <Col className="text-center">
              <p className="mb-0 opacity-75">&copy; {new Date().getFullYear()} Nilesh Marketplace. All Rights Reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
