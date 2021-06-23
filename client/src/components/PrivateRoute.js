import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { userInfo } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        return userInfo ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
}
