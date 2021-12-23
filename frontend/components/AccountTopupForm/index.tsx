import { Box } from '@mui/system'
import { useFormik } from 'formik'
import React, { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../globalStore/hooks'
import { setSuccess } from '../../globalStore/slices/alertSlice'
import { selectUser, updateAccountBalance } from '../../globalStore/slices/authSlice'
import { useTopUpUserAccountMutation } from '../../services/user'
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
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [topUpAccount, { isLoading }] = useTopUpUserAccountMutation();

  const formik = useFormik({
    initialValues: {
      money: 0,
    },
    validationSchema: validationAccountTopUpSchema,
    onSubmit: ({ money }) => {
      topUpAccount(money).unwrap().then(() => {
        dispatch(updateAccountBalance(Number(money)));
        dispatch(setSuccess("Account bill was successfully updated"));
        setOpen(false);
      });
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
