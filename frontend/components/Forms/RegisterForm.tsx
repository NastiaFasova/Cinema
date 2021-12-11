import { Box, Button, Container, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react'
import { useAppDispatch } from '../../globalStore/hooks';
import { loginUser } from '../../globalStore/slices/authSlice';
import { validationLoginSchema } from '../../utils/yup';
import Link from 'next/link'
import Input from '../Input';
import SubmitBtn from '../SubmitBtn';

const RegisterForm = () => {

  const dispatch = useAppDispatch();

  const styles = {
    width: 320,
    marginTop: 5,
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      password2: '',
    },
    validationSchema: validationLoginSchema,
    onSubmit: async (form) => {
      dispatch(loginUser(form));
    },
  });

  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
        <Typography variant="h2" sx={{ fontWeight: 'bold' }} align="center">
          Register to view data
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 'lighter' }} align="center">
          Choose a lot of different moovies, book a tickets and do whatever you want
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Input formik={formik} label="email" name="email" inputStyles={styles} />
          <Input
            formik={formik}
            label="password"
            type="password"
            name="password"
            inputStyles={styles}
          />
          <Input
            formik={formik}
            label="Repeat Password"
            type="password"
            name="password2"
            inputStyles={styles}
          />
          <SubmitBtn title="Login" />
        </form>
        <Box display="flex" justifyContent="space-between">
          <Link href="/auth/login" passHref>
            Alreade have an account? Login
          </Link>
        </Box>
      </Box>
    </Container>
  )
}

export default RegisterForm
