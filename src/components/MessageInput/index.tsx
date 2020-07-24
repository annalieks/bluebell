import React, {
  useState, MutableRefObject, useRef, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IAddMessage } from '../../types';

import styles from './styles.module.scss';

interface IProps {
 addMessage: (value: IAddMessage) => void;
}

const MessageInput = (props: IProps) => {
  const [body, setBody] = useState('');
  const messagesEndRef = useRef() as MutableRefObject<HTMLDivElement>;

  const handleAddMessage = () => {
    if (!body) {
      return;
    }
    props.addMessage({
      text: body,
      createdAt: (new Date()).toString(),
    });
    setBody('');
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
            onChange={
              (e: React.FormEvent<HTMLTextAreaElement>)
                  : void => setBody((e.target as HTMLTextAreaElement).value)
            }
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

MessageInput.propTypes = {
  addMessage: PropTypes.func.isRequired,
};

export default MessageInput;
