import './App.css';
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { teal } from '@material-ui/core/colors';
import Home from './views/Home';
import NatureSpots from './views/NatureSpots';
import SpotDetails from './views/SpotDetails';
import Signup from './views/Authentication/Signup';
import Login from './views/Authentication/Login';

// context

let theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[200],
    },
    secondary: {
      main: teal[500],
    },
  },
  typography: {
    fontFamily: 'Raleway',
    fontWeightLight: 300,
    fontWeightRegular: 500,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});
theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" children={<Home />} />
            <Route exact path="/naturespots" children={<NatureSpots />} />
            <Route exact path="/details/:spotId" children={<SpotDetails />} />

            {/* Authentication */}
            <Route exact path="/signup" children={<Signup />} />
            <Route exact path="/login" children={<Login />} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
