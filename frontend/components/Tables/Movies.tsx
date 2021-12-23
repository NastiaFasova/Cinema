import * as React from 'react';
import { DataGrid, GridSelectionModel } from '@mui/x-data-grid';
import { FC, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useDeleteMovieMutation, useFetchAllMoviesQuery, useUpdateMovieMutation } from '../../services/film';
import Loader from '../Loader';
import FormDialogWrapper from '../FormDialogWrapper';
import MovieForm from '../Forms/MovieForm';

const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  {
    field: 'imdbID',
    headerName: 'Film ID on IMDB',
    width: 150,
  },
  {
    field: 'link',
    headerName: 'Link to the film',
    width: 300,
  },
  {
    field: 'title',
    headerName: 'Custom Title',
    width: 200,
  },
  {
    field: 'Title',
    headerName: 'Original Title',
    width: 200,
  },
  {
    field: 'Year',
    headerName: 'Year',
    width: 100,
  },
  {
    field: 'imdbRating',
    headerName: 'Imdb Rating',
    width: 150,
  },
];

const Movies: FC = () => {
  const [selected, setSelected] = useState<any>();
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteMovie, { isLoading: isDeleteLoading }] = useDeleteMovieMutation();
  const [updateMovie, { isLoading: isUpdateLoading }] = useUpdateMovieMutation();
  const onSelect = (
    selectionModel: GridSelectionModel,
  ) => {
    setSelected(selectionModel[0]);
  };

  const handleDelete = () => {
    const isDelete = confirm("Are you sure about that?");
    if (isDelete) {
      deleteMovie(selected);
    }
  }

  const { data = [], isLoading, isError } = useFetchAllMoviesQuery('')

  if (isLoading || isDeleteLoading || isUpdateLoading) return <Loader />;

  return (
    <div style={{ height: 600, width: '100%', marginTop: 20 }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onSelectionModelChange={onSelect}
        hideFooterSelectedRowCount
      />
      {updateDialogOpen &&
        <FormDialogWrapper
          open={updateDialogOpen}
          handleClose={() => setUpdateDialogOpen(false)}
          title="Update Movie"
        >
          <MovieForm type="update" originalValues={data.find((itm) => itm.id === selected) as unknown as Record<string, string>} />
        </FormDialogWrapper>}
      {selected &&
        <Box sx={{ marginTop: 4, paddingBottom: 5, }}>
          <Button value="contained" color="error" onClick={handleDelete}>
            Remove {selected}
          </Button>
          <Button sx={{ marginLeft: 4 }} value="outlined" color="primary" onClick={() => setUpdateDialogOpen(true)}>
            Update
          </Button>
        </Box>
      }
    </div>
  );
};

export default Movies;