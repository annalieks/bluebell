import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useHistory, withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, List, Segment } from 'semantic-ui-react';
import UserItem from './UserItem';
import * as actions from './actions';
import { User } from '../../types';
import Spinner from '../../components/Spinner';

import styles from './styles.module.scss';

const mapStateToProps = (state: { users: { users: User[], isLoading: boolean }}) => ({
  users: state.users.users,
  isLoading: state.users.isLoading,
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
  }

  componentDidMount() {
    const { fetchUsers } = this.props;
    fetchUsers();
  }

  onEdit(id: string) {
    this.props.history.push(`/user/${id}`);
  }

  onDelete(id: string) {
    const { deleteUser } = this.props;
    deleteUser(id);
  }

  onAdd() {
    this.props.history.push('/user');
  }

  render() {
    const { users, isLoading } = this.props;
    if (isLoading) {
      return <Spinner />;
    }
    return (
      <Segment className={styles.usersList}>
        <div>
          <Button
            type="button"
            className="btn btn-success"
            onClick={this.onAdd}
          >
            Add user
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
