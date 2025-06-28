import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Confirm = ({ stateVar, text, onConfirm, toggle }) => {
  const { t } = useTranslation();
  return (
    <Modal show={stateVar} onHide={toggle}>
      <Modal.Header closeButton>
        <Modal.Title>{t('confirm.areYouSure')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {text}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={toggle}>{t('confirm.cancel')}</Button>
        <Button
          bsStyle="danger"
          onClick={() => {
            onConfirm();
            toggle();
          }}
        >
          {t('confirm.confirm')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

Confirm.propTypes = {
  stateVar: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Confirm;
