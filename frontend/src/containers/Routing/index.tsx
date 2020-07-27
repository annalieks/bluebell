import React, { useEffect } from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import PropTypes from 'prop-types';
import App from '../../App';
import { AuthorizedUser } from './types';
import { loginUser } from './actions';
import PublicRoute from '../PublicRoute';
import LoginPage from '../../components/LoginPage';
import PrivateRoute from '../PrivateRoute';
import Users from '../Users';
import UserPage from '../UserPage';
import NotFound from '../../scenes/NotFound';

const mapStateToProps = (state: { login: {isLoading: boolean, user: AuthorizedUser} }) => ({
  user: state.login.user,
});

const mapDispatchToProps = {
  loginUser,
};

type Props = ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps & RouteComponentProps

const Routing = ({
  user,
}: Props) => (
  <div>
    <main>
      <Switch>
        <PublicRoute exact path="/login" component={LoginPage} />
        {
                user.role === 'admin'
                && <PrivateRoute exact path="/users" component={Users} />
                && <PrivateRoute exact path="/users/:id" component={UserPage} />
              }
        <PrivateRoute exact path="/chat" component={App} />
        {/* <PrivateRoute exact path="/chat/:id" component={MessagePage} /> */}
        <Route path="*" exact component={NotFound} />
      </Switch>
    </main>
  </div>

);

export default Routing;
