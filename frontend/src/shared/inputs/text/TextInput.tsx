import React, { ChangeEvent } from 'react';
import PropTypes from 'prop-types';

type Props = {
    text: string,
    type: string,
    keyword: string,
    label: string,
    onChange: (e: ChangeEvent<HTMLInputElement>, keyword: string) => void
}

const TextInput = ({
  text,
  type,
  keyword,
  label,
  onChange,
}: Props) => {
  const onChangeEvent = (e: ChangeEvent<HTMLInputElement>) => onChange(e, keyword);

  return (
    <div className="form-group row">
      <label className="col-sm-3 col-form-label">{ label }</label>
      <input
        className="col-sm-9"
        value={text}
        type={type}
        onChange={onChangeEvent}
      />
    </div>
  );
};

TextInput.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextInput;
