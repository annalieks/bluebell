import React from 'react';
import { Button, List } from 'semantic-ui-react';

import styles from './styles.module.scss';

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
  <List.Item>
    <List.Content>
      <div className={styles.profileData}>
        <span>
          {username}
        </span>
        <span>{email}</span>
      </div>
      <div>
        <Button type="button" onClick={() => onEdit(id)}> Edit </Button>
        <Button type="button" onClick={() => onDelete(id)}> Delete </Button>
      </div>
    </List.Content>
  </List.Item>
);

export default UserItem;
