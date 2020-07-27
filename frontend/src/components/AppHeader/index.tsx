import React from 'react';
import logo from './logo.png';

import styles from './styles.module.scss';

const AppHeader = () => (
  <header className={styles.header}>
    <div className={styles.logoImageWrapper}>
      <img src={logo} alt="BlueBell logo" />
    </div>
    <p>BlueBell</p>
  </header>
);

export default AppHeader;
