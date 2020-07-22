import React, { useState, MutableRefObject, useRef } from 'react'
import { IMessageData, IUpdateMessage } from '../../types'
import moment from 'moment'
import { Comment, Icon } from 'semantic-ui-react'
import styles from './styles.module.scss'

interface IProps {
	message: IMessageData;
	updateMessage: (message: IUpdateMessage) => void;
	deleteMessage: (messageId: string) => void;
	likeMessage: (messageId: string, isLike: boolean) => void;
	userId: string;
}

const Message = (props: IProps) => {
	const [ isLike, setIsLike ] = useState(false);
	const [ isEditable, setIsEditable ] = useState(false);
	const [ body, setBody ] = useState(props.message.text);
	const textInput = useRef() as MutableRefObject<HTMLTextAreaElement>;
	const isOwnMessage: boolean = props.message.userId === props.userId;

	const focus = () => {
		textInput.current.focus();
	}

	const handleUpdateMessage = () => {
		if (body.length === 0) {
		  return;
		}
		props.updateMessage({
			id: props.message.id,
			text: body,
			editedAt: (new Date()).toString()
		});
		setIsEditable(!isEditable);
	  };

	const handleLikeMessage = () => { 
		props.likeMessage(props.message.id, !isLike);
		setIsLike(!isLike);
	}

	return (
		<Comment.Group className={styles.commentsGroup}>
			<Comment className={
				isOwnMessage
				? styles.ownMessage
				: styles.othersMessage}>
				<Comment.Avatar src={props.message.avatar} />
				<Comment.Content>
					<Comment.Author>{props.message.user}</Comment.Author>
					<Comment.Metadata>
						{moment(props.message.createdAt).format('HH:mm:ss')}
						<Icon
							name='heart'
							className={styles.likeCountIcon} 
						/>
						{props.message.likeCount === undefined ? 0 : props.message.likeCount}
					</Comment.Metadata>
					<Comment.Text>
						<div className={styles.inputArea}>
							<textarea 
								className={`${styles.defaultTextArea}
								${isEditable
									? styles.editableTextArea 
									: styles.readOnlyTextArea}`}
								readOnly={!isEditable} 
								value={body} 
								ref={textInput}
								onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => 
									setBody(e.target.value)}
							/>
						</div>
					</Comment.Text> 
					<div className={styles.icons}>
						{isEditable &&
							<Icon 
								name='save'
								onClick={handleUpdateMessage} 
							/>}
						{!isEditable && isOwnMessage &&
							<Icon
								name='edit'
								onClick={() => {
									setIsEditable(!isEditable);
									focus();
								}} 
							/>}
						{isOwnMessage &&
							<Icon
								name='delete'
								onClick={() => {
									props.deleteMessage(props.message.id);
								}}
							/>}
						{!isOwnMessage &&
							<Icon
								name='heart'
								className={isLike ? styles.redheart : styles.heart} 
								onClick={handleLikeMessage}
							/>}
					</div>				
				</Comment.Content>
			</Comment>
  		</Comment.Group>
	);
}

export default Message;