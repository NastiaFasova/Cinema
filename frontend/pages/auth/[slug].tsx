import React, { FC } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import LoginForm from '../../components/Forms/LoginForm'
import RegisterForm from '../../components/Forms/RegisterForm'
import { AuthFormsType } from '../../types'
import NotFoundPage from '../404'

type LoginPageProps = {
  type: AuthFormsType;
}

const LoginPage: NextPage<LoginPageProps> = ({ type }) => {
  if (type === 'login') {
    return <LoginForm />
  } else if (type === 'register') {
    return <RegisterForm />
  } else {
    return <NotFoundPage />;
  }
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: { type: ctx?.params?.slug as AuthFormsType }, // will be passed to the page component as props
  }
}


export default LoginPage