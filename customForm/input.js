import React, {Component} from 'react';
import {View, StyleSheet, TextInput, Text, Platform, Image} from 'react-native';

const INPUT_VALID_IMAGE = require('./checkmark_circled_icon.png');
const INPUT_INVALID_IMAGE = require('./close_circled_icon.png');
const styles = StyleSheet.create({
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginHorizontal: 4
  },
  input: {
    flex: 1,
    marginBottom: -10
  },
  icon: {
    width: 20,
    height: 20
  }
});


export default class InputComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      value: '',
      inputHeight: Math.max(props.height || 44),
      isDirty: false,
      isValid: true,
    };
    this.setValue = this.setValue.bind(this);
    this.triggerValidation = this.triggerValidation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  triggerValidation() {
    const { isRequired } = this.props;
    const { value } = this.state;
    this.setState({ isValid: this.validate(), isDirty: (!isRequired && value.length === 0) ? false : true});
  }

  validate(){
    const { value } = this.state;
    const { validationFunction, max, isRequired, min } = this.props;
    let isValid = true;
    const textLength = value.length;
    if(validationFunction) {
      validationFunction.forEach((func) => {
        isValid = func(value);
      });
    }
    if (textLength > max || textLength < min || isRequired && textLength === 0) {
      isValid = false;
    }
    return isValid;
  }

  getValid() {
    return this.validate();
  }
  setValue(value){
    const {onChange, fieldRef} = this.props;
    this.setState({value, isDirty: true}, () => {
      this.triggerValidation();
    });
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

    this.setState({value, inputHeight, isDirty: true}, () => {
      this.triggerValidation();
    });
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
    const bottomColor = this.state.isDirty ? this.state.isValid ? '#0490C6' : 'red' : 'grey';
    return(
      <View
        style={[styles.inputWrapper, {borderBottomColor: bottomColor}]}
      >
        <TextInput
          {...this.props}
          keyboardType={keyboardType}
          style={styles.input}
          onChange={this.handleChange}
          onBlur={this.triggerValidation}
          placeholder={placeholder}
          value={value}
          underlineColorAndroid='transparent'
        />
        {
          isDirty ?
            <View style={{flex: 0.1}}>
              <Image
                style={styles.icon}
                source={source}
              />
            </View> : null
        }
     </View>
   );
  }
}

InputComponent.defaultProps = {
  isRequired: false,
  isValid: true,
  max: 300,
  min: 0,
  keyboardType: 'default'
}