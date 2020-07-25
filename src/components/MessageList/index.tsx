import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import {MessageData } from '../../types';
import TimeSeparator from '../TimeSeparator';
import Message from '../Message';

import styles from './styles.module.scss';
import EditModal from "../EditModal";

type Props = {
    messages: MessageData[],
    delete: (id: string) => void;
    like: (id: string) => void;
    edit: (message: MessageData) => void;
}

const MessageList = (props: Props) => {
  const { messages, delete: delete_, like, edit } = props;

  const groupedMessages = _.groupBy(messages, (message) =>
      moment(message.createdAt).format('DD/MM/YY'));

  return (
    <div className={styles.messagesContainer}>
        <EditModal />
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
                  edit={edit}
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

export default MessageList;
