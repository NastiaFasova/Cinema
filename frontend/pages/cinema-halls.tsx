import React, { FC, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import Error from '../components/Error';
import { Box, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import CinemaHallCard from '../components/CinemaHallCard';
import { useFetchAllHallsQuery } from '../services/hall';
import Loader from '../components/Loader';

const FilmsPage: NextPage = () => {
  const { data = [], isLoading, isError } = useFetchAllHallsQuery('')
  const [select, setSelect] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelect(event.target.value as string);
  };

  if (isLoading) {
    return <Loader />
  }

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
          {!(data.length < 1) ? data.slice().sort((a, b) => {
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
          )) : <Error title="Not Found :(" />}
        </Grid>
      </Container>
    </div>
  )
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   return {
//     props: { cinemaHalls: data, }, // will be passed to the page component as props
//   }
// }


export default FilmsPage