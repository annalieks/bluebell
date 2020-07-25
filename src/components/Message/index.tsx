import React from 'react';
import moment from 'moment';
import { Icon, Image } from 'semantic-ui-react';
import currentUserConfig from '../../shared/config/currentUserConfig.json'
import styles from './styles.module.scss';
import {MessageData} from "../../types";

type Props = {
    message: MessageData,
    delete: (id: string) => void;
    like: (id: string) => void;
    edit: (message: MessageData) => void;
}

const Message = (props: Props) => {
    const { message, delete: delete_, like, edit } = props;
  const isOwnMessage: boolean = message.userId === currentUserConfig.userId;

  const handleLikeMessage = () => {
    like(message.id);
  };

  const getIcons = () => (isOwnMessage
      ?
          <>
              <Icon
                  name="edit"
                  onClick={() => edit(message)}
              />
              <Icon
                  name="delete"
                  onClick={() => delete_(message.id)}
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

export default Message;
