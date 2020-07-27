import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import LoginForm from '../LoginForm';

const LoginPage = () => (
  <Grid textAlign="center" verticalAlign="middle" className="fill">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" color="teal" textAlign="center">
        Login to your account
      </Header>
      <LoginForm login={() => console.log('Hi')} />
    </Grid.Column>
  </Grid>
);


export default LoginPage;
