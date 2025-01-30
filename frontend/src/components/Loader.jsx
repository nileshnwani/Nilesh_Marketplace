import React from 'react';
import { Spinner, Modal } from 'react-bootstrap';

const Loader = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background overlay
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1050, // Ensure it's above other content
      }}
    >
      <Modal.Dialog
        className='text-center'
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          boxShadow: 'none',
        }}
      >
        <Modal.Body>
          <Spinner
            animation='border'
            role='status'
            variant='primary' // Use a more prominent color
            style={{ width: '4rem', height: '4rem' }} // Larger spinner
          />
          <p className='mt-3 text-white'>Loading...</p> {/* Loading message */}
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};

export default Loader;