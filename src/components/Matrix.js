import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Keyboard
} from 'react-native';
import { DIGITS } from '../services/validator';
import SudokuValidator from '../services/validator';
import { sleep } from '../services/sleep';
import Cell from './Cell';

const cellWidth = (Math.round(Dimensions.get('window').width) - 30) / 9; // calc one Cell width from device width
// Sudoku Matrix component func
const Matrix = ({ puzzleData, success, filledAll }) => {
  const [matrixData, updateMatrix] = useState(puzzleData);
  const [errorCells, updateErrorCells] = useState([]);
  const [validFills, updateValidFills] = useState([]);

  useEffect(() => {
    updateMatrix(puzzleData);
    updateValidFills([]);
  }, [puzzleData])

  useEffect(() => {
    if (validFills.length == 2) {
      filledAll();
    }
  }, [validFills]);

  // Update value
  const updateValue = (rowId, colId, val) => {
    const updatedMatrixData = JSON.parse(JSON.stringify(matrixData));
    updatedMatrixData[rowId][colId] = val;
    updateMatrix(updatedMatrixData);
    // validate
    validate(updatedMatrixData, rowId, colId);
  }
  // validate
  const validate = (updatedMatrixData, rowId, colId) => {
    const validator = new SudokuValidator(updatedMatrixData, rowId, colId);
    const {squareErrors, rowColErrors} = validator.validate();
    if (validator.isValid()) {
      Keyboard.dismiss();
      updateValidFills(fills => fills.includes(`${rowId}${colId}`) ? fills : [...fills, `${rowId}${colId}`]);
      return;
    }
    setErrorCells(squareErrors, rowColErrors);
  }
  // set error cells
  const setErrorCells = async (squareErrors, rowColErrors) => {
    if (squareErrors.length > 0) {
      updateErrorCells(squareErrors);
      await sleep(2000);
    }
    if (rowColErrors.length > 0) {
      updateErrorCells(rowColErrors);
      await sleep(2000);
    }
    errorCells && updateErrorCells([]);
  }

  return (
    <View style={styles.squareContainer}>
      {
        DIGITS.map(rowId => <View style={styles.rowContainer} key={rowId}>
          {
            DIGITS.map(colId =>
              <Cell
                key={`${rowId}-${colId}`}
                value={matrixData[rowId][colId]}
                width={cellWidth}
                updateValue={(val) => updateValue(rowId, colId, val)}
                editable={!success && puzzleData[rowId][colId] === '0'}
                disable={errorCells.length > 0}
                hasError={errorCells.length > 0 && errorCells.indexOf(`${rowId}${colId}`) >= 0}
              />
            )
          }
        </View>)
      }
    </View>
  );
};

const styles = StyleSheet.create({
  squareContainer: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    elevation: 4,
    overflow: 'visible',
    margin: 15,
    marginTop: 25
  },
  rowContainer: {
    flexDirection: 'row'
  }
});

export default Matrix;
