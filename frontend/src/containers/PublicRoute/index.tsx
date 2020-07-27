import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AuthorizedUser } from '../Routing/types';

const PublicRoute = ({
  role, component: Component, isAuthorized, ...rest
}: any) => {
  const isAdmin = isAuthorized && role === 'admin';
  const isDefaultUser = isAuthorized && role === 'default';
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isDefaultUser) return <Redirect to={{ pathname: '/chat', state: { from: props.location } }} />;
        if (isAdmin) return <Redirect to={{ pathname: '/users', state: { from: props.location } }} />;
        return <Component {...props} />;
      }}
    />
  );
};

const mapStateToProps = (state: {login: {isAuthorized: boolean, user: AuthorizedUser}}) => ({
  isAuthorized: state.login.isAuthorized,
  role: state.login.user.role,
});

export default connect(mapStateToProps)(PublicRoute);
