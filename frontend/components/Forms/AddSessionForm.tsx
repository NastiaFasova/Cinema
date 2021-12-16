import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../globalStore/hooks';
import { loginUser, selectUser } from '../../globalStore/slices/authSlice';
import { validationLoginSchema } from '../../utils/yup';
import Link from 'next/link'
import Input from '../Input';
import SubmitBtn from '../SubmitBtn';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { postAPI } from '../../utils/fetchData';
import { setError, setSuccess } from '../../globalStore/slices/alertSlice';
import Loader from '../Loader';
import { addHall, addSession, selectAdmin } from '../../globalStore/slices/adminSlice';
import Select from '../Select';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';

const AddSessionForm = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const admin = useAppSelector(selectAdmin);

  const handleChangeDate = (date: Date | null) => {
    if (!date) return;
    formik.setFieldValue('date', date);
  };

  const styles = {
    width: 320,
    marginTop: 5,
  };

  const initialValues = {
    film: '',
    hall: '',
    date: new Date(),
  }

  const formik = useFormik({
    initialValues,
    onSubmit: async (form) => {
      dispatch(addSession(form));
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
          Add a new Movie Session
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box mt={5} mb={5}>
            <Select
              name="film"
              formik={formik}
              label="Select Film"
              keyValuePairArr={admin.movies.map((movie) => ({
                key: movie.title,
                value: movie.title,
              }))}
            />
          </Box>
          <Select
            name="hall"
            formik={formik}
            label="Select Hall"
            keyValuePairArr={admin.cinemaHalls.map((hall) => ({
              key: hall.id.toString(),
              value: hall.title,
            }))}
          />
          <Box mt={5}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Select Date"
                inputFormat="MM/dd/yyyy"
                value={formik.values['date']}
                onChange={handleChangeDate}
                renderInput={(params: any) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
          <SubmitBtn title="Add a new session" />
        </form>
      </Box>
    </Container>
  )
}

export default AddSessionForm
