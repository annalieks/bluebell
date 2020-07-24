import React, { useState, useEffect } from 'react';
import PageLoader from '../PageLoader';
import Header from '../Header';
import MessageList from '../MessageList';
import MessageInput from '../MessageInput';
import {
  IAddMessage, IUser, IMessageData, IUpdateMessage,
} from '../../types';

import styles from './styles.module.scss';

const Chat = () => {
  const [messages, setMessages] = useState([] as IMessageData[]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://edikdolynskyi.github.io/react_sources/messages.json')
      .then((response) => response.json())
      .then((result) => {
        setMessages(result);
        setIsLoading(false);
      });
  }, []);

  const getView = () => (isLoading
    ? <PageLoader />
    : (
      <div className={styles.chatContainer}>
        <Header messages={messages} />
        <MessageList
          messages={messages}
          userId={currUser.userId}
          updateMessage={updateMessage}
          deleteMessage={deleteMessage}
          likeMessage={likeMessage}
        />
        <MessageInput addMessage={addMessage} />
      </div>
    )
  );

  return getView();
};

export default Chat;
