import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import React from 'react'
import { store } from '../globalStore/store'
import { Provider } from 'react-redux'
import Navigation from '../components/Navigation'
import AppBar from '../components/AppBar'
import theme from '../theme'
import {
  ThemeProvider,
  ThemeProvider as CoreThemeProvider,
} from '@mui/material/styles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CoreThemeProvider theme={theme}>
          <AppBar />
          <Component {...pageProps} />
        </CoreThemeProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
