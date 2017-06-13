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
  TouchableHighlight,
} from 'react-native';
import { Form, InputComponent } from './customForm';
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
      <View style={styles.container}>
        <Form
          ref={(form) => { if(form) this.form = form}}
          onChange={this.handleFormChange}
          style={{flex: 1, borderColor: '#000', borderWidth: 1}}
        >
          <InputComponent
             fieldRef='first_name'
             placeholder='First Name'
             style={{flex: 1}}
             containerStyle={{flex: 1}}
             validationFunction={(value) => {
               let isValid = true, message = [];
               if(!value || value === '') {
                 isValid = false;
                 message.push('Input is required')
               }
               const matches = value && value.match(/\d+/g);
               if (matches != null) {
                 isValid = false;
                 message.push('Input is required')
               }
               return {isValid, message};
            }}
          />
          <InputComponent
             fieldRef='last_name'
             placeholder='Last Name'
             style={{flex: 1}}
             containerStyle={{flex: 1}}
             validationFunction={(value) => {
               let isValid = true, message = [];
               if(!value || value === '') {
                 isValid = false;
                 message.push('Input is required')
               }
               const matches = value && value.match(/\d+/g);
               if (matches != null) {
                 isValid = false;
                 message.push('Input is required')
               }
               return {isValid, message};
            }}
          />
          <InputComponent
             fieldRef='Fone_number'
             placeholder='Last Name'
             keyboardType = 'numeric'
             style={{flex: 1}}
             containerStyle={{flex: 1}}
             validationFunction={(value) => {
               let isValid = true, message = [];
               if(!value || value === '') {
                 isValid = false;
                 message.push('Input is required')
               }
               return {isValid, message};
            }}
          />
        </Form>
          <TouchableHighlight
            style={{
              flex: 1,
               borderColor: '#000',
               borderWidth: 1,
               height: 10
             }}
             onPress={this.getData}>
             <Text>get data</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              flex: 1,
               borderColor: '#000',
               borderWidth: 1,
               height: 10
             }}
             onPress={this.checkValid}>
             <Text>checkValid</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              flex: 1,
               borderColor: '#000',
               borderWidth: 1,
               height: 10
             }}
             onPress={this.setValue}>
             <Text>set data</Text>
          </TouchableHighlight>
        <Text>{JSON.stringify(this.state.formData)}</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('testForm', () => testForm);
