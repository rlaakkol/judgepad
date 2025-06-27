import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Confirm = ({ stateVar, text, onConfirm, toggle }) => (
  <Modal show={stateVar} onHide={toggle}>
    <Modal.Header closeButton>
      <Modal.Title>Are you sure?</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {text}
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={toggle}>Cancel</Button>
      <Button
        bsStyle="danger"
        onClick={() => {
          onConfirm();
          toggle();
        }}
      >
        Confirm
      </Button>
    </Modal.Footer>
  </Modal>
);

Confirm.propTypes = {
  stateVar: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Confirm;
