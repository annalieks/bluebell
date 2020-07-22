import React from 'react';
import logo from './logo.png';

import styles from './styles.module.scss'

class AppHeader extends React.Component {
	render() {
		return (
			<header className={styles.header}>
				<div className={styles.logoImageWrapper}>
					<img src={logo} alt="BlueBell logo" />
				</div>
				<p>BlueBell</p>
  			</header>
 		);
	}
}

export default AppHeader;
