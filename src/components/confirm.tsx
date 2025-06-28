import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

interface ConfirmProps {
  stateVar: boolean;
  text: string;
  onConfirm: () => void;
  toggle: () => void;
}

const Confirm: React.FC<ConfirmProps> = ({ stateVar, text, onConfirm, toggle }) => {
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
          variant="danger"
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

export default Confirm;
