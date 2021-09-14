import { Container, createTheme, CssBaseline, Paper, ThemeProvider } from '@material-ui/core';
import { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminScreen from './screens/AdminScreen';
import ChooseOrderType from './screens/ChooseOrderType';
import CompletedOrderScreen from './screens/CompletedOrderScreen';
import Home from './screens/Home';
import { OrderScreen } from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import { ReviewScreen } from './screens/ReviewScreen';
import SelectPaymentScreen from './screens/SelectPaymentScreen';
import { Store } from './store';

const theme = createTheme({
  typography: {
    h1: {
      fontWeight: 'bold'
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: 'black'
    }, 
    h3: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: 'white',
    },
    h4: {
      fontSize: '1.6rem'
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
  const { state } = useContext(Store);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth={ state.wideScreen ? "lg" : "sm" }>
          <Paper>
            <Switch>
              <Route path='/' component={Home} exact={true} />
              <Route path='/choose-order-type' component={ChooseOrderType} exact={true}/>
              <Route path='/order' component={OrderScreen} exact={true}/>
              <Route path='/review' component={ReviewScreen} exact={true}/>
              <Route path='/select-payment' component={SelectPaymentScreen} exact={true}/>
              <Route path='/payment' component={PaymentScreen} exact={true}/>
              <Route path='/complete' component={CompletedOrderScreen} exact={true}/>
              <Route path='/admin' component={AdminScreen} exact={true}/>
            </Switch>
          </Paper>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
