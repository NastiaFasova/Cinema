import React, { FC, useEffect } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { AuthFormsType } from '../../types'
import { useRouter } from 'next/router'
import { useFetchUserByIdQuery } from '../../services/user'
import Loader from '../../components/Loader'
import Avatar from '@mui/material/Avatar';
import { Box, Typography } from '@mui/material'
import { useAppDispatch } from '../../globalStore/hooks'
import { updateBlockStatus } from '../../globalStore/slices/authSlice'
import Error from '../../components/Error';

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: profile, isLoading, isError } = useFetchUserByIdQuery(router.query.slug as string || '');

  useEffect(() => {
    if (profile?.blocked) {
      dispatch(updateBlockStatus(!!profile?.blocked));
    }
  }, [dispatch, profile?.blocked])

  if (isLoading) {
    return <Loader />;
  }

  if (profile?.blocked) {
    return <Error title={`Hey, ${profile.firstname}, you have been blocked 😠`} />;
  }


  return <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Avatar
      alt={profile?.firstname}
      src={profile?.avatarUrl}
      sx={{ width: 125, height: 125 }}
    />
    <Typography variant="h6" sx={{ mt: 2 }}>{`${profile?.firstname} ${profile?.lastname}`}</Typography>
    <Typography variant="subtitle1" sx={{ mt: 2 }}>Balance:
      <span style={{ fontWeight: 'bold', marginLeft: 5, display: 'inline-block' }}>{Number(profile?.bill)}$</span>
    </Typography>
    <Typography variant="subtitle1" sx={{ mt: 2 }}>Role:
      <span style={{ fontWeight: 'bold', marginLeft: 5, display: 'inline-block' }}>{profile?.role}</span>
    </Typography>
  </Box>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: { type: ctx?.params?.slug as AuthFormsType }, // will be passed to the page component as props
  }
}


export default ProfilePage