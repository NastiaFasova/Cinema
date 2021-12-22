import React from 'react'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
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

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center', paddingTop: 5, justifyContent: 'space-between' }} className={styles.appbar}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Cineme.</Typography>
        <Navigation />
        {user.email ?
          <Box style={{ display: 'flex', alignItems: 'center', minWidth: 350 }}>
            <Typography variant="caption" sx={{ marginRight: 4, fontWeight: 'bold' }}>{user.email}</Typography>
            {user.role === 'USER' && !user.blocked &&
              <Button variant="contained" startIcon={<AccountBalanceWalletIcon fontSize="small" />}
                sx={{ marginRight: 4, marginLeft: 2, }}>24 $</Button>}
            <Link href="/admin" passHref>
              <a>
                {user.role === 'ADMIN' && <Button variant="outlined" sx={{ marginRight: 4 }}>Admin Page</Button>}
              </a>
            </Link>
            <Button variant="outlined" onClick={handleLogout}>Logout</Button>
            {/* {user.role === 'USER' &&
              <Box display="flex" alignItems="center" ml={2} mr={4}>
                <Button variant="contained" startIcon={<AccountBalanceWalletIcon fontSize="small" />}>
                  0 $
                </Button>
              </Box>} */}
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