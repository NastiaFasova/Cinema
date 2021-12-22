import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { FC } from 'react'

type FormDialogWrapperProps = {
  open: boolean;
  handleClose: VoidFunction;
  btnTitle?: string;
  title: string;
  description?: string;
}

const FormDialogWrapper: FC<FormDialogWrapperProps> =
  ({ open, handleClose, children, btnTitle, description, title }) => {
    return (
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {description}
            </DialogContentText>
            {children}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

export default FormDialogWrapper
