import React from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';
import styles from './styles.module.scss';

const PageLoader = () => (
  <Segment className={styles.loaderContainer}>
    <Dimmer active inverted>
      <Loader />
    </Dimmer>
  </Segment>
);

export default PageLoader;
