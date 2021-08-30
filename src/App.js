import { Container, createTheme, CssBaseline, Paper, ThemeProvider } from '@material-ui/core';
import Home from './screens/Home';

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
          <Home></Home>
      </Container>
    </ThemeProvider>
  );
}

export default App;
