import React from 'react'
import Image from 'next/image'
import styles from './AppBar.module.scss';
import Link from 'next/link'
import Navigation from '../Navigation';
import "../../styles/variables.module.scss";
import { Box, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const AppBar = () => {

  const router = useRouter();

  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center', paddingTop: 5, justifyContent: 'space-between' }} className={styles.appbar}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Cineme.</Typography>
        <Navigation />
        <Box>
          <Link href='/auth/login'>
            <a>
              <Button variant="contained" sx={{ marginRight: 4 }}>Login</Button>
            </a>
          </Link>
          <Link href='/auth/register'>
            <a>
              <Button variant="outlined">Register</Button>
            </a>
          </Link>
        </Box>
      </Box>
    </Container>
  )
}

export default AppBar