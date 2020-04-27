import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Button,
  Text
} from 'react-native';
import Matrix from './components/Matrix';
import SudokuGenerator from './services/generator';

const sudokuGenerator = new SudokuGenerator(2);
const newSudokuData = sudokuGenerator.generate();
// Sudoku main app component func
const SudokuApp = () => {
  const [puzzleData, updatePuzzleData] = useState([...newSudokuData]);
  const [success, updateSuccessStatus] = useState(false);

  useEffect(() => {
    updateSuccessStatus(false);
  }, [puzzleData]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Text style={styles.appTitle}>Sudoku App</Text>
          <Matrix
            puzzleData={puzzleData}
            success={success}
            filledAll={() => updateSuccessStatus(true)}
          />
          { success && <Text style={styles.successMessage}>Success! Congratulations!</Text>}
          <View style={styles.resetBtn}>
            <Button
              onPress={() => updatePuzzleData([...sudokuGenerator.generate()])}
              title={'Restart'}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingBottom: 30,
    minHeight: '100%'
  },
  appTitle: {
    textAlign: 'center',
    fontSize: 40,
    color: '#333'
  },
  successMessage: {
    textAlign: 'center',
    fontSize: 30,
    color: '#4BB543',
    marginTop: 20
  },
  resetBtn: {
    width: 200,
    alignSelf: 'center',
    marginTop: 30,
    marginHorizontal: 15,
    lineHeight: 30,
    fontSize: 30
  }
});

export default SudokuApp;
