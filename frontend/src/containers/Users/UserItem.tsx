import React from 'react';

type Props = {
    id: string;
    username: string;
    email: string;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const UserItem = ({
  id, username, email, onEdit, onDelete,
}: Props) => (
  <div className="container list-group-item">
    <div className="row">
      <div className="col-8">
        <span className="badge badge-secondary float-left" style={{ fontSize: '2em', margin: '2px' }}>
          {username}
        </span>
        <span className="badge badge-info" style={{ fontSize: '2em', margin: '2px' }}>{email}</span>
      </div>
      <div className="col-4 btn-group">
        <button type="button" className="btn btn-outline-primary" onClick={() => onEdit(id)}> Edit </button>
        <button type="button" className="btn btn-outline-dark" onClick={() => onDelete(id)}> Delete </button>
      </div>
    </div>
  </div>
);

export default UserItem;
