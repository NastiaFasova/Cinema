import React, { FC } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import LoginForm from '../../components/Forms/LoginForm'
import RegisterForm from '../../components/Forms/RegisterForm'
import { AuthFormsType } from '../../types'
import NotFoundPage from '../404'
import { useRouter } from 'next/router'

type MoviePageProps = {
  type: AuthFormsType;
}

const MoviePage: NextPage<MoviePageProps> = ({ type }) => {
  const router = useRouter();
  console.log('router', router.query.slug)
  return <div />
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: { type: ctx?.params?.slug as AuthFormsType }, // will be passed to the page component as props
  }
}


export default MoviePage