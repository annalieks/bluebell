import React, { ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';

type Props = {
    text: string,
    keyword: string,
    label: string,
    onChange: (e: ChangeEvent<HTMLInputElement>, keyword: string) => void
}

const PasswordInput = ({
  text,
  keyword,
  label,
  onChange,
}: Props) => {
  const [isShown, setIsShown] = useState(false);
  const inputType = isShown ? 'text' : 'password';

  return (
    <div>
      <label>{ label }</label>
      <input
        value={text}
        type={inputType}
        onChange={(e) => onChange(e, keyword)}
      />
      <button type="button" className="col-sm-2" onClick={() => setIsShown(!isShown)}>&#x1f441;</button>
    </div>
  );
};

PasswordInput.propTypes = {
  text: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PasswordInput;
