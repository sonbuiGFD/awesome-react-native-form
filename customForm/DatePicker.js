import React, { Component } from 'react';

import {
	View,
	Text,
	StyleSheet,
	DatePickerAndroid,
	TouchableHighlight,
	TextInput
} from 'react-native';

function formatDate(date) {
  const d = date.getDate();
  const m = date.getMonth()+1;
  const y = date.getFullYear();
  return (d<10 ? '0'+d : d) + '/' + (m<10 ? '0'+m : m) + '/' + y;
}

export default class DatePicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isPickerVisible: false
		};
		this.togglePicker = this.togglePicker.bind(this);
		this.handleValueChange = this.handleValueChange.bind(this);
	}
	handleValueChange(date) {
		this.props.onChange(date);
	}
	async togglePicker(event) {
		try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: this.props.date || new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.handleValueChange(new Date(year,month,day));
        // Selected year, month (0-11), day
      }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message);
    }
	}
	render() {
		return (
			<View>
				<TouchableHighlight
					style={styles.pickerContainer}
					onPress={this.togglePicker}
				>
					<View style={styles.pickerWrapper}>
						<Text>{this.props.date ? formatDate(this.props.date) : this.props.placeholder}</Text>
						{/*<TextInput
							editable={false}
							value={this.props.date ? formatDate(this.props.date) : null}
							underlineColorAndroid='black'
						/>*/}
					</View>
				</TouchableHighlight>
				{
					this.state.isPickerVisible ?
						<DatePickerAndroid
							date={new Date()}
							onDateChange={this.handleValueChange}
						/> : null
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	pickerContainer: {
		height: 40,
	},
	pickerWrapper: {
		flex: 1,
		marginHorizontal: 4,
		justifyContent: 'flex-end',
		paddingBottom: 5,
		borderColor: 'grey',
		borderBottomWidth: 1
	}
});