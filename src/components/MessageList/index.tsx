import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import { IMessageData, IUpdateMessage } from '../../types';
import TimeSeparator from '../TimeSeparator';
import Message from '../Message';

import styles from './styles.module.scss';

interface IProps {
 messages: IMessageData[];
 updateMessage: (message: IUpdateMessage) => void;
 deleteMessage: (messageId: string) => void;
 likeMessage: (messageId: string) => void;
 userId: string;
}

const MessageList = ({
  messages, updateMessage, deleteMessage, likeMessage, userId
}: IProps) => {
  const gropedMessages = _.groupBy(messages, (message) =>
      moment(message.createdAt).format('DD/MM/YY'));

  return (
    <div className={styles.messagesContainer}>
      {
        Object.keys(gropedMessages).map((key) => (
          <React.Fragment key={key}>
            <TimeSeparator date={key} />
            <div className={styles.messagesGroup}>
              {
              gropedMessages[key].map((message) => (
                <Message
                  message={message}
                  userId={userId}
                  key={message.id}
                  updateMessage={updateMessage}
                  deleteMessage={deleteMessage}
                  likeMessage={likeMessage}
                />
              ))
            }
            </div>
          </React.Fragment>
        ))
      }
    </div>
  );
};

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.any).isRequired,
  updateMessage: PropTypes.func.isRequired,
  deleteMessage: PropTypes.func.isRequired,
  likeMessage: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default MessageList;
