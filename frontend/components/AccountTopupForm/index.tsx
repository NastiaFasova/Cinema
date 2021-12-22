import { Box } from '@mui/system'
import { useFormik } from 'formik'
import React, { FC } from 'react'
import { validationAccountTopUpSchema } from '../../utils/yup'
import FormDialogWrapper from '../FormDialogWrapper'
import { formStyles } from '../Forms/styles'
import Input from '../Input'
import SubmitBtn from '../SubmitBtn'

type AccountTopupFormProps = {
  open: boolean;
  setOpen: (b: boolean) => void;
}

const AccountTopupForm: FC<AccountTopupFormProps> = ({ open, setOpen }) => {

  const formik = useFormik({
    initialValues: {
      money: 0,
    },
    validationSchema: validationAccountTopUpSchema,
    onSubmit: ({ money }) => {

    },
  });

  return (
    <FormDialogWrapper
      open={open}
      handleClose={() => setOpen(false)}
      title="To Up your Wallet"
    >
      <Box component="form" onSubmit={formik.handleSubmit} sx={formStyles as any}>
        <Input formik={formik} label="Count" name="money" />
        <SubmitBtn title="Top up an account" />
      </Box>
    </FormDialogWrapper>
  )
}

export default AccountTopupForm
