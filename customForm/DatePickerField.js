import React, { Component } from 'react';

import {
	View,
	Text,
	StyleSheet,
	DatePickerAndroid,
	TouchableHighlight
} from 'react-native';
import DatePicker from './DatePicker';

export default class DatePickerField extends Component {
	constructor(props) {
		super(props);
    this.state={
      date: '',
    }
	}
	handleChange(date) {
		this.setState({ date });
		this.props.onChange(this.props.fieldRef, date);
	}
	render() {
		return (
			<DatePicker
        {...this.props}
        date={this.state.date}
        onChange={(date) => this.handleChange(date)}
      />
		);
	}
}

const styles = StyleSheet.create({
	picker: {

	}
});