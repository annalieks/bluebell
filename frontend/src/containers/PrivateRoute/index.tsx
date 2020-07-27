import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AuthorizedUser } from '../Routing/types';

const PrivateRoute = ({ component: Component, isAuthorized, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) => (isAuthorized
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />)}
  />
);

const mapStateToProps = (state: {login: {isAuthorized: boolean, user: AuthorizedUser}}) => ({
  isAuthorized: state.login.isAuthorized,
});

export default connect(mapStateToProps)(PrivateRoute);
