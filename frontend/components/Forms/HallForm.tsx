import { Box } from '@mui/material';
import { useFormik } from 'formik';
import React, { FC, useEffect } from 'react'
import { validationHallSchema } from '../../utils/yup';
import Input from '../Input';
import SubmitBtn from '../SubmitBtn';
import Loader from '../Loader';
import { useAppDispatch } from '../../globalStore/hooks';
import { setError } from '../../globalStore/slices/alertSlice';
import { formStyles } from './styles';
import { useCreateHallMutation, useUpdateHallMutation } from '../../services/hall';

type HallFormProps = {
  type?: 'update' | 'create';
  originalValues?: Record<string, any> | undefined;
}

const HallForm: FC<HallFormProps> = ({ type = 'create', originalValues }) => {
  const dispatch = useAppDispatch();
  const [createHall, { isLoading, isError, error }] = useCreateHallMutation();
  const [updateHall, { isLoading: isUpdateLoading, isError: isUpdateError, error: errorUpdate }] = useUpdateHallMutation();

  let initialValues = originalValues ? originalValues : {
    capacity: 0,
    description: '',
    title: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationHallSchema,
    onSubmit: ({ id, capacity, description, title }) => {
      const body = { capacity, description, title }
      if (type === 'create') {
        createHall(body);
      } else {
        updateHall({ id, body })
      }
      formik.setFormikState((state) => ({
        ...state, values: type === 'create' ? initialValues : { ...body, id }, errors: {}
      }));
    },
  });

  useEffect(() => {
    if (isError || isUpdateError) {
      console.log('ERROR', error);
      dispatch(setError('Something bad happens'))
    };
  }, [dispatch, error, isError, isUpdateError])

  if (isLoading || isUpdateLoading) return <Loader />;

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={formStyles}>
      {type === 'update' && <Input formik={formik} label="Id" name="id" disabled />}
      <Input formik={formik} label="Hall Title" name="title" value={originalValues?.id} />
      <Input formik={formik} label="Hall Capacity" name="capacity" value={originalValues?.capacity} />
      <Input formik={formik} label="Description" name="description" value={originalValues?.description} />

      <SubmitBtn title={type === 'create' ? 'Add a hall' : 'Update a hall'} />
    </Box>
  )
}

export default HallForm
