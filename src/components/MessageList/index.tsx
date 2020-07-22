import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'
import _ from 'lodash'
import { IMessageData, IUpdateMessage } from '../../types'
import TimeSeparator from '../TimeSeparator';
import Message from '../Message'

import styles from './styles.module.scss'

interface IProps {
	messages: IMessageData[];
	updateMessage: (message: IUpdateMessage) => void;
	deleteMessage: (messageId: string) => void;
	likeMessage: (messageId: string, isLike: boolean) => void;
	userId: string;
}

const MessageList = (props: IProps) => {
	const messages = _.groupBy(props.messages, function (message) {
		return moment(message.createdAt).format('DD/MM/YY');
	});

	return (
		<div className={styles.messagesContainer}>
		{
			Object.keys(messages).map(key => {
				return (
				  <React.Fragment key={key}>
					<TimeSeparator date={key} />
					{
						messages[key].map(message => (
						<Message
							message={message}
							userId={props.userId}
							key={message.id}
							updateMessage={props.updateMessage}
							deleteMessage={props.deleteMessage}
							likeMessage={props.likeMessage} 
						/>))
					}
				  </React.Fragment>
				);
			  }
			)
		}
		</div>
	);
}

MessageList.propTypes = {
	messages: PropTypes.arrayOf(PropTypes.any).isRequired,
	updateMessage: PropTypes.func.isRequired,
	deleteMessage: PropTypes.func.isRequired,
	likeMessage: PropTypes.func.isRequired,
	userId: PropTypes.string
}

export default MessageList;