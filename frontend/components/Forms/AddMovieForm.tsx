import { Box, Button, Container, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../globalStore/hooks';
import { loginUser } from '../../globalStore/slices/authSlice';
import { validationLoginSchema } from '../../utils/yup';
import Link from 'next/link'
import Input from '../Input';
import SubmitBtn from '../SubmitBtn';
import { postAPI } from '../../utils/fetchData';
import Loader from '../Loader';
import { setError, setSuccess } from '../../globalStore/slices/alertSlice';
import { addMovie, selectAdmin } from '../../globalStore/slices/adminSlice';

const AddMovieForm = () => {
  const dispatch = useAppDispatch();
  const admin = useAppSelector(selectAdmin);

  const styles = {
    width: 320,
    marginTop: 5,
  };

  const formik = useFormik({
    initialValues: {
      apiId: '',
      link: '',
      title: '',
    },
    onSubmit: async (form) => {
      dispatch(addMovie(form));
    },
  });

  if (admin.loading === 'pending') {
    return <Loader />;
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }} align="center">
          Add a new movie
        </Typography>
        <Typography variant="caption" align="center">
          You can find any on
          <Link href="https://www.imdb.com" passHref>
            <a target="_blank"><span style={{ color: "#999999", marginLeft: 6 }}>IMDB</span></a>
          </Link>
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Input formik={formik} label="Film Title" name="title" inputStyles={styles} />
          <Input formik={formik} label="Film Id" name="apiId" inputStyles={styles} />
          <Typography variant="caption">Format: http://www.omdbapi.com/?i=tt0096296</Typography>
          <Input formik={formik} label="Film Link" name="link" inputStyles={styles} />
          <SubmitBtn title="Add a movie" />
        </form>
      </Box>
    </Container >
  )
}

export default AddMovieForm
