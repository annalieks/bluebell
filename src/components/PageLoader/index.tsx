import React from 'react';
import styles from './styles.module.scss'
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

const PageLoader = () => {
	return (
	<Segment className={styles.loaderContainer}>
		<Dimmer active inverted >
			<Loader />
		</Dimmer>
	</Segment>
	);
}

export default PageLoader;