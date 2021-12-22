import { FC, SyntheticEvent, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import MovieForm from '../components/Forms/MovieForm';
import HallForm from '../components/Forms/HallForm';
import Halls from '../components/Tables/Halls';
import Movies from '../components/Tables/Movies';
import SessionForm from '../components/Forms/SessionForm';
import Sessions from '../components/Tables/Sessions';
import FormWrapper from '../components/Forms';
import Link from 'next/link';
import Users from '../components/Tables/Users';

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
              <Tab label="Users Control" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <FormWrapper
              title="Add a new movie"
              subtitleNode={
                <>
                  You can find any on
                  <Link href="https://www.imdb.com" passHref>
                    <a target="_blank"><span style={{ color: "#999999", marginLeft: 6 }}>IMDB</span></a>
                  </Link>
                </>
              }
            >
              <MovieForm />
            </FormWrapper>
            <Movies />
          </TabPanel>
          <TabPanel value="2">
            <FormWrapper
              title="Add a new hall"
            >
              <HallForm />
            </FormWrapper>
            <Halls />
          </TabPanel>
          <TabPanel value="3">
            <FormWrapper
              title="Add a new movie session"
            >
              <SessionForm />
            </FormWrapper>
            <Sessions />
          </TabPanel>
          <TabPanel value="4">
            <Users />
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