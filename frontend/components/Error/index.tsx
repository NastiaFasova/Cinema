import { Box, Typography } from '@mui/material'
import React, { FC } from 'react'

type ErrorProps = {
  title: string;
}

const Error: FC<ErrorProps> = ({ title }) => {
  return (
    <Box height="86vh" alignItems="center" width="100%" display="flex" justifyContent="center">
      <Typography variant="h3" align="center">{title}</Typography>
    </Box>
  )
}

export default Error
