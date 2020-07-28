import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { MessageData } from '../../types';
import TimeSeparator from '../TimeSeparator';
import Message from '../Message';

import styles from './styles.module.scss';
import EditModal from '../../containers/MessageEditor';

type Props = {
    messages: MessageData[],
    delete: (id: string) => void;
    like: (id: string, isLike: boolean) => void;
    userId: string;
}

const MessageList = (props: Props) => {
  const {
    messages, delete: delete_, like, userId,
  } = props;

  const groupedMessages = _.groupBy(messages, (message) => moment(message.createdAt).format('DD/MM/YY'));

  return (
    <div className={styles.messagesContainer}>
      {
        Object.keys(groupedMessages).map((key) => (
          <React.Fragment key={key}>
            <TimeSeparator date={key} />
            <div className={styles.messagesGroup}>
              {
              groupedMessages[key].map((message) => (
                <Message
                  message={message}
                  key={message.id}
                  delete={delete_}
                  like={like}
                  userId={userId}
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
  delete: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
};

export default MessageList;
