import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../globalStore/hooks';
import { removeAlert, selectAlert } from '../../globalStore/slices/alertSlice';

const MyAlert: FC = () => {
  const alert = useAppSelector(selectAlert);
  const dispatch = useAppDispatch();

  function getSeverity() {
    if (alert.error) {
      return 'error';
    }
    if (alert.success) {
      return 'success';
    }
    return 'warning';
  }

  const handleClose = () => {
    dispatch(removeAlert());
  };

  return (
    <Snackbar
      open={!!alert.error || !!alert.success}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      {!!alert.error || !!alert.success ? (
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={getSeverity()}
        >
          {alert.error && alert.error}
          {alert.success && alert.success}
        </Alert>
      ) : undefined}
    </Snackbar>
  );
};

export default MyAlert;