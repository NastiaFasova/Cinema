import React, { FC } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import data from '../../docs/movie.json';
import { IFilm, IFilmLink } from '../types';
import MoovieCard from '../components/MoovieCard';
import axios from 'axios';

type FilmsPageProps = {
  films: IFilm[];
}

const FilmsPage: NextPage<FilmsPageProps> = ({ films }) => {
  return (
    <div>
      {films.map((film, i) => (
        <MoovieCard key={i} film={film} />
      ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const films = await Promise.all(data.map((async (film) => {
    const { data } = await axios.get(film.link.concat(`&apikey=${process.env.IMDB_API_KEY}`));
    return data;
  })));

  return {
    props: { films, }, // will be passed to the page component as props
  }
}


export default FilmsPage