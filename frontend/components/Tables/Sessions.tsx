import * as React from 'react';
import { DataGrid, GridSelectionModel } from '@mui/x-data-grid';
import { FC, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useDeleteMovieSessionMutation, useFetchAllMovieSessionsQuery, useUpdateMovieSessionMutation } from '../../services/movie-session';
import Loader from '../Loader';
import FormDialogWrapper from '../FormDialogWrapper';
import HallForm from '../Forms/HallForm';
import SessionForm from '../Forms/SessionForm';

const MovieSession: FC = () => {

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'movieTitle',
      headerName: 'Film Title',
      width: 300,
    },
    {
      field: 'cinemaHallId',
      headerName: 'Hall',
      width: 80,
    },
    {
      field: 'maxTicketCount',
      headerName: 'Maximum Tickets',
      type: 'number',
      width: 150,
    },
    {
      field: 'currentTicketCount',
      headerName: 'Current Tickets Count',
      type: 'number',
      width: 180,
    },
    {
      field: 'showTime',
      headerName: 'Date',
      width: 100,
    },
    {
      field: 'image',
      headerName: 'Poster',
      width: 250,
      renderCell: (params: any) =>
        <div
          style={{
            backgroundImage: `url('${params.value}')`,
            backgroundSize: 'cover',
            width: '90%',
            height: '90%',
            borderRadius: 5,
          }}
        />, // renderCell will render the component
    }
  ];

  const [selected, setSelected] = useState<any>();
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteMovieSession, { isLoading: isDeleteLoading }] = useDeleteMovieSessionMutation();
  const onSelect = (
    selectionModel: GridSelectionModel,
  ) => {
    setSelected(selectionModel[0]);
  };

  const handleDelete = () => {
    const isDelete = confirm("Are you sure about that?");
    if (isDelete) {
      deleteMovieSession(selected);
    }
  }

  const { data = [], isLoading, isError } = useFetchAllMovieSessionsQuery('')

  if (isLoading || isDeleteLoading) return <Loader />;

  return (
    <div style={{ height: 600, width: '100%', marginTop: 20 }}>
      <DataGrid
        rows={data}
        rowHeight={52 * 5}
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
          <SessionForm type="update" originalValues={data.find((itm) => itm.id === selected) as unknown as Record<string, string>} />
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

export default MovieSession;