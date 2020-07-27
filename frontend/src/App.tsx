import React from 'react';
import { withRouter } from 'react-router-dom';
import Routing from './containers/Routing';

function App() {
  return (
    <>
      <Routing />
    </>
  );
}

export default withRouter(App);
