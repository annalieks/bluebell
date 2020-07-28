import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, List, Segment } from 'semantic-ui-react';
import UserItem from './UserItem';
import * as actions from './actions';
import Spinner from '../../components/Spinner';

import styles from './styles.module.scss';
import { UsersListState } from '../../types';

const mapStateToProps = (state: { users: UsersListState}) => ({
  users: state.users.users,
  isLoading: state.users.isLoading,
  error: state.users.error,
});

const mapDispatchToProps = {
  ...actions,
};

type Props = ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps & RouteComponentProps

class UserList extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onChat = this.onChat.bind(this);
  }

  componentDidMount() {
    const { fetchUsers } = this.props;
    fetchUsers();
  }

  onEdit(id: string) {
    const { history } = this.props;
    history.push(`/user/${id}`);
  }

  onDelete(id: string) {
    const { deleteUser } = this.props;
    deleteUser(id);
  }

  onAdd() {
    const { history } = this.props;
    history.push('/user');
  }

  onChat() {
    const { history } = this.props;
    history.push('/chat');
  }

  render() {
    const {
      users, isLoading, history, error,
    } = this.props;
    if (isLoading) {
      return <Spinner />;
    }
    if (error) {
      history.push('/error');
    }
    return (
      <Segment className={styles.usersList}>
        <div className={styles.titleButtons}>
          <Button
            type="button"
            onClick={this.onAdd}
          >
            Add user
          </Button>
          <Button
            type="button"
            onClick={this.onChat}
          >
            Chat
          </Button>
        </div>
        <List divided inverted relaxed>
          {
           users.map((user) => (
             <UserItem
               key={user.id}
               id={user.id}
               username={user.username}
               email={user.email}
               onEdit={this.onEdit}
               onDelete={this.onDelete}
             />
           ))
          }
        </List>
      </Segment>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserList));
