import React, { FC, useEffect, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { IFilm, IFilmLink } from '../types';
import MoovieCard from '../components/MoovieCard';
import axios from 'axios';
import { Container, Grid } from '@mui/material';
import { getAPI } from '../utils/fetchData';
import { useAppSelector } from '../globalStore/hooks';
import { selectUser } from '../globalStore/slices/authSlice';
import Loader from '../components/Loader';

type FilmsPageProps = {
  films: IFilm[];
}

const FilmsPage: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [films, setFilms] = useState<IFilm[]>([]);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const filmsLinks = await getAPI('movies');
      console.log('filmsLinks', filmsLinks)
      const findedFilms = await Promise.all(filmsLinks.map((async (f: any) => {
        const { data } = await axios.get(f.link.concat(`&apikey=${process.env.NEXT_PUBLIC_IMDB_API_KEY}`));
        return { ...data, id: f.apiId };
      })));
      setFilms(findedFilms);
      setLoading(false);
    })();

  }, []);

  if (loading) {
    return <Loader />;
  }

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


export default FilmsPage