import React from 'react';
import cx from 'classnames';

import { useSnackbar } from '#/context/useSnackbar';
import CloseIcon from '#/Svg/Close';

import styles from './Snackbar.module.scss';

const Snackbar: React.FC = () => {
  const { snackbarOpen, snackbarMessage, snackbarType, closeSnackbar, snackbarPosition } = useSnackbar();

  return (
    <div
      className={cx(styles.snackbar, styles[snackbarType], styles[snackbarPosition], {
        [styles.open]: snackbarOpen,
      })}
    >
      <span>{snackbarMessage}</span>
      <button className={styles['close-button']} onClick={closeSnackbar}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default Snackbar;
