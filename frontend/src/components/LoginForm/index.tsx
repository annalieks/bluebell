import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Segment } from 'semantic-ui-react';
import { UserLoginData } from '../../containers/Routing/types';

type Props = {
  login: (user: UserLoginData) => void;
  isLoading: boolean;
  startLoading: () => void;
}

const LoginForm = ({ login, isLoading, startLoading }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameChanged = (data: string) => {
    setUsername(data);
  };

  const passwordChanged = (data: string) => {
    setPassword(data);
  };

  const handleLoginClick = async () => {
    startLoading();
    login({ username, password });
  };

  return (
    <Form name="loginForm" size="large" onSubmit={handleLoginClick}>
      <Segment>
        <Form.Input
          fluid
          iconPosition="left"
          placeholder="Username"
          onChange={(ev) => usernameChanged(ev.target.value)}
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type="password"
          onChange={(ev) => passwordChanged(ev.target.value)}
        />
        <Button type="submit" color="teal" fluid size="large" loading={isLoading} primary>
          Login
        </Button>
      </Segment>
    </Form>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
