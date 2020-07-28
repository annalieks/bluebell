import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Segment } from 'semantic-ui-react';
import * as actions from './actions';
import { addUser, updateUser } from '../UserList/actions';
import TextInput from '../../shared/inputs/text/TextInput';
import PasswordInput from '../../shared/inputs/password/PasswordInput';
import EmailInput from '../../shared/inputs/email/EmailInput';
import { User } from '../../types';
import userFormConfig from '../../shared/config/userFormConfig.json';
import defaultUserConfig from '../../shared/config/defaultUserConfig.json';

import styles from './styles.module.scss';

const EMAIL = 'email';

interface RouteInfo {
  id: string;
}

interface ComponentProps extends RouteComponentProps<RouteInfo> {
}

const mapStateToProps = (state: {user: {user: User}}) => ({
  userData: state.user.user,
});

const mapDispatchToProps = {
  ...actions,
  addUser,
  updateUser,
};

type Props = RouteComponentProps & ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps & ComponentProps

type State = {
  id: string;
  username: string;
  email: string;
  password: string;
}

class UserPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = UserPage.getDefaultUserData();
    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onChangeData = this.onChangeData.bind(this);
  }

  componentDidMount() {
    const { match, fetchUser } = this.props;
    if (match.params.id) {
      fetchUser(match.params.id);
    }
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    console.log(nextProps, prevState);
    if (nextProps.userData.id !== prevState.id && nextProps.match.params.id) {
      return {
        ...nextProps.userData,
      };
    }
    return null;
  }

  onCancel() {
    const { history } = this.props;
    this.setState(UserPage.getDefaultUserData());
    history.push('/users');
  }

  onSave() {
    const { updateUser: update, addUser: add, history } = this.props;
    const { state } = this;
    if (state.id) {
      update(state.id, state);
    } else {
      const { username, email, password } = this.state;
      add({
        username,
        email,
        password,
      });
    }
    this.setState(UserPage.getDefaultUserData());
    history.push('/users');
  }

  onChangeData(e: React.ChangeEvent<HTMLInputElement>, keyword: string) {
    const { value } = e.target;
    this.setState((prevState) => ({
      ...prevState,
      [keyword]: value,
    }));
  }

  static getDefaultUserData() {
    return {
      ...defaultUserConfig,
    };
  }

  getInput(data: State, { label, type, keyword }: typeof userFormConfig[0], index: number) {
    switch (type) {
      case 'text':
        return (
          <TextInput
            key={index}
            label={label}
            type={type}
            text={data[keyword as keyof State]}
            keyword={keyword}
            onChange={this.onChangeData}
          />
        );
      case 'email':
        return (
          <EmailInput
            key={index}
            label={label}
            type={type}
            text={data[keyword as keyof State]}
            keyword={keyword}
            onChange={this.onChangeData}
          />
        );
      case 'password':
        return (
          <PasswordInput
            key={index}
            label={label}
            text={data[keyword as keyof State]}
            keyword={keyword}
            onChange={this.onChangeData}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const data = this.state;

    return (
      <Segment className={styles.editContainer}>
        <div>
          <h5>Add user</h5>
          <Button type="button" aria-label="Close" onClick={this.onCancel}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </div>
        <div className={styles.body}>
          {
               userFormConfig.map((item, index) => this.getInput(data, item, index))
          }
        </div>
        <div>
          <Button type="button" className="btn btn-secondary" onClick={this.onCancel}>Cancel</Button>
          <Button type="button" className="btn btn-primary" onClick={this.onSave}>Save</Button>
        </div>
      </Segment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
