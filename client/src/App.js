import './App.css';
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { teal } from '@material-ui/core/colors';
import Home from './views/Home';
import NatureSpots from './views/NatureSpots';
import SpotDetails from './views/SpotDetails';
import MyPage from './views/MyPage';
import SavedToMatch from './views/SavedToMatch';
import Signup from './views/Authentication/Signup';
import Login from './views/Authentication/Login';
import { AuthProvider } from './context/AuthContext';
import { NatureSpotsProvider } from './context/NatureSpotsContext';
import { MarkerProvider } from './context/MarkerContext';
import { FavSavProvider } from './context/FavSavContext';
import { PicsArrProvider } from './context/PicsArrContext';
import { MyPicFavPicProvider } from './context/MyPicFavPicContext';
import { SavedArrProvider } from './context/SavedArrContext';

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
          <AuthProvider>
            <NatureSpotsProvider>
              <MarkerProvider>
                <PicsArrProvider>
                  <MyPicFavPicProvider>
                    <FavSavProvider>
                      <SavedArrProvider>
                        <Switch>
                          <Route exact path="/" children={<Home />} />
                          <Route
                            exact
                            path="/naturespots"
                            children={<NatureSpots />}
                          />
                          <Route
                            exact
                            path="/details/:spotId"
                            children={<SpotDetails />}
                          />
                          <PrivateRoute
                            exact
                            path="/mypage/:userId"
                            children={<MyPage />}
                          />
                          <PrivateRoute
                            exact
                            path="/savedtomatch/:userId"
                            children={<SavedToMatch />}
                          />

                          {/* Authentication */}
                          <Route exact path="/signup" children={<Signup />} />
                          <Route exact path="/login" children={<Login />} />
                        </Switch>
                      </SavedArrProvider>
                    </FavSavProvider>
                  </MyPicFavPicProvider>
                </PicsArrProvider>
              </MarkerProvider>
            </NatureSpotsProvider>
          </AuthProvider>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
