import * as React from 'react';
import { DataGrid, GridSelectionModel } from '@mui/x-data-grid';
import { FC, useEffect, useState } from 'react';
import { ICinemaHall } from '../../types';
import { useAppDispatch, useAppSelector } from '../../globalStore/hooks';
import { deleteSession, getMovies, getSessions, selectAdmin } from '../../globalStore/slices/adminSlice';
import { Button } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'film',
    headerName: 'Film Title',
    width: 300,
  },
  {
    field: 'hall',
    headerName: 'Hall identifier',
    width: 400,
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 200,
  }
];

const Sessions: FC = () => {
  const [selected, setSelected] = useState<any>();
  const dispatch = useAppDispatch();
  const admin = useAppSelector(selectAdmin)
  const onSelect = (
    selectionModel: GridSelectionModel,
    // _: GridCallbackDetails,
  ) => {
    setSelected(selectionModel[0]);
  };

  const handleDelete = () => {
    const isDelete = confirm("Are you sure about that?");
    if (isDelete) {
      dispatch(deleteSession(selected));
    }
  }

  useEffect(() => {
    dispatch(getSessions(null));
  }, [dispatch]);

  return (
    <div style={{ height: 600, width: '100%', marginTop: 20 }}>
      <DataGrid
        rows={admin.movieSessions}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onSelectionModelChange={onSelect}
        hideFooterSelectedRowCount
      />
      {selected &&
        <Button sx={{ marginTop: 4, marginBottom: 10 }} value="contained" color="error" onClick={handleDelete}>
          Remove {selected}
        </Button>
      }
    </div>
  );
};

export default Sessions;