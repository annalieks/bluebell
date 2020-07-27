import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RouteComponentProps } from 'react-router-dom';
import UserItem from './UserItem';
import * as actions from './actions';
import { User } from '../../types';

type OwnProps = {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const mapStateToProps = (state: User[]) => ({
  users: state,
});

const mapDispatchToProps = {
  ...actions,
};

type Props = RouteComponentProps & ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps & OwnProps

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
