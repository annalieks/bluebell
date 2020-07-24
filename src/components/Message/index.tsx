import React, { useState, MutableRefObject, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Icon, Image} from 'semantic-ui-react';
import { IMessageData, IUpdateMessage } from '../../types';
import styles from './styles.module.scss';

interface IProps {
 message: IMessageData;
 updateMessage: (message: IUpdateMessage) => void;
 deleteMessage: (messageId: string) => void;
 likeMessage: (messageId: string, isLike: boolean) => void;
 userId: string;
}

const Message = ({
  message, updateMessage, deleteMessage, likeMessage, userId,
}: IProps) => {
  const [isLike, setIsLike] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [body, setBody] = useState(message.text);
  const textInput = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const isOwnMessage: boolean = message.userId === userId;

  const focus = () => {
    textInput.current.focus();
  };

  const handleUpdateMessage = () => {
    if (body.length === 0) {
      return;
    }
    updateMessage({
      id: message.id,
      text: body,
      editedAt: (new Date()).toString(),
    });
    setIsEditable(!isEditable);
  };

  const handleLikeMessage = () => {
    likeMessage(message.id, !isLike);
    setIsLike(!isLike);
  };

  const messageClasses = `${styles.message} ${isOwnMessage ? styles.ownMessage : styles.othersMessage}`;

  return (
    <div className={messageClasses}>
      <div className={styles.messageContent}>
          {
              !isOwnMessage
              && <Image src={message.avatar} className={styles.messageAvatar} avatar />
          }
          <div className={styles.messageText}>
             <div className={styles.author}>
                {message.user}
             </div>
             <div className={styles.text}>
              {message.text}
             </div>
    </div>
          <div className={styles.icons}>
              {
                  isEditable
                  && (
                      <Icon
                          name="save"
                          onClick={handleUpdateMessage}
                      />
                  )
              }
              {
                  !isEditable && isOwnMessage
                  && (
                      <Icon
                          name="edit"
                          onClick={() => {
                              setIsEditable(!isEditable);
                              focus();
                          }}
                      />
                  )
              }
              {
                  isOwnMessage
                  && (
                      <Icon
                          name="delete"
                          onClick={() => {
                              deleteMessage(message.id);
                          }}
                      />
                  )
              }
              {
                  !isOwnMessage
                  && (
                      <Icon
                          name="heart"
                          className={isLike ? styles.redHeart : styles.heart}
                          onClick={handleLikeMessage}
                      />
                  )
              }
          </div>
          <div className={styles.messageMeta}>
            <div className={styles.messageTime}>
              {moment(message.createdAt).format('HH:mm')}
            </div>
            <div className={styles.messageLikes}>
              <Icon
                name="heart"
                className={styles.likeCountIcon}
              />
              {message.likeCount === undefined ? 0 : message.likeCount}
            </div>
          </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.objectOf(PropTypes.any).isRequired,
  updateMessage: PropTypes.func.isRequired,
  deleteMessage: PropTypes.func.isRequired,
  likeMessage: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default Message;
