import React, {
  MutableRefObject, useEffect, useRef, useState,
} from 'react';

import { connect } from 'react-redux';
import {
  Button, Form, Header, Icon, Modal, TextArea,
} from 'semantic-ui-react';
import _ from 'lodash';
import moment from 'moment';
import { useParams, useHistory, withRouter } from 'react-router-dom';
import styles from './styles.module.scss';
import { MessageData } from '../../types';
import { loadMessage } from './actions';
import { updateMessage } from '../Chat/actions';

const mapStateToProps = (state: { message: {message: MessageData} }) => ({
  message: state.message.message,
});

const mapDispatchToProps = {
  loadMessage,
  updateMessage,
};

type Props = ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps

const MessageEditor = (props: Props) => {
  const {
    message,
    updateMessage: update,
    loadMessage: load,
  } = props;
  const [body, setBody] = useState('');
  const inputRef = useRef() as MutableRefObject<TextArea>;
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    load(id);
  }, [load, id]);

  useEffect(() => {
    const focus = () => inputRef?.current?.focus();
    if (message) setBody(message.text);
    focus();
  }, [message, inputRef]);

  const handleCancel = () => {
    setBody('');
    history.push('/chat');
  };

  const handleEdit = () => {
    if (!body || !message) {
      handleCancel();
      return;
    }
    const text = _.trim(body);
    if (text.length === 0) return;
    update({
      id: message.id,
      text,
      editedAt: moment().toISOString(),
    });
    handleCancel();
  };
  const getView = () => (
    message != null
      ? (
        <Modal
          basic
          size="small"
          dimmer="blurring"
          open
        >
          <Header content="Edit message" />
          <Modal.Content>
            <Form>
              <TextArea
                value={body}
                className={styles.textArea}
                ref={inputRef}
                onChange={(e, { value }) => setBody(value as string)}
              />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              basic
              color="red"
              inverted
              onClick={handleCancel}
            >
              <Icon name="remove" />
              Cancel
            </Button>
            <Button
              color="green"
              inverted
              onClick={handleEdit}
            >
              <Icon name="checkmark" />
              Edit
            </Button>
          </Modal.Actions>
        </Modal>
      )
      : null
  );

  return getView();
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageEditor));
