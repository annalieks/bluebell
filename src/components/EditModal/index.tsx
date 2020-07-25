import React, {MutableRefObject, useEffect, useRef, useState} from 'react'

import styles from './styles.module.scss'
import {connect} from 'react-redux';
import { ChatState } from '../../types';
import {Button, Form, Header, Icon, Modal, TextArea} from 'semantic-ui-react';
import {cancelEditMessage, openEditMessage, updateMessage} from '../Chat/actions';
import _ from "lodash";

type Props = ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps

const EditModal = (props: Props) => {
    const {
        editingMessage: message,
        updateMessage: update,
        cancelEditMessage: cancel
    } = props;
    const [body, setBody] = useState('');
    const inputRef = useRef() as MutableRefObject<TextArea>;

    const focus = () => {
        inputRef?.current?.focus();
    }

    useEffect(() => {
        focus();
    })

    const handleCancel = () => {
        cancel();
        setBody('');
    }

    const handleEdit = () => {
        if(!body || !message) {
            cancel();
            return;
        }
        const text = _.trim(body);
        if(text.length == 0) return;
        update({
            id: message.id,
            text,
            editedAt: Date.now().toString()
        })
        setBody('');
    }
    const getView = () => (
        message!= null
        ? <Modal
                basic size='small'
                dimmer={'blurring'}
                open>
            <Header content='Edit message' />
                <Modal.Content>
                <Form>
                    <TextArea
                        value={body || message?.text}
                        className={styles.textArea}
                        ref={inputRef}
                        onChange={(e,{value}) => setBody(value as string)}
                    />
                </Form>
                </Modal.Content>
            <Modal.Actions>
                <Button
                    basic
                    color='red'
                    inverted
                    onClick={handleCancel}>
                <Icon name='remove'/>Cancel
                </Button>
                <Button
                    color='green'
                    inverted
                    onClick={handleEdit}>
                <Icon name='checkmark'/>Edit
                </Button>
           </Modal.Actions>
         </Modal>
        : null
    )

    return getView();
}

const mapStateToProps = (state: { chat: ChatState }) => {
    return {
        editingMessage: state.chat.editingMessage
    };
}

const mapDispatchToProps = {
    updateMessage,
    openEditMessage,
    cancelEditMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);