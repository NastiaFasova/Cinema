import { Badge, Box, Button, Container, Drawer, Grid, LinearProgress, Slider, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { useEffect, useMemo, useState } from 'react';
import { ICartItem, IFilm } from '../types';
import { useAppSelector } from '../globalStore/hooks';
import { selectUser } from '../globalStore/slices/authSlice';
import Sessions from '../components/Sessions';
import Link from 'next/link';

const data: ICartItem[] = [{
  id: 1,
  category: "specific",
  description: "This is a description of a film",
  image: "https://m.media-amazon.com/images/M/MV5BMDI5ZWJhOWItYTlhOC00YWNhLTlkNzctNDU5YTI1M2E1MWZhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
  price: 25,
  title: "Title",
  amount: 33,
},
{
  id: 2,
  category: "specific",
  description: "This is a description of a film",
  image: "https://m.media-amazon.com/images/M/MV5BMDI5ZWJhOWItYTlhOC00YWNhLTlkNzctNDU5YTI1M2E1MWZhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
  price: 155,
  title: "Title",
  amount: 25,
},
{
  id: 3,
  category: "specific",
  description: "This is a description of a film",
  image: "https://m.media-amazon.com/images/M/MV5BMDI5ZWJhOWItYTlhOC00YWNhLTlkNzctNDU5YTI1M2E1MWZhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
  price: 5,
  title: "Title",
  amount: 5,
},
{
  id: 4,
  category: "specific",
  description: "This is a description of a film",
  image: "https://m.media-amazon.com/images/M/MV5BMDI5ZWJhOWItYTlhOC00YWNhLTlkNzctNDU5YTI1M2E1MWZhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
  price: 33,
  title: "Title",
  amount: 2,
}
];

const Home: NextPage = () => {
  const user = useAppSelector(selectUser);


  return <>
    {user.email ? <Sessions /> :
      <Container>
        <Box sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} mt={35}>
          <Typography variant="h3">Welcome to the Cineme</Typography>
          <Typography variant="subtitle1" sx={{ width: 800, mt: 4 }}>At Cineme, we want to entertain the world. Whatever your taste, and no matter where you live, we give you access to best-in-class TV shows, movies and other stuff</Typography>
          <Box mt={5}>
            <Link href="/auth/register"><a><Button variant="contained">Register</Button></a></Link>
            <Box ml={3} mr={3} display="inline-block" fontSize={14}>or</Box>
            <Link href="/films"><a><Button variant="text">Show Movies</Button></a></Link>
          </Box>
        </Box>
      </Container>
    }
  </>
}

export default Home
