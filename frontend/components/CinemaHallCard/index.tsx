import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import React, { FC } from 'react'
import { ICinemaHall } from '../../types';
import variables from '../../styles/variables.module.scss';

type CinemaHallCardProps = {
  cinemaHall: ICinemaHall;
}

const CinemaHallCard: FC<CinemaHallCardProps> = ({ cinemaHall }) => {

  const styles: any = {
    height: 400, borderRadius: 2,
    boxShadow: `1px 1px 10px ${variables.textColor}`,
    cursor: 'pointer',
    position: 'relative',
    transition: '0.3s',
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: variables.textColor,
      opacity: 0.25,
    },
    '&:hover': {
      boxShadow: 'none',
    },
  }

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Capacity: <span style={{ fontWeight: 'bold' }}>{cinemaHall.capacity}</span>
        </Typography>
        <Typography variant="h5" component="div">
          {cinemaHall.name}
        </Typography>
        <Typography variant="body2">
          {cinemaHall.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Show</Button>
      </CardActions>
    </Card>
  );

}

export default CinemaHallCard
