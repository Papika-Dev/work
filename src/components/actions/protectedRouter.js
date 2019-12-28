import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRouter = ({ children, isAuth, path }) => (
  <Route
    path={path}
    render={({ location }) => (
      isAuth ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: location.pathname },
          }}
        />
      ))}
  />
);

ProtectedRouter.propTypes = {
  children: PropTypes.node.isRequired,
  isAuth: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
};
export default ProtectedRouter;
