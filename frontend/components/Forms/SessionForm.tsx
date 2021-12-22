import { Autocomplete, Box, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { FC, useEffect } from 'react'
import { validationMovieSessionSchema } from '../../utils/yup';
import Input, { checkForInputErrors } from '../Input';
import SubmitBtn from '../SubmitBtn';
import Loader from '../Loader';
import { useAppDispatch } from '../../globalStore/hooks';
import { setError } from '../../globalStore/slices/alertSlice';
import { formStyles } from './styles';
import { useCreateMovieSessionMutation, useUpdateMovieSessionMutation } from '../../services/movie-session';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useFetchAllMoviesQuery } from '../../services/film';
import Select from '../Select';
import { useFetchAllHallsQuery } from '../../services/hall';

type SessionFormProps = {
  type?: 'update' | 'create';
  originalValues?: Record<string, any> | undefined;
}

const SessionForm: FC<SessionFormProps> = ({ type = 'create', originalValues }) => {
  const dispatch = useAppDispatch();
  const [createMovieSession, { isLoading, isError, error }] = useCreateMovieSessionMutation();
  const [updateMovieSession, { isLoading: isUpdateLoading, isError: isUpdateError, error: errorUpdate }] = useUpdateMovieSessionMutation();
  const { data: movies = [], isLoading: moviesLoading, isError: moviesError } = useFetchAllMoviesQuery('')
  const { data: halls = [], isLoading: hallsLoading, isError: hallsError } = useFetchAllHallsQuery('')

  let initialValues = originalValues ? originalValues : {
    movieTitle: '',
    cinemaHallId: '',
    showTime: new Date(),
  };

  const handleChangeDate = (date: Date | null) => {
    if (!date) return;
    formik.setFieldValue('showTime', date);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationMovieSessionSchema,
    onSubmit: ({ id, movieTitle, showTime, cinemaHallId }) => {
      const body = { movieTitle, showTime: showTime.toISOString().slice(0, -1), cinemaHallId }
      if (type === 'create') {
        createMovieSession(body);
      } else {
        updateMovieSession({ id, body })
      }
      formik.setFormikState((state) => ({
        ...state, values: type === 'create' ? initialValues : { ...body, id }, errors: {}
      }));
    },
  });

  useEffect(() => {
    if (isError || isUpdateError || moviesError || moviesError) {
      console.log('ERROR', error);
      dispatch(setError('Something bad happens'))
    };
  }, [dispatch, error, isError, isUpdateError, moviesError])

  if (isLoading || isUpdateLoading || hallsLoading) return <Loader />;

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={formStyles}>
      {type === 'update' && <Input formik={formik} label="Id" name="id" disabled />}
      <Autocomplete
        disablePortal
        onChange={(event: any, newValue: string | null) => {
          formik.setFieldValue('movieTitle', newValue)
        }}
        value={formik.values['movieTitle']}
        options={movies.map((m) => m.title)}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
      <span style={{ color: 'red', fontSize: 13 }}>
        {checkForInputErrors(formik, 'movieTitle')}
      </span>
      <Select
        name="cinemaHallId"
        formik={formik}
        label="Select Hall"
        keyValuePairArr={halls.map((hall) => ({
          key: hall.id.toString(),
          value: hall.title,
        }))}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Select Date"
          inputFormat="MM/dd/yyyy"
          value={formik.values['showTime']}
          onChange={handleChangeDate}
          renderInput={(params: any) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <SubmitBtn title={type === 'create' ? 'Add a movie session' : 'Update a movie session'} />
    </Box>
  )
}

export default SessionForm
