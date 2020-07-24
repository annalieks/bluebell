import React, { useState, useEffect } from 'react';
import PageLoader from '../PageLoader';
import Header from '../Header';
import MessageList from '../MessageList';
import MessageInput from '../MessageInput';
import {IMessageData, ChatState} from '../../types';
import * as actions from './actions'
import  { connect } from 'react-redux'
import dataSourceConfig from '../../shared/config/dataSourceConfig.json'
import currentUserConfig from '../../shared/config/currentUserConfig.json'

import styles from './styles.module.scss';
import moment from "moment";

const Chat = (props: any) => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(dataSourceConfig.url)
      .then((response) => response.json())
      .then((result) => {
          const sorted = result.sort((lhs: IMessageData, rhs: IMessageData) =>
              moment(rhs.createdAt).isAfter(lhs.createdAt));
        props.loadMessages(sorted);
        setIsLoading(false);
      });
  }, []);

  const getView = () => (isLoading
    ? <PageLoader />
    : (
      <div className={styles.chatContainer}>
        <Header messages={props.messages} />
        <MessageList
          messages={props.messages}
          userId={currentUserConfig.userId}
          updateMessage={props.updateMessage}
          deleteMessage={props.deleteMessage}
          likeMessage={props.likeMessage}
        />
        <MessageInput addMessage={props.addMessage} />
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
