import React, { useState, useEffect } from 'react';
import { uuid } from 'uuidv4';
import PageLoader from '../PageLoader'
import Header from '../Header'
import MessageList from '../MessageList'
import MessageInput from '../MessageInput'
import { IAddMessage, IUser, IMessageData, IUpdateMessage } from '../../types';

import styles from './styles.module.scss'


const Chat = () => {
	const [messages, setMessages] = useState([] as IMessageData[]);
	const [isLoading, setIsLoading] = useState(true);

	const currUser: IUser = { // choose current user from existing users
		userId: '533b5230-1b8f-11e8-9629-c7eca82aa7bd',
		user: 'Wendy',
		avatar: 'https://resizing.flixster.com/EVAkglctn7E9B0hVKJrueplabuQ=/220x196/v1.cjs0NjYwNjtqOzE4NDk1OzEyMDA7MjIwOzE5Ng'
	}

	useEffect(() => {
		fetch('https://edikdolynskyi.github.io/react_sources/messages.json')
		.then(response => response.json())
		.then(result => {
			setMessages(result);
			setIsLoading(false);
		});
	}, []);

	const addMessage = (message: IAddMessage) => {
		setMessages([...messages, {
			id: uuid(),
			userId: currUser.userId,
			avatar: currUser.avatar,
			user: currUser.user,
			text: message.text,
			createdAt: message.createdAt,
			editedAt: '',
			likeCount: 0
		}]);
	}

	const likeMessage = (messageId: string, isLike: boolean) => {
		const newMessages = messages.map(m => {
			if(m.id === messageId) {
				if (m.likeCount === undefined) {
					m.likeCount = isLike ? 1 : 0;
					return m;
				}
				m.likeCount += isLike ? 1 : -1;
			}
			return m;
		})
		setMessages(newMessages);
	}

	const updateMessage = (message: IUpdateMessage) => {
		const newMessages = messages.map(m => {
			const isUpdated = (m.id === message.id);
			m.text = isUpdated ? message.text : m.text;
			m.editedAt = isUpdated ? message.editedAt : m.editedAt;
			return m;
		})
		setMessages(newMessages);
	}

	const deleteMessage = (messageId: string) => {
		const newMessages = messages.filter((message) => message.id !== messageId);
  		setMessages(newMessages);
		setMessages(newMessages);
	}


	return (
		<>
			{isLoading 
			? <PageLoader />
			: <div className={styles.chatContainer}>
				<Header messages={messages} />
				<MessageList
					messages={messages}
					userId={currUser.userId}
					updateMessage={updateMessage}
					deleteMessage={deleteMessage}
					likeMessage={likeMessage} 
				/>
				<MessageInput addMessage={addMessage} />
			</div>}
		</>
	);
}

export default Chat;
