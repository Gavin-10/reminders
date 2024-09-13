import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SetReminder from './components/setReminder.tsx'
import { addReminder, reminderData } from './actions/newReminderActions.ts'
import { loader } from './actions/pageLoader.ts'

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#212121',
      paper: '#263238',
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    loader: loader,
  },
  {
    path: "/form/:reminderId",
    element: <SetReminder />,
    loader: reminderData,
    action: addReminder,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
