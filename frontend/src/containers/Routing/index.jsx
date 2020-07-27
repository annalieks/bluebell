import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginPage from 'src/containers/LoginPage';
import Spinner from 'src/components/Spinner';
import NotFound from 'src/scenes/NotFound';
import PrivateRoute from 'src/containers/PrivateRoute';
import PublicRoute from 'src/containers/PublicRoute';
import { loadCurrentUser, logout } from 'src/containers/Profile/actions';
import { applyPost } from 'src/containers/Thread/actions';
import PropTypes from 'prop-types';

const Routing = ({
  user,
  isAuthorized,
  isLoading,
}) => {
  useEffect(() => {
    if (!isAuthorized) {
      history.push('/login');
    }
  }, [history, isAuthorized]);

  return (
    isLoading
      ? <Spinner />
      : (
        <div>
          <main>
            <Switch>
              <PublicRoute exact path="/login" component={LoginPage} />
              {
                user.role === 'admin'
                && <PrivateRoute exact path="/users" component={Users} />
                && <PrivateRoute exact path="/users/:id" component={UserPage} />
              }
              <PrivateRoute exact path="/" component={Chat} />
              <PrivateRoute exact path="/chat/:id" component={MessagePage} />
              <Route path="*" exact component={NotFound} />
            </Switch>
          </main>
        </div>
      )
  );
};

Routing.propTypes = {
  isAuthorized: PropTypes.bool,
  user: PropTypes.objectOf(PropTypes.any),
  isLoading: PropTypes.bool,
};

Routing.defaultProps = {
  isAuthorized: false,
  user: {},
  isLoading: true,
};

const actions = { loadCurrentUser, logout, applyPost };

const mapStateToProps = ({ profile }) => ({
  isAuthorized: profile.isAuthorized,
  user: profile.user,
  isLoading: profile.isLoading,
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Routing);
