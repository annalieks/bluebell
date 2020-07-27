import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Divider } from 'semantic-ui-react';

interface IProps {
 date: string;
}

const TimeSeparator = ({ date }: IProps) => {
  const getDate = () => {
    const messagesDate = moment(date, 'DD/MM/YY');
    const diff = moment().diff(messagesDate, 'days');
    if (diff === 0) {
      return messagesDate.format('[Today, ] Do MMM');
    } if (diff === 1) {
      return messagesDate.format('[Yesterday, ] Do MMM');
    } if (diff < 7) {
      return `${diff} days ago`;
    }
    return messagesDate.format('Do MMM');
  };

  return (
    <Divider horizontal>{ getDate() }</Divider>
  );
};

TimeSeparator.propTypes = {
  date: PropTypes.string.isRequired,
};

export default TimeSeparator;
