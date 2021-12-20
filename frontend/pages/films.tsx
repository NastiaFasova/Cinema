import React, { FC, useEffect, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { IFilm, IFilmLink } from '../types';
import MoovieCard from '../components/MoovieCard';
import axios from 'axios';
import { Box, Container, Grid, Typography } from '@mui/material';
import { getAPI } from '../utils/fetchData';
import { useAppSelector } from '../globalStore/hooks';
import { selectUser } from '../globalStore/slices/authSlice';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { useFetchAllMoviesQuery } from '../services/film';

const FilmsPage: NextPage = () => {
  const { data = [], isLoading, isError } = useFetchAllMoviesQuery('')
  const user = useAppSelector(selectUser);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error title="Something went wrong" />;
  }

  return (
    <div>
      <Container>
        <Grid container spacing={2}>
          {data.length > 0 ? data.map((film, i) => (
            <Grid item xs={3} key={film.id}>
              <MoovieCard film={film} />
            </Grid>
          )) : <Error title="Not Found :(" />}
        </Grid>
      </Container>
    </div>
  )
}


export default FilmsPage