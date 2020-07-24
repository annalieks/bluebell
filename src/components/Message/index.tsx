import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Icon, Image } from 'semantic-ui-react';
import { IMessageData, IUpdateMessage } from '../../types';
import styles from './styles.module.scss';

interface IProps {
 message: IMessageData;
 updateMessage: (message: IUpdateMessage) => void;
 deleteMessage: (messageId: string) => void;
 likeMessage: (messageId: string) => void;
 userId: string;
}

const Message = ({
  message, updateMessage, deleteMessage, likeMessage, userId
}: IProps) => {
  const isOwnMessage: boolean = message.userId === userId;

  const handleLikeMessage = () => {
    likeMessage(message.id);
  };

  const getIcons = () => (isOwnMessage
      ?
          <>
              <Icon
                  name="edit"
                  onClick={() => {
                  }}
              />
              <Icon
                  name="delete"
                  onClick={() => {
                    deleteMessage(message.id);
                  }}
              />
          </>
      : <Icon
              name="heart"
              className={message.isLike ? styles.redHeart : styles.heart}
              onClick={handleLikeMessage}
          />
  )

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
            {getIcons()}
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
