import React, { FC, useEffect, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { AuthFormsType } from '../../types'
import { useRouter } from 'next/router'
import { useFetchUserByIdQuery } from '../../services/user'
import Loader from '../../components/Loader'
import Avatar from '@mui/material/Avatar';
import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useAppDispatch } from '../../globalStore/hooks'
import { updateBlockStatus } from '../../globalStore/slices/authSlice'
import Error from '../../components/Error';
import { useFetchAllUserOrdersQuery } from '../../services/shopping-cart'
import { useFetchAllMovieSessionsQuery } from '../../services/movie-session'

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: profile, isLoading, isError } = useFetchUserByIdQuery(router.query.slug as string || '');
  const { data: orders, isLoading: ordersLoading, isError: ordersError } = useFetchAllUserOrdersQuery('');
  const { data: sessions, isLoading: sessionsLoading, isError: sessionsError } = useFetchAllMovieSessionsQuery('');
  const [ordersFormatted, setOrdersFormatted] = useState<any[]>([]);

  console.log('ordersFormatted', ordersFormatted);
  useEffect(() => {
    if (orders && sessions) {
      const uniqueSessions: Record<number, number> = {};
      setOrdersFormatted(orders.map((order) => {
        order.tickets.forEach((t) => {
          uniqueSessions[t.movieSessionId] = uniqueSessions[t.movieSessionId] ? uniqueSessions[t.movieSessionId] + 1 : 1;
        });
        const items = Object.keys(uniqueSessions).map((sId) => {
          const ses = sessions.find((s) => s.id === Number(sId));
          return {
            title: ses?.movieTitle,
            spent: Number(ses?.price) * uniqueSessions[Number(sId)],
            amountOfTickets: uniqueSessions[Number(sId)],
          }
        })

        return {
          orderDate: order.orderDate,
          items
        }
      }));
    }
  }, [orders, sessions])


  useEffect(() => {
    if (profile?.blocked) {
      dispatch(updateBlockStatus(!!profile?.blocked));
    }
  }, [dispatch, profile?.blocked])

  if (isLoading && ordersLoading && sessionsLoading) {
    return <Loader />;
  }

  if (profile?.blocked) {
    return <Error title={`Hey, ${profile.firstname}, you have been blocked 😠`} />;
  }


  return <>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
    <Container sx={{ mt: 5, mb: 15 }}>
      {
        orders && orders.length > 0 ?
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Order Date</TableCell>
                  <TableCell align="left">Information</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ordersFormatted.map((order, i) => (
                  <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {new Date(order.orderDate).toLocaleString()}
                    </TableCell>
                    <TableCell align="left">{order.items.map((itm: any, idx: number) => (
                      <Box key={idx} display="flex">
                        <Typography><span style={{ fontWeight: 'bold' }}>Title:</span> {itm.title}</Typography>
                        <Typography sx={{ ml: 5, mr: 5 }}><span style={{ fontWeight: 'bold' }}>Amount of tickets:</span> {itm.amountOfTickets}</Typography>
                        <Typography><span style={{ fontWeight: 'bold' }}>Money spent:</span> {itm.spent}</Typography>
                      </Box>
                    ))}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> : <Error title="Orders Not Found" />
      }
    </Container>
  </>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: { type: ctx?.params?.slug as AuthFormsType }, // will be passed to the page component as props
  }
}


export default ProfilePage