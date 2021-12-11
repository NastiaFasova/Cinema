import React, { FC, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import data from '../../docs/cinema_halls.json';
import { ICinemaHall } from '../types';
import { Box, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import CinemaHallCard from '../components/CinemaHallCard';

type FilmsPageProps = {
  cinemaHalls: ICinemaHall[];
}

const FilmsPage: NextPage<FilmsPageProps> = ({ cinemaHalls }) => {
  const [select, setSelect] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelect(event.target.value as string);
  };

  return (
    <div>
      <Container>

        <Box sx={{ maxWidth: 320, marginBottom: 6 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={select}
              label="Sort by"
              onChange={handleChange}
            >
              <MenuItem value="capacityASC">Capacity ASC</MenuItem>
              <MenuItem value="capacityDESC">Capacity DESC</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={2}>
          {cinemaHalls.sort((a, b) => {
            if (select === 'capacityASC') {
              return a.capacity - b.capacity;
            } else if (select === 'capacityDESC') {
              return b.capacity - a.capacity;
            } else {
              return 0;
            }
          }).map((hall, i) => (
            <Grid item xs={4} key={hall.id}>
              <CinemaHallCard cinemaHall={hall} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: { cinemaHalls: data, }, // will be passed to the page component as props
  }
}


export default FilmsPage