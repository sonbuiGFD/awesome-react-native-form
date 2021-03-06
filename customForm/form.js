import React, {Component} from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
export default class Form extends Component{
  constructor(props){
    super();
    this.values = {};
    this.child = [];
  }

  handleFieldChange = (fieldRef, value) => {
    const { onChange } = this.props;
    this.values[fieldRef] = value;
    this.props.onChange && this.props.onChange(this.values);
    if(typeof(onChange) === 'function'){
      onChange(this.values);
    }
  }

  getValues = () => {
    return this.values;
  }

  setValues = (newValue) => {
    if(newValue){
      this.child.forEach((val) => {
        if( this.refs[val] && newValue && newValue[val]){
          this.refs[val].setValue(newValue[val]);
        }
      });
      this.checkFormValid();
    }
  }

  checkFormValid = () => {
    let result = true;
    this.child.forEach((val) => {
      if(this.refs[val] && this.refs[val].checkInputValid){
        const checkResult = this.refs[val].checkInputValid();

        if(checkResult && !checkResult.isValid) {
          result = false;
        }
      }
    });
    return result;
  }



  render(){
    let wrappedChildren = [];
    React.Children.map(this.props.children, (child, i)=> {
     if (!child) {
       return null;
     }
     if( this.child.indexOf(child.props.fieldRef) === -1){
       this.child.push(child.props.fieldRef);
     }
    wrappedChildren.push(React.cloneElement(child, {
         key: child.ref || child.type+i,
         fieldRef : child.props.fieldRef,
         ref: child.props.fieldRef,
         onChange:this.handleFieldChange
       }
     ));
    }, this);
   return (
     <View style={this.props.style}>
         {wrappedChildren}
     </View>
   );
  }
}
