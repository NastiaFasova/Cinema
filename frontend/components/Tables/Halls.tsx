import * as React from 'react';
import { DataGrid, GridSelectionModel } from '@mui/x-data-grid';
import { FC, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useDeleteHallMutation, useFetchAllHallsQuery, useUpdateHallMutation } from '../../services/hall';
import Loader from '../Loader';
import FormDialogWrapper from '../FormDialogWrapper';
import HallForm from '../Forms/HallForm';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'description',
    headerName: 'Description',
    width: 200,
  },
  {
    field: 'capacity',
    headerName: 'Capacity',
    type: 'number',
    width: 200,
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 200,
  }
];

const Halls: FC = () => {
  const [selected, setSelected] = useState<any>();
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteHall, { isLoading: isDeleteLoading }] = useDeleteHallMutation();
  const [updateHall, { isLoading: isUpdateLoading }] = useUpdateHallMutation();
  const onSelect = (
    selectionModel: GridSelectionModel,
  ) => {
    setSelected(selectionModel[0]);
  };

  const handleDelete = () => {
    const isDelete = confirm("Are you sure about that?");
    if (isDelete) {
      deleteHall(selected);
    }
  }

  const { data = [], isLoading, isError } = useFetchAllHallsQuery('')

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
          <HallForm type="update" originalValues={data.find((itm) => itm.id === selected) as unknown as Record<string, string>} />
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

export default Halls;