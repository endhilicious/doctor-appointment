import React, { useState, useRef, useEffect } from 'react';
import cx from 'classnames';

import styles from './Modals.module.scss';

export interface ModalProps {
  isOpen: boolean;
  size?: 'xtraSmall' | 'small' | 'medium' | 'large' | 'full';
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  footer,
  width,
  size = 'medium',
  title
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpenState, setIsOpenState] = useState(isOpen);

  useEffect(() => {
    setIsOpenState(isOpen);
  }, [isOpen]);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose?.();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div
      className={cx(
        styles.modalWrapperOutside,
        {
          [styles.showModal]: isOpenState,
          [styles.hideModal]: !isOpenState,
        }
      )}
      style={{ width }}
    >
      <div className={`${styles.modalWrapper} ${styles[size]}`} ref={modalRef}>
        {/* <div className={`${styles.modalWrapper} ${styles[size]}`} ref={modalRef}> */}
        <div className={styles.modalHeaders}>
          <div className={styles.modalTitle}>{title}</div>
          <div className={styles.modalCloseIcon} onClick={onClose} />
        </div>
        <div className={styles.modalContent}>{children}</div>
        <div className={styles.modalFooter}>{footer}</div>
      </div>
    </div>
  );
};

export default Modal;
