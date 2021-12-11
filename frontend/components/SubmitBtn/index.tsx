import { Box, Button } from '@mui/material';
import { FC } from 'react';

type SubmitBtnProps = {
  title: string;
};

const SubmitBtn: FC<SubmitBtnProps> = ({ title }) => (
  <Box style={{ margin: '10px' }} display="flex" justifyContent="center">
    <Button variant="contained" color="primary" type="submit">
      {title}
    </Button>
  </Box>
);

export default SubmitBtn;