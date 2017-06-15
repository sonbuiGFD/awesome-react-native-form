import React, {Component} from 'react';
import { View, StyleSheet, TextInput, Text, Picker} from 'react-native';
const PickerItem = Picker.Item;

export default class PickerComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: props.value || props.label,
      isValid: true,
    }
  }


  triggerValidation() {
    const { isRequired } = this.props;
    this.setState({ isValid: this.validate()});
  }

  validate = () => {
    const { value } = this.state;
    const { validationFunction, fieldRef } = this.props;
    let result = false;
    this.errorMessage = [];
    if(typeof(validationFunction) === 'function') {
      result = validationFunction(value);
      if(result && result.isValid) {
        this.setState({isValid:result.isValid});
      }
      else{
        this.errorMessage = result.errorMessage;
        this.setState({isValid:false});
      }
    }
    return result;
  }

  setValue = (value) => {
    const {onChange, fieldRef} = this.props;
    this.setState({value});
    if(typeof(onChange) === 'function'){
      onChange(fieldRef, value);
    }
  }

  handleValueChange = (value) => {
    const {onChange, fieldRef, label} = this.props;
    this.setState({value:( value && value!== '') ? value : label});
    if(typeof(onChange) === 'function'){
      onChange(fieldRef, value);
    }
  }

  render(){
    const { options } = this.props;
    return(
        <View >
            <Picker ref='picker'
                mode="dropdown"
                selectedValue={this.state.value}
                onValueChange={this.handleValueChange}
                >
                {Object.keys(options).map((value) => (
                  <PickerItem
                    key={value}
                    value={options[value]}
                    label={options[value]}
                  />
              ), this)}
            </Picker>
        </View>
    )
  }

}
