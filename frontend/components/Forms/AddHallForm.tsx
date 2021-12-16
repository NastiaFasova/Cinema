import { Box, Button, Container, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../globalStore/hooks';
import { loginUser, selectUser } from '../../globalStore/slices/authSlice';
import { validationLoginSchema } from '../../utils/yup';
import Link from 'next/link'
import Input from '../Input';
import SubmitBtn from '../SubmitBtn';
import { postAPI } from '../../utils/fetchData';
import { setError, setSuccess } from '../../globalStore/slices/alertSlice';
import Loader from '../Loader';
import { addHall, selectAdmin } from '../../globalStore/slices/adminSlice';

const AddHallForm = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const admin = useAppSelector(selectAdmin);

  const styles = {
    width: 320,
    marginTop: 5,
  };

  const initialValues = {
    capacity: 0,
    description: '',
    title: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (form) => {
      dispatch(addHall(form));
      formik.setValues(initialValues);
    },
  });

  if (admin.loading === 'pending') {
    return <Loader />;
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }} align="center">
          Add a new cinema hall
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Input formik={formik} label="Hall Title" name="title" inputStyles={styles} />
          <Input formik={formik} label="Hall Capacity" name="capacity" inputStyles={styles} />
          <Input formik={formik} label="Description" name="description" inputStyles={styles} />
          <SubmitBtn title="Add a new hall" />
        </form>
      </Box>
    </Container>
  )
}

export default AddHallForm
