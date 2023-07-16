import React from 'react';
import styles from './Card.module.scss';

type CardProps = {
  children?: any;
  onClick: () => void;
};

const Card: React.FC<CardProps> = ({ children, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
