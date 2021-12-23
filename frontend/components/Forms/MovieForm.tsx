import { Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { FC, useEffect } from 'react'
import { validationMovieLinkSchema } from '../../utils/yup';
import Input from '../Input';
import SubmitBtn from '../SubmitBtn';
import Loader from '../Loader';
import { useCreateMovieMutation, useUpdateMovieMutation } from '../../services/film';
import { useAppDispatch } from '../../globalStore/hooks';
import { setError } from '../../globalStore/slices/alertSlice';
import { formStyles } from './styles';

type MovieFormProps = {
  type?: 'update' | 'create';
  originalValues?: Record<string, string> | undefined;
}

const MovieForm: FC<MovieFormProps> = ({ type = 'create', originalValues }) => {
  const dispatch = useAppDispatch();
  const [createMovie, { isLoading, isError, error }] = useCreateMovieMutation();
  const [updateMovie, { isLoading: isUpdateLoading, isError: isUpdateError, error: errorUpdate }] = useUpdateMovieMutation();

  let initialValues = originalValues ? originalValues : {
    apiId: '',
    link: '',
    title: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationMovieLinkSchema,
    onSubmit: ({ id, apiId, link, title }) => {
      const body = { apiId, link, title }
      if (type === 'create') {
        createMovie(body);
      } else {
        updateMovie({ id, body })
      }
      formik.setFormikState((state) => ({
        ...state, values: type === 'create' ? initialValues : { ...body, id }, errors: {}
      }));
    },
  });

  const handleFilmLinkChange = (e: any) => {
    formik.setFormikState((prev) => ({
      ...prev, values: {
        apiId: e.nativeEvent.target.value,
        link: `${process.env.NEXT_PUBLIC_API_URL?.slice(0, -11)}***&i=${e.target.value}`,
        title: formik.values['title'],
        id: formik.values['id'],
      }
    }))
  }

  useEffect(() => {
    if (isError || isUpdateError) {
      console.log('ERROR', error);
      dispatch(setError(error?.data?.info))
    };
  }, [dispatch, error, isError, isUpdateError])

  if (isLoading || isUpdateLoading) return <Loader />;

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={formStyles}>
      {type === 'update' && <Input formik={formik} label="Id" name="id" disabled />}
      <Input formik={formik} label="Film Title" name="title" value={originalValues?.id} />
      <Input customOnChange={handleFilmLinkChange} formik={formik} label="Film Id" name="apiId" value={originalValues?.apiId} />
      {type === 'create' && <Typography variant="caption">Format: http://www.omdbapi.com/?i=tt0096296</Typography>}
      <Input formik={formik} label="Film Link" name="link" value={originalValues?.link} disabled />
      <SubmitBtn title={type === 'create' ? 'Add a movie' : 'Update a movie'} />
    </Box>
  )
}

export default MovieForm
