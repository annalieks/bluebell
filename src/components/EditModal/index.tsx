import React, {MutableRefObject, useEffect, useRef, useState} from 'react'

import styles from './styles.module.scss'
import {EditModalState} from '../../types';
import * as actions from './actions'
import {connect} from 'react-redux';

const EditModal = (props: any) => {
    const [body, setBody] = useState('');
    const textInput = useRef() as MutableRefObject<HTMLTextAreaElement>;

    const focus = () => {
        textInput.current.focus();
    }

    useEffect =(() => {
        props.edit
    });

    const getView = () => (
        props.id
    )

    return (
      <div className={styles.modalWrapper}>
          <div className={styles.modalHeader} />
          <textarea
             className={styles.modalText}
             value={body}
             onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
                 setBody(e.target.value)}
          />
      </div>
    );
}

const mapStateToProps = (state: { edit: EditModalState }) => {
    return {
        id: state.edit.id,
        text: state.edit.text
    }
}

const mapDispatchToProps = {
    ...actions
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);