import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import * as actions from './actions';
import { MessageData, ChatState } from '../../types';
import dataSourceConfig from '../../shared/config/dataSourceConfig.json';
import currentUserConfig from '../../shared/config/currentUserConfig.json';

import PageLoader from '../PageLoader';
import Header from '../Header';
import MessageList from '../MessageList';
import MessageInput from '../MessageInput';

import styles from './styles.module.scss';

const mapStateToProps = (state: { chat: ChatState }) => ({
  messages: state.chat.messages,
});

const mapDispatchToProps = {
  ...actions,
};

type Props = ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps

const Chat = (props: Props) => {
  const {
    messages,
    addMessage: add,
    deleteMessage: delete_,
    likeMessage: like,
    openEditMessage: edit,
    loadMessages: load,
  } = props;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const { key } = e;
      const message = _.findLast(messages,
        (m: MessageData) => m.userId === currentUserConfig.userId);
      if (key === 'ArrowUp' && message) {
        edit(message);
      }
    };
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [messages, edit]);

  useEffect(() => {
    fetch(dataSourceConfig.url)
      .then((response) => response.json())
      .then((result) => {
        const sortedMessages = result.sort(
          (lhs: MessageData, rhs: MessageData) => moment(lhs.createdAt).diff(moment(rhs.createdAt)),
        );
        load(sortedMessages);
        setIsLoading(false);
      });
  }, [load]);

  const getView = () => (isLoading
    ? <PageLoader />
    : (
      <div className={styles.chatContainer}>
        <Header messages={messages} />
        <MessageList
          messages={messages}
          delete={delete_}
          like={like}
          edit={edit}
        />
        <MessageInput add={add} />
      </div>
    )
  );

  return getView();
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
