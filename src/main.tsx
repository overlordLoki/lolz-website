import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f44336',
      contrastText: '#fff',
    },
    secondary: {
      main: '#2196f3',
      contrastText: '#fff',
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>

  // </React.StrictMode>
)
