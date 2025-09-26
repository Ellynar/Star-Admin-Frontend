import React from 'react';

export interface ModalProps {
  isOpen: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose: () => void;
  actionLabel?: string;
  onAction?: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, children, onClose, actionLabel, onAction }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal">
        <button className="modal__close" aria-label="Close" onClick={onClose}>×</button>
        {title && <h2 id="modal-title" className="modal__title">{title}</h2>}
        <div className="modal__content">
          {children}
        </div>
        {(actionLabel || onAction) && (
          <div className="modal__actions">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
            {actionLabel && (
              <button className="btn btn-primary" onClick={onAction || onClose}>{actionLabel}</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
