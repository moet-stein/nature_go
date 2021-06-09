import './App.css';
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { teal } from '@material-ui/core/colors';
import Home from './views/Home';
import Parks from './views/Parks';
import Signup from './views/Authentication/Signup';
import Login from './views/Authentication/Login';

// context

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fefefe',
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
            <Route exact path="/parks" children={<Parks />} />

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
