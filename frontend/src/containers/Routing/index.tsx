import React, {useEffect} from 'react';
import { Redirect, Route, Switch, withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import App from '../../App';
import { AuthorizedUser } from './types';
import LoginPage from '../../components/LoginPage';
import Users from '../Users';
import UserPage from '../UserPage';
import NotFound from '../../scenes/NotFound';
import AppHeader from '../../components/AppHeader';

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
        <Route exact path="/login" component={LoginPage} />
        {
              user.role === 'admin'
              && (
              <Route exact path="/users" component={Users} />
              )
              && (
              <Route exact path="/users/:id" component={UserPage} />
              )
        }
        <Route exact path="/chat" component={App} />
        {/* <PrivateRoute exact path="/chat/:id" component={MessagePage} /> */}
        <Route path="*" exact component={NotFound} />
      </Switch>
    </>
  );
};

export default withRouter(connect(mapStateToProps)(Routing));
