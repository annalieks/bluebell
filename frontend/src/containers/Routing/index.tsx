import React, { useEffect } from 'react';
import {
  Redirect, Route, Switch, withRouter, useHistory,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { AuthorizedUser } from './types';
import LoginPage from '../../components/LoginPage';
import UserPage from '../UserEditor';
import NotFound from '../../scenes/NotFound';
import AppHeader from '../../components/AppHeader';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import Chat from '../Chat';
import MessageEditor from '../MessageEditor';
import UserList from '../UserList';
import Error from '../../scenes/Error';

const mapStateToProps = (state: { login: {isAuthorized: boolean, user: AuthorizedUser} }) => ({
  user: state.login.user,
  isAuthorized: state.login.isAuthorized,
});

type Props = ReturnType<typeof mapStateToProps>

const Routing = ({
  user,
  isAuthorized,
}: Props) => {
  const history = useHistory();
  useEffect(() => {
    if (!isAuthorized) {
      history.push('/login');
    }
  }, [history, isAuthorized]);
  return (
    <>
      <AppHeader />
      <Switch>
        <PublicRoute exact path="/login" component={LoginPage} />

        {user.role === 'admin' }
        &&
        (
        <PrivateRoute exact path="/users" component={UserList} />
        <PrivateRoute exact path="/user/:id" component={UserPage} />
        <PrivateRoute exact path="/user" component={UserPage} />
        )

        <PrivateRoute exact path="/chat" component={Chat} />
        <PrivateRoute exact path="/chat/:id" component={MessageEditor} />
        <Route path="/error" exact component={Error} />
        <Route path="*" exact component={NotFound} />
      </Switch>
    </>
  );
};

export default withRouter(connect(mapStateToProps)(Routing));
