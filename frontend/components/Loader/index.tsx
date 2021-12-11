import React, { FC } from 'react';
import { CircularProgress, Box } from '@mui/material';

export type LoaderProps = {
  zIndex?: number;
  height?: string;
  pos?: 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed';
};

const Loader: FC<LoaderProps> = ({
  zIndex = 1,
  height = '100vh',
  pos = 'fixed',
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        position: pos,
        top: 0,
        left: 0,
        zIndex,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
