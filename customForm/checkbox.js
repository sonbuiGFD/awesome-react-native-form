import React, { Component } from 'react';
const { PropTypes } = React;
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
const CB_ENABLED_IMAGE = require('./cb_enabled.png');
const CB_DISABLED_IMAGE = require('./cb_disabled.png');

export default class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = { internalChecked: props.checked || false };
    }
    onChange = () => {
      const { internalChecked } = this.state;
      const { onChange, fieldRef } = this.props;
      const newValue = !internalChecked
      this.setState({
          internalChecked: newValue
      });
      if (typeof onChange === 'function') {
        onChange(fieldRef, newValue);
      }
    }

    setValue = (newValue) => {
      const { onChange, fieldRef } = this.props;
      this.setState({
          internalChecked: newValue
      });
      if (typeof onChange === 'function') {
        onChange(fieldRef, newValue);
      }
    }


    render() {
      const { checked, checkedImage, uncheckedImage, containerStyle,
        underlayColor, checkboxStyle, labelStyle, label } = this.props;
      const { internalChecked } = this.state;
      const source = internalChecked ? checkedImage : uncheckedImage;
      return (
          <TouchableHighlight onPress={this.onChange} underlayColor={underlayColor} style={styles.flexContainer}>
            <View style={containerStyle || styles.container}>
                <Image
                  style={checkboxStyle || styles.checkbox}
                  source={source}
                />
                <View style={styles.labelContainer}>
                    <Text style={[styles.label, labelStyle]}>{label}</Text>
                </View>
            </View>
          </TouchableHighlight>
      );
    }
}

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    checkbox: {
        width: 26,
        height: 26
    },
    labelContainer: {
        marginLeft: 10,
        marginRight: 10,
    },
    label: {
        fontSize: 15,
        color: 'grey'
    }
});

CheckBox.propTypes = {
    label: PropTypes.string,
    labelStyle: PropTypes.oneOfType([PropTypes.array,PropTypes.object,PropTypes.number]),
    checkboxStyle: PropTypes.oneOfType([PropTypes.array,PropTypes.object,PropTypes.number]),
    containerStyle: PropTypes.oneOfType([PropTypes.array,PropTypes.object,PropTypes.number]),
    checked: PropTypes.bool,
    checkedImage: PropTypes.number,
    uncheckedImage: PropTypes.number,
    underlayColor: PropTypes.string,
    onChange: PropTypes.func
};

CheckBox.defaultProps = {
    label: 'Label',
    checked: false,
    checkedImage: CB_ENABLED_IMAGE,
    uncheckedImage: CB_DISABLED_IMAGE,
    underlayColor: 'white'
};

module.exports = CheckBox;
