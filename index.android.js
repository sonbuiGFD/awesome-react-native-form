/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { Form, InputComponent, DatePickerField } from './customForm';

// function validateInput({value, isRequired}) {
//   let isValid = true, message = [];
//   if(isRequired && (!value || value === '')) {
//     isValid = false;
//     message.push('Input is required')
//   }
//   // const matches = value && value.match();
//   // if (matches != null) {
//   //   isValid = false;
//   //   message.push('Input is required')
//   // }
//   return {isValid, message};
// }

function validateFormatInput(value) {
  const re =  /^([a-zA-Z ]+)$/; // /^[a-zàâçéèêëîïôûùüÿñæœ.-]*$/i
  const isValid = re.test(value);
  return isValid;
}

export default class testForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      formData:{}
    }
    this.form;
  }

  handleFormChange = (formData) => {
    this.setState({formData})
  }
  getData = () => {
    const data = this.form.getValues();
    alert(JSON.stringify(data));
  }
  checkValid = () => {
    const data = this.form.checkFormValid();
    alert(JSON.stringify(data));
  }
  setValue = () => {
    const data = {first_name: 'sơn đẹp trai'}
    this.form.setValues(data);
  }

  render() {
    return (
      <Form
        ref={(form) => { if(form) this.form = form}}
        onChange={this.handleFormChange}
      >
        <InputComponent
           fieldRef='first_name'
           placeholder='Nom *'
           isRequired={true}
           max={50}
           validationFunction={[validateFormatInput]}
        />
        <InputComponent
           fieldRef='last_name'
           placeholder='Prénoms *'
           isRequired={true}
           max={50}
           validationFunction={[validateFormatInput]}
        />
        <InputComponent
           fieldRef='Fone_number'
           placeholder='Telephone mobile *'
           max={10}
           keyboardType = 'numeric'
        />
        <DatePickerField
          fieldRef='birthday'
          placeholder='Date de naissance'
          isRequired={true}
        />
        <Button
          title='getdata'
          onPress={this.getData}>
        </Button>
        <Button
          title='submit'
          onPress={this.checkValid}>
        </Button>
        <Button
          title='setdata'
          onPress={this.setValue}>
        </Button>
      </Form>
    );
  }
}

AppRegistry.registerComponent('testForm', () => testForm);
