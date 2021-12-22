import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import MoovieCard from '../components/MoovieCard';
import { Box, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, Typography } from '@mui/material';
import { useAppSelector } from '../globalStore/hooks';
import { selectUser } from '../globalStore/slices/authSlice';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { useFetchAllMoviesQuery } from '../services/film';
import { IFilm } from '../types';

const sortFunc = (select: string) => (a: IFilm, b: IFilm) => {
  if (select === 'capacityASC') {
    return Number(a.imdbRating) - Number(b.imdbRating);
  } else if (select === 'capacityDESC') {
    return Number(b.imdbRating) - Number(a.imdbRating);
  } else {
    return 0;
  }
}

const FilmsPage: NextPage = () => {
  const { data = [], isLoading, isError } = useFetchAllMoviesQuery('')
  const [selectSorting, setSelectSorting] = useState('');

  const [currentRating, setCurrentRating] = useState<number>(0);
  const [films, setFilms] = useState(data);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    setFilms(data);
  }, [data])

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error title="Something went wrong" />;
  }

  const handleFilters = () => {
    setFilms(data.filter((s) => Number(s.imdbRating) >= currentRating))
  }

  const handleChangeSorting = (event: SelectChangeEvent) => {
    setSelectSorting(event.target.value as string);
  };

  return (
    <div>
      <Container>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={6}>
          <Box width={300} mr={5}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectSorting}
                label="Sort by"
                onChange={handleChangeSorting}
              >
                <MenuItem value="capacityASC">Rating ASC</MenuItem>
                <MenuItem value="capacityDESC">Rating DESC</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box width={300}>
            <Typography variant="subtitle1">By rating: </Typography>
            <Slider
              min={0}
              max={10}
              step={0.01}
              size="small"
              value={currentRating}
              aria-label="Small"
              valueLabelDisplay="auto"
              onChange={(e: Event, v: number | Array<number>, aT: number) => setCurrentRating(v as number)}
              onChangeCommitted={handleFilters}
            />
          </Box>
        </Box>
        <Grid container spacing={2}>
          {films.length > 0 ? films.slice().sort(sortFunc(selectSorting)).map((film, i) => (
            <Grid item xs={3} key={film.id}>
              <MoovieCard film={film} />
            </Grid>
          )) : <Error title="Not Found :(" />}
        </Grid>
      </Container>
    </div>
  )
}


export default FilmsPage