import { Button, Card, CardActions, CardContent } from '@mui/material';
import React, { FC } from 'react'
import { IFilm } from '../../types';

type MoovieCardProps = {
  film: IFilm;
}

const MoovieCard: FC<MoovieCardProps> = ({ film }) => {
  return (
    <Card>
      <CardContent>
        {film.Title}
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default MoovieCard
