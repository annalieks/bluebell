import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginForm from '../LoginForm';
import { loginUser } from '../../containers/Routing/actions';

import styles from './styles.module.scss';
import { LoginState } from '../../types';

const mapStateToProps = (state: { login: LoginState}) => ({
  user: state.login.user,
});

const mapDispatchToProps = {
  loginUser,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const LoginPage = ({ loginUser: login, user }: Props) => {
  return (
    <Grid textAlign="center" verticalAlign="middle" className={styles.fill}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Login to your account
        </Header>
        <LoginForm login={login} user={user} />
      </Grid.Column>
    </Grid>
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
