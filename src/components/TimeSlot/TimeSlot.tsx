import React from 'react';
import cx from 'classnames';
import styles from './TimeSlot.module.scss';

type TimeSlotProps = {
  time: number;
  disabled?: boolean;
  isFull?: boolean;
  isSelected?: boolean;
  onClick: () => void;
};

const TIME_SLOT: any = {
  1: '14.00',
  2: '14.30',
  3: '15.00',
  4: '15.30',
  5: '16.00',
  6: '16.30',
  7: '17.30'
}

const TimeSlot: React.FC<TimeSlotProps> = ({
  time,
  onClick,
  disabled = false,
  isSelected = false,
  isFull = false
}) => {
  const handleClick = () => {
    if (!disabled || !isFull) {
      onClick();
    }
  };

  return (
    <button
      className={cx(
        styles.timeSlot,
        {
          [styles.disabled]: disabled,
          [styles.selected]: isSelected,
        }
      )}
      onClick={handleClick}
      disabled={disabled || isFull}
    >
      {!isFull ? TIME_SLOT[time] : 'Full'}
    </button>
  );
};

export default TimeSlot;
