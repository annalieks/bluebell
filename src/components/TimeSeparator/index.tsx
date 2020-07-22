import React from 'react'
import moment from 'moment'
import { Divider } from 'semantic-ui-react';

interface IProps {
	date: string;
}

const TimeSeparator = (props: IProps) => {
	const getDate = () => {
		const diff = moment().diff(moment(props.date, 'DD/MM/YY'), 'days');
		if(diff === 0) {
			return 'Today';
		} else if(diff === 1) {
			return 'Yesterday';
		} else if(diff <= 7) {
			return diff + ' days ago';
		} else {
			return props.date;
		}
	}

	return (
		<Divider horizontal>{ getDate() }</Divider>
	)
}

export default TimeSeparator;