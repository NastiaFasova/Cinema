import { Box, Container, Typography } from '@mui/material';
import React, { FC } from 'react'

const styles = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
};

type FormWrapperProps = {
  title?: string;
  subtitleNode?: React.ReactNode;
}

const FormWrapper: FC<FormWrapperProps> = ({ title, subtitleNode, children }) => {
  return (
    <Container>
      <Box sx={styles as any}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }} align="center">
          {title}
        </Typography>
        <Typography variant="caption" align="center">
          {subtitleNode}
        </Typography>
        {children}
      </Box>
    </Container >
  )
}

export default FormWrapper
