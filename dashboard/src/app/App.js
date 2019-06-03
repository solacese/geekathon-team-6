//@flow

import React from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

import { Provider } from 'react-redux'

import store from './store'

import Dashboard from './containers/DashboardContainer';

// store.subscribe(() => console.log(store.getState()))

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
  typography: {
    useNextVariants: true,
  },
});


function App() {
  
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </MuiThemeProvider>
  );
}

export default App

