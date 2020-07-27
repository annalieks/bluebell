import React, {
  useState, MutableRefObject, useRef, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { Segment, Form, Button } from 'semantic-ui-react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.scss';
import { AddMessageData } from '../../types';

type Props = {
  add: (message: AddMessageData) => void;
}

const MessageInput = (props: Props) => {
  const { add } = props;
  const [body, setBody] = useState('');
  const messagesEndRef = useRef() as MutableRefObject<HTMLDivElement>;

  const addNewLineToTextArea = () => {
    setBody(`${body}\n`);
  };

  const handleAddMessage = () => {
    if (!body || body.length === 0) {
      return;
    }
    const text = _.trim(body);
    if (text.length === 0) return;
    add({
      text,
      createdAt: (new Date()).toString(),
    });
    setBody('');
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    const { key } = e;
    if (key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      addNewLineToTextArea();
    } else if (key === 'Enter') {
      e.preventDefault();
      handleAddMessage();
      setBody('');
    }
  };

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
            onChange={(e) => setBody((e.target as HTMLTextAreaElement).value)}
            onKeyDown={(e: KeyboardEvent) => handleKeyPress(e)}
          />
          <Button
            floated="right"
            color="blue"
            type="submit"
            className={styles.button}
          >
            <FontAwesomeIcon icon={faPaperPlane} className={styles.sendIcon} />
          </Button>
        </Form>
      </Segment>
    </div>
  );
};

MessageInput.propTypes = {
  add: PropTypes.func.isRequired,
};

export default MessageInput;
