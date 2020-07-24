import React, { useState, useEffect } from 'react';
import { uuid } from 'uuidv4';
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

  const currUser: IUser = { // choose current user from existing users
    userId: '587fe755-20b2-47fe-b3e8-cd83557d38af',
    user: 'Random user',
    avatar: 'https://images.unsplash.com/photo-1461800919507-79b16743b257?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
  };

  useEffect(() => {
    fetch('https://edikdolynskyi.github.io/react_sources/messages.json')
      .then((response) => response.json())
      .then((result) => {
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
      likeCount: 0,
    }]);
  };

  const likeMessage = (messageId: string, isLike: boolean) => {
    const newMessages = messages.map((m) => {
      if (m.id === messageId) {
        if (m.likeCount === undefined) {
          return { ...m, likeCount: isLike ? 1 : 0 };
        }
        const newLikeCount = m.likeCount + (isLike ? 1 : -1);
        return { ...m, likeCount: newLikeCount };
      }
      return m;
    });
    setMessages(newMessages);
  };

  const updateMessage = (message: IUpdateMessage) => {
    const newMessages = messages.map((m) => {
      const isUpdated = (m.id === message.id);
      return {
        ...m,
        text: isUpdated ? message.text : m.text,
        editedAt: isUpdated ? message.editedAt : m.editedAt,
      };
    });
    setMessages(newMessages);
  };

  const deleteMessage = (messageId: string) => {
    const newMessages = messages.filter((message) => message.id !== messageId);
    setMessages(newMessages);
  };

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
