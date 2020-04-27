import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

// Cell component func
const Cell = ({ value, width, updateValue, editable, hasError, disable }
  : {value: string, width: number, updateValue: (v: string) => void, editable: boolean, hasError: boolean, disable: boolean}) => {
  const [text, changeText] = useState( value === '0' ? '' : value);

  useEffect(() => {
    value === '0' && changeText('');
  }, [value]);

  const onTextChanged = (val: string) => {
    const filtered = val.replace(/[^0-9]/g, '');
    changeText(filtered);
    if (filtered) {
      updateValue(filtered);
    }
  }

  return <View style={[cellStyles.cellContainer, { width, height: width }, editable && { backgroundColor: '#fff'}, hasError && { borderColor: '#f00' }]} >
    {
      editable ? <TextInput
          style={[cellStyles.inputStyle, { width }, hasError && { color: 'red' }]}
          maxLength={1}
          editable={!disable}
          numberOfLines={1}
          onChangeText={onTextChanged}
          value={text}
          keyboardType={'numeric'}
        />
      : <Text style={hasError && { color: 'red' }}>{value}</Text>
    }
  </View>;
};

const cellStyles = StyleSheet.create({
  inputStyle: {
    textAlign: 'center',
    backgroundColor: '#fff'
  },
  cellContainer: {
    borderColor: '#999',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cellText: {
    textAlign: 'center'
  },
  item: {
    backgroundColor: '#fff'
  }
});

export default React.memo(Cell);
