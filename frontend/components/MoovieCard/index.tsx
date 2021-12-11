import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import React, { FC } from 'react'
import { IFilm } from '../../types';
import variables from '../../styles/variables.module.scss';

type MoovieCardProps = {
  film: IFilm;
}

const MoovieCard: FC<MoovieCardProps> = ({ film }) => {

  const styles: any = {
    backgroundImage: `url('${film.Poster}')`,
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
        <Link href={`/film/${film.id}`} passHref>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={styles} />
            <Typography align="center" variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: 2 }}>{film.Title}</Typography>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Typography align="center" variant="subtitle2">Rating IMDB: </Typography>
              <Typography align="center" variant="caption" sx={{ marginLeft: 2, marginTop: 0.4 }}>{film.imdbRating}</Typography>
            </Box>
          </Box>
        </Link>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center', paddingBottom: 5 }}>
        <Button size="small" variant="contained">Learn More</Button>
      </CardActions>
    </Card >
  );

}

export default MoovieCard
