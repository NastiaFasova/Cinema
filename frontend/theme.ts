import { createTheme, darken, Theme, ThemeOptions } from '@mui/material/styles';
import variables from './styles/variables.module.scss';
export interface ITheme extends Theme { }

const theme = createTheme({
  spacing: 5,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    background: {
      paper: '#fff',
      gray: '#eaeaea',
    },
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          // minWidth: '500px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: variables.primaryColor,
          ':hover': {
            backgroundColor: darken(variables.primaryColor, 0.15),
          },
        },
        outlined: {
          borderColor: variables.primaryColor,
          color: variables.textColor,
          ':hover': {
            borderColor: darken(variables.primaryColor, 0.15),
          },
        }
      }
    }
  },
} as unknown as ThemeOptions);

export default theme;