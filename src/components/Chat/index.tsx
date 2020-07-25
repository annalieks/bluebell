import React, {useState, useEffect} from 'react';
import PageLoader from '../PageLoader';
import Header from '../Header';
import MessageList from '../MessageList';
import MessageInput from '../MessageInput';
import {MessageData, ChatState} from '../../types';
import * as actions from './actions'
import  { connect } from 'react-redux'
import dataSourceConfig from '../../shared/config/dataSourceConfig.json'
import currentUserConfig from '../../shared/config/currentUserConfig.json'

import styles from './styles.module.scss';
import moment from 'moment';
import _ from 'lodash';

type Props = ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps

const Chat = (props: Props) => {

    const {
        messages,
        addMessage: add,
        deleteMessage: delete_,
        likeMessage: like,
        openEditMessage: edit
    } = props;

  const [isLoading, setIsLoading] = useState(true);

    const handleKeyPress = (e: KeyboardEvent) => {
        const { key } = e;
        const message = _.findLast(messages,
            (m: MessageData) => m.userId === currentUserConfig.userId);
        if (key === 'ArrowUp' && message) {
            props.openEditMessage(message);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        }
    }, [messages]);

  useEffect(() => {
    fetch(dataSourceConfig.url)
      .then((response) => response.json())
      .then((result) => {
          const sorted = result.sort((lhs: MessageData, rhs: MessageData) =>
              moment(rhs.createdAt).isAfter(lhs.createdAt));
        props.loadMessages(sorted);
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
          delete={delete_}
          like={like}
          edit={edit}
        />
        <MessageInput addMessage={add} />
      </div>
    )
  );

  return getView();
};

const mapStateToProps = (state: { chat: ChatState }) => {
    return {
        messages: state.chat.messages
    };
}

const mapDispatchToProps = {
    ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
