import { Badge, Box, Button, Container, Drawer, Grid, LinearProgress, Slider, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { useEffect, useMemo, useState } from 'react';
import { ICartItem, IFilm } from '../types';
import { useAppSelector } from '../globalStore/hooks';
import { selectUser } from '../globalStore/slices/authSlice';
import Sessions from '../components/Sessions';
import Link from 'next/link';
import Error from '../components/Error';

const Home: NextPage = () => {
  const user = useAppSelector(selectUser);


  if (user.blocked) {
    return <Error title="You are blocked" />;
  }

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

export default Home;