import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const NotFound = () => (
  <Header as="h2" icon textAlign="center" style={{ marginTop: 50 }}>
    <Icon name="frown" circular />
    <Header.Content>
      <div>404 Not Found</div>
    </Header.Content>
  </Header>
);

export default NotFound;
