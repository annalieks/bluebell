import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { IMessageData } from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faEnvelope } from '@fortawesome/free-solid-svg-icons'

import styles from './styles.module.scss'

interface IProps {
	messages: IMessageData[];
}

const Header = (props: IProps) => {
	const usersNum = new Set(props.messages.map(m => m.userId)).size;
	const messagesNum = props.messages.length;
	const lastMessageAt = moment(props.messages[props.messages.length - 1].createdAt).format('HH:mm');

	return (
		<div className={styles.chatHeader}>
			<div className={styles.chatInfo}>
				<p>My chat</p>
				<p>{usersNum} <FontAwesomeIcon icon={faUsers} /></p>
				<p>{messagesNum} <FontAwesomeIcon icon={faEnvelope} /></p>
			</div>
			<div className={styles.lastMessageInfo}>
				<p>last message at {lastMessageAt}</p>
			</div>
		</div>
	);
}

Header.propTypes = {
	messages: PropTypes.arrayOf(PropTypes.any).isRequired
}

export default Header;