import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter, useHistory } from 'react-router-dom';
import * as actions from './actions';
import { MessageData, ChatState, LoginState } from '../../types';

import PageLoader from '../../components/PageLoader';
import Header from '../../components/Header';
import MessageList from '../../components/MessageList';
import MessageInput from '../../components/MessageInput';

import styles from './styles.module.scss';

const mapStateToProps = (state: { chat: ChatState, login: LoginState }) => ({
  messages: state.chat.messages,
  user: state.login.user,
  isLoading: state.chat.isLoading,
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
    loadMessages: load,
    user,
    isLoading,
  } = props;

  const history = useHistory();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const { key } = e;
      const message = _.findLast(messages,
        (m: MessageData) => m.userId === user?.user.id);
      if (key === 'ArrowUp' && message) {
        history.push(`/chat/${message.id}`);
      }
    };
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [messages]);

  useEffect(() => {
    load();
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
          userId={user.user.id}
        />
        <MessageInput add={add} userId={user.user.id} />
      </div>
    )
  );

  return getView();
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chat));
