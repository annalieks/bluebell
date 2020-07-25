import React, {
  useState, MutableRefObject, useRef, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { Segment, Form, Button } from 'semantic-ui-react';

import styles from './styles.module.scss';
import {addMessage} from "../Chat/actions";
import {connect} from "react-redux";
import _ from 'lodash';

type Props = typeof mapDispatchToProps

const MessageInput = (props: Props) => {
  const [body, setBody] = useState('');
  const messagesEndRef = useRef() as MutableRefObject<HTMLDivElement>;

  const addNewLineToTextArea = () => {
    setBody(body + '\n');
  }

  const handleAddMessage = () => {
    if (!body || body.length == 0) {
      return;
    }
    const text = _.trim(body);
    if(text.length === 0) return;
    props.addMessage({
      text,
      createdAt: (new Date()).toString(),
    });
    setBody('');
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    const { key } = e;
    console.log(e.shiftKey && key == 'Enter');
    if (key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      addNewLineToTextArea();
    } else if(key === 'Enter') {
      handleAddMessage();
      setBody('');
    }
  }

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, [messagesEndRef]);

  return (
    <div ref={messagesEndRef}>
      <Segment className={styles.formWrapper}>
        <Form onSubmit={handleAddMessage} className={styles.form}>
          <Form.TextArea
            name="body"
            value={body}
            className={styles.text}
            placeholder="Write your message here"
            onChange={e => setBody((e.target as HTMLTextAreaElement).value)}
            onKeyDown={(e: KeyboardEvent) => handleKeyPress(e)}
          />
          <Button
            floated="right"
            color="blue"
            type="submit"
            className={styles.button}
          >
            Send
          </Button>
        </Form>
      </Segment>
    </div>
  );
};

const mapDispatchToProps = {
  addMessage
}

MessageInput.propTypes = {
  addMessage: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(MessageInput);
