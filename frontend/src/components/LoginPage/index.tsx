import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginForm from '../LoginForm';
import { loginUser, startLoading } from '../../containers/Routing/actions';

import styles from './styles.module.scss';
import { LoginState } from '../../types';

const mapStateToProps = (state: { login: LoginState}) => ({
  isLoading: state.login.isLoading,
  error: state.login.error,
});

const mapDispatchToProps = {
  loginUser,
  startLoading,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const LoginPage = ({
  loginUser: login, startLoading: start, isLoading, error,
}: Props) => (
  <Grid textAlign="center" verticalAlign="middle" className={styles.form}>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" textAlign="center" className={styles.header}>
        Login to your account
      </Header>
      {error && <p className={styles.error}>{error}</p>}
      <LoginForm login={login} isLoading={isLoading} startLoading={start} />
    </Grid.Column>
  </Grid>
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
