import { Container, createTheme, CssBaseline, Paper, ThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ChooseOrderType from './screens/ChooseOrderType';
import Home from './screens/Home';
import { OrderScreen } from './screens/OrderScreen';

const theme = createTheme({
  typography: {
    h1: {
      fontWeight: 'bold'
    },
    h2: {
      fontSize: '2rem',
      color: 'black'
    }, 
    h3: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: 'white',
    }
  },
  palette: {
    primary:{
      main: '#ff1744'
    },
    secondary: {
      main: '#118e16',
      contrastText: '#ffffff',
    },
  },
})


function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm">
          <Paper>
            <Switch>
              <Route path='/' component={Home} exact={true} />
              <Route path='/choose' component={ChooseOrderType} exact={true}/>
              <Route path='/order' component={OrderScreen} exact={true}/>
            </Switch>
          </Paper>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
