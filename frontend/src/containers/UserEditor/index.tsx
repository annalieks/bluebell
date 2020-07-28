import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, useParams, useHistory } from 'react-router-dom';
import { Button, Segment } from 'semantic-ui-react';
import * as actions from './actions';
import { addUser, updateUser } from '../UserList/actions';
import TextInput from '../../shared/inputs/text/TextInput';
import PasswordInput from '../../shared/inputs/password/PasswordInput';
import EmailInput from '../../shared/inputs/email/EmailInput';
import { User } from '../../types';

import styles from './styles.module.scss';

const mapStateToProps = (state: {user: {user: User}}) => ({
  userData: state.user.user,
});

const mapDispatchToProps = {
  ...actions,
  addUser,
  updateUser,
};

type Props = RouteComponentProps & ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps

const UserPage = ({
  fetchUser: fetch, addUser: add, updateUser: update, userData,
}: Props) => {
  const { id } = useParams();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setDefaultData = () => {
    setEmail('');
    setUsername('');
    setPassword('');
  };

  useEffect(() => {
    if (id) {
      fetch(id);
    }
  }, [fetch, id]);

  useEffect(() => {
    if (userData) {
      setEmail(userData.email);
      setUsername(userData.username);
      setPassword(userData.password);
    }
  }, [userData]);

  const onCancel = () => {
    setDefaultData();
    history.push('/users');
  };

  const onSave = () => {
    if (id) {
      update(userData.id, {
        email,
        username,
        password,
      });
    } else {
      add({
        username,
        email,
        password,
      });
    }
    setDefaultData();
    history.push('/users');
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUsername(value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };

  return (
    <Segment className={styles.editContainer}>
      <div>
        <h5>Add user</h5>
        <Button type="button" aria-label="Close" onClick={() => onCancel()}>
          <span aria-hidden="true">&times;</span>
        </Button>
      </div>
      <div className={styles.body}>
        <TextInput
          label="Username"
          type="text"
          text={username}
          keyword="username"
          onChange={(e) => onChangeUsername(e)}
        />
        <EmailInput
          label="Email"
          type="email"
          text={email}
          keyword="email"
          onChange={(e) => onChangeEmail(e)}
        />
        <PasswordInput
          label="Change password: "
          text={password}
          keyword="password"
          onChange={(e) => onChangePassword(e)}
        />
      </div>
      <div>
        <Button type="button" className="btn btn-secondary" onClick={() => onCancel()}>Cancel</Button>
        <Button type="button" className="btn btn-primary" onClick={() => onSave()}>Save</Button>
      </div>
    </Segment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
