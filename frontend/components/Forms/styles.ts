import { SxProps, Theme } from '@mui/material';

export const formStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '& > div': {
    marginTop: 5,
    '& input': {
      width: 320,
    },
  }
};
