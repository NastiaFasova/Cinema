import React from 'react'
import Image from 'next/image'
import styles from './AppBar.module.scss';
import Link from 'next/link'
import Navigation from '../Navigation';
import "../../styles/variables.module.scss";
import { Box, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../globalStore/hooks';
import { logout, selectUser } from '../../globalStore/slices/authSlice';

const AppBar = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center', paddingTop: 5, justifyContent: 'space-between' }} className={styles.appbar}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Cineme.</Typography>
        <Navigation />
        {user.email ?
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="caption" sx={{ marginRight: 4, fontWeight: 'bold' }}>{user.email}</Typography>
            <Link href="/admin" passHref>
              <a>
                <Button variant="outlined" sx={{ marginRight: 4 }}>Admin Page</Button>
              </a>
            </Link>
            <Button variant="outlined" onClick={() => dispatch(logout())}>Logout</Button>
          </Box> :
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
          </Box>}
      </Box>
    </Container>
  )
}

export default AppBar