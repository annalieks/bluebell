import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Segment } from 'semantic-ui-react';
import {AuthorizedUser, UserLoginData} from '../../containers/Routing/types';
import { useHistory } from 'react-router-dom';

type Props = {
  login: (user: UserLoginData) => void;
  user: AuthorizedUser;
}

const LoginForm = ({ login, user }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const usernameChanged = (data: string) => {
    setUsername(data);
  };

  const passwordChanged = (data: string) => {
    setPassword(data);
  };

  const handleLoginClick = async () => {
    setIsLoading(true);
    try {
      login({ username, password });
    } catch {
      setIsLoading(false);
    }
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
} ;

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
