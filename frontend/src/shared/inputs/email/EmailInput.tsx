import React, { ChangeEvent, FocusEvent, useState } from 'react';
import PropTypes from 'prop-types';

import './styles.module.scss';

type Props = {
    text: string,
    type: string,
    keyword: string,
    label: string,
    onChange: (e: ChangeEvent<HTMLInputElement>, keyword: string) => void
}

const EmailInput = ({
  text,
  type,
  keyword,
  label,
  onChange,
}: Props) => {
  const [isValid, setIsValid] = useState(true);

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsValid(e.target.value.includes('@'));
  };

  const getErrorMessage = () => <span className="error-message">That is not a valid email</span>;

  const inputClass = isValid ? 'col-sm-9' : 'error col-sm-9';

  return (
    <div>
      <label>{ label }</label>
      <input
        value={text}
        type={type}
        onChange={(e) => onChange(e, keyword)}
        onBlur={(e) => onBlur(e)}
      />
      { !isValid ? getErrorMessage() : null }
    </div>
  );
};

EmailInput.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EmailInput;
