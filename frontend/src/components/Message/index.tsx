import React, { useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Icon, Image } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';
import { MessageData } from '../../types';

type Props = {
    message: MessageData,
    delete: (id: string) => void;
    like: (id: string, isLike: boolean) => void;
    userId: string;
}

const Message = (props: Props) => {
  const {
    message, delete: delete_, like, userId,
  } = props;
  const isOwnMessage: boolean = message.userId === userId;
  const [isLike, setIsLike] = useState(false);
  const history = useHistory();

  const handleLikeMessage = () => {
    like(message.id, !isLike);
    setIsLike(!isLike);
  };

  const getIcons = () => (isOwnMessage
    ? (
      <>
        <Icon
          name="cog"
          onClick={() => history.push(`/chat/${message.id}`)}
        />
        <Icon
          name="delete"
          onClick={() => delete_(message.id)}
        />
      </>
    )
    : (
      <Icon
        name="heart"
        className={isLike ? styles.redHeart : styles.heart}
        onClick={handleLikeMessage}
      />
    )
  );

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
  delete: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
};

export default Message;
