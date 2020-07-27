import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import UserItem from './UserItem';
import * as actions from './actions';
import { User } from '../../types';

const mapStateToProps = (state: User[]) => ({
  users: state,
});

const mapDispatchToProps = {
  ...actions,
};

type Props = ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps

class UserList extends Component<Props, {}> {
  public history = useHistory();

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
    this.history.push(`/user/${id}`);
  }

  onDelete(id: string) {
    const { deleteUser } = this.props;
    deleteUser(id);
  }

  onAdd() {
    this.history.push('/user');
  }

  render() {
    const { users } = this.props;
    return (
      <div className="row">
        <div className="list-group col-10">
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
        </div>
        <div className="col-2">
          <button
            type="button"
            className="btn btn-success"
            onClick={this.onAdd}
            style={{ margin: '5px' }}
          >
            Add user
          </button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
