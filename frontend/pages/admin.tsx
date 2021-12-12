import { FC, SyntheticEvent, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import AddMovieForm from '../components/Forms/AddMovieForm';
import AddHallForm from '../components/Forms/AddHallForm';
import Halls from '../components/Tables/Halls';
import Movies from '../components/Tables/Movies';
import AddSessionForm from '../components/Forms/AddSessionForm';
import Sessions from '../components/Tables/Sessions';

const AdminPage: NextPage = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Movies Control" value="1" />
              <Tab label="Cinema Halls Control" value="2" />
              <Tab label="Sessions Control" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <AddMovieForm />
            <Movies />
          </TabPanel>
          <TabPanel value="2">
            <AddHallForm />
            <Halls />
          </TabPanel>
          <TabPanel value="3">
            <AddSessionForm />
            <Sessions />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   return {
//     props: { type: ctx?.params?.slug as AuthFormsType }, // will be passed to the page component as props
//   }
// }


export default AdminPage