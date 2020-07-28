import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const Error = () => (
  <Header as="h2" icon textAlign="center" style={{ marginTop: 50 }}>
    <Icon name="frown" circular />
    <Header.Content>
      <div>404 Not Found</div>
      {'Go to '}
      <NavLink to="/">Home</NavLink>
      {' page'}
    </Header.Content>
  </Header>
);

export default Error;
