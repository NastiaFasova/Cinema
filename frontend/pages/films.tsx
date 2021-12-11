import React, { FC } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import data from '../../docs/movie.json';
import { IFilm, IFilmLink } from '../types';
import MoovieCard from '../components/MoovieCard';
import axios from 'axios';
import { Container, Grid } from '@mui/material';

type FilmsPageProps = {
  films: IFilm[];
}

const FilmsPage: NextPage<FilmsPageProps> = ({ films }) => {
  return (
    <div>
      <Container>
        <Grid container spacing={2}>
          {films.map((film, i) => (
            <Grid item xs={3} key={film.id}>
              <MoovieCard film={film} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const films = await Promise.all(data.map((async (film) => {
    const { data } = await axios.get(film.link.concat(`&apikey=${process.env.IMDB_API_KEY}`));
    return { ...data, id: film.id };
  })));

  return {
    props: { films, }, // will be passed to the page component as props
  }
}


export default FilmsPage