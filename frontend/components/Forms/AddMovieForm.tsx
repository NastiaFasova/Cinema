import { Box, Button, Container, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../globalStore/hooks';
import { loginUser } from '../../globalStore/slices/authSlice';
import { validationLoginSchema } from '../../utils/yup';
import Link from 'next/link'
import Input from '../Input';
import SubmitBtn from '../SubmitBtn';
import { postAPI } from '../../utils/fetchData';
import Loader from '../Loader';
import { setError, setSuccess } from '../../globalStore/slices/alertSlice';

const AddMovieForm = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useAppDispatch();

  const styles = {
    width: 320,
    marginTop: 5,
  };

  const formik = useFormik({
    initialValues: {
      apiId: '',
      link: '',
    },
    validationSchema: validationLoginSchema,
    onSubmit: async (form) => {
      setLoader(true);
      const { data, error } = await postAPI('/movies', form, '');
      if (error) {
        dispatch(setError('Something bad happens'));
        return;
      }
      dispatch(setSuccess('Successfully added'));
      setLoader(false);
    },
  });

  if (loader) {
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
        <form onSubmit={formik.handleSubmit}>
          <Input formik={formik} label="Film Id" name="apiId" inputStyles={styles} />
          <Input formik={formik} label="Film Link" name="link" inputStyles={styles} />
          <SubmitBtn title="Add a movie" />
        </form>
      </Box>
    </Container>
  )
}

export default AddMovieForm
