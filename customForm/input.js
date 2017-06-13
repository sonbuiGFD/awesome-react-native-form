import React, {Component} from 'react';
import {View, StyleSheet, TextInput, Text, Platform, Image} from 'react-native';

const INPUT_VALID_IMAGE = require('./checkmark_circled_icon.png');
const INPUT_INVALID_IMAGE = require('./close_circled_icon.png');
const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 0,
    top: 3,
    height: 25,
    width: 25
  },
  input: {
    position: 'relative'
  },
});


export default class InputComponent extends Component{
constructor(props){
  super(props);
  this.state = {
    value: props.value,
    inputHeight: Math.max(props.height || 44),
    isDirty: false,
    isValid: true,
  };
  this.setValue = this.setValue.bind(this);
  this.triggerValidation = this.triggerValidation.bind(this);
  this.validate = this.validate.bind(this);
  this.handleChange = this.handleChange.bind(this);
}

checkInputValid = () => {
  return this.validate(this.state.value);
}

triggerValidation() {
  this.setState({isValid:this.validate(this.state.value), isDirty: true});
}

validate(value){
  const { validationFunction } = this.props;
  let result = false;
  this.errorMessage = [];
  if(typeof(validationFunction) === 'function') {
    result = validationFunction(value);
    if(result && result.isValid){
      this.setState({isValid:result.isValid, isDirty: true});
    }
    else{
      this.errorMessage = result.errorMessage;
      this.setState({isValid:false, isDirty: true});
    }
  }
  return result;
}

setValue(value){
  const {onChange, fieldRef} = this.props;
  this.setState({value, isDirty: true});
  this.validate(value);
  if(typeof(onChange) === 'function'){
    onChange(fieldRef, value);
  }
}

handleChange(event){
  const {onChange, fieldRef} = this.props;
  const value = event.nativeEvent.text;
  const mutilineHeight = (event.nativeEvent.contentSize && this.props.multiline)
  ? event.nativeEvent.contentSize.height : 0;
  const inputHeight = Math.max(this.state.inputHeight, mutilineHeight);

  this.validate(value);
  this.setState({value, inputHeight, isDirty: true});
  if(typeof(onChange) === 'function'){
    onChange(fieldRef, value);
  }
}

render(){
  const {
    containerStyle,
    inputStyle,
    keyboardType,
    placeholder
  } = this.props;
  const {value, inputHeight, isValid, isDirty} = this.state;
  const source = isValid ? INPUT_VALID_IMAGE : INPUT_INVALID_IMAGE;
 return(
   <View style={[containerStyle, styles.input]}>
     <TextInput
       {...this.props}
       keyboardType={keyboardType}
       style={[ inputStyle, {height: inputHeight}, isDirty && !isValid  ]}
       onChange={this.handleChange}
       placeholder={placeholder}
       value={value}
       underlineColorAndroid={!isValid ? 'red' : 'grey' }
      />
     {isDirty ?
       <Image
         style={styles.icon}
         source={source}
       /> : null }
   </View>
 );
}
}
