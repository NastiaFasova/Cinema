import * as React from 'react';
import { DataGrid, GridActionsCellItem, GridRowId, GridSelectionModel } from '@mui/x-data-grid';
import { FC, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useDeleteMovieMutation, useFetchAllMoviesQuery, useUpdateMovieMutation } from '../../services/film';
import Loader from '../Loader';
import FormDialogWrapper from '../FormDialogWrapper';
import MovieForm from '../Forms/MovieForm';
import { useBlockUserMutation, useDeleteUserMutation, useFetchAllUsersQuery, useUnblockUserMutation } from '../../services/user';
import BlockIcon from '@mui/icons-material/Block';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const Users: FC = () => {

  const [blockUser, { isLoading: blockLoading }] = useBlockUserMutation();
  const [unblockUser, { isLoading: unblockLoading }] = useUnblockUserMutation();
  const [deleteUser, { isLoading: isDeleteLoading }] = useDeleteUserMutation();

  // https://mui.com/components/data-grid/columns/#custom-column-types
  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'email',
      headerName: 'User Email',
      width: 250,
    },
    {
      field: 'firstname',
      headerName: 'First Name',
      width: 200,
    },
    {
      field: 'lastname',
      headerName: 'Last Name',
      width: 200,
    },
    {
      field: 'blocked',
      headerName: 'Is blocked?',
      width: 150,
      type: 'boolean',
    },
    {
      field: 'actions',
      type: 'actions',
      width: 25,
      getActions: (params: any) => [
        <GridActionsCellItem
          key={1}
          icon={<BlockIcon />}
          label="Block"
          onClick={() => blockUser(params.id)}
          showInMenu
        />,
        <GridActionsCellItem
          key={1}
          icon={<LockOpenIcon />}
          label="Unblock"
          onClick={() => unblockUser(params.id)}
          showInMenu
        />,
      ],
    },
  ];

  const [selected, setSelected] = useState<any>();
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  const onSelect = (
    selectionModel: GridSelectionModel,
  ) => {
    setSelected(selectionModel[0]);
  };

  const handleDelete = () => {
    const isDelete = confirm("Are you sure about that?");
    if (isDelete) {
      deleteUser(selected);
    }
  }

  const { data = [], isLoading, isError } = useFetchAllUsersQuery('')

  if (isLoading || isDeleteLoading || blockLoading || unblockLoading) return <Loader />;

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
        </Box>
      }
    </div>
  );
};

export default Users;