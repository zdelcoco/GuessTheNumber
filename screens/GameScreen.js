import { Alert, View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import PrimaryButton from '../components/ui/PrimaryButton';
import NumberContainer from '../components/game/NumberContainer';
import InstructionText from '../components/ui/InstructionText';

let minBoundary = 1;
let maxBoundary = 99;

function GameScreen({ userNumber, onGuess, onGameOver }) {
  const [guessedNumber, setGuessedNumber] = useState(
    getRandomInt(1, 99, userNumber)
  );

  useEffect(() => {
    if (guessedNumber === userNumber) {
      onGameOver();
    }
  }, [guessedNumber, userNumber, onGameOver]);

  function nextGuessHandler(direction) {
    if (
      (direction === 'lower' && guessedNumber < userNumber) ||
      (direction === 'higher' && guessedNumber > userNumber)
    ) {
      Alert.alert('Dont lie!', 'The game only works if you tell the truth!', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') {
      maxBoundary = guessedNumber - 1;
    } else {
      minBoundary = guessedNumber + 1;
    }

    const newRndNumber = getRandomInt(minBoundary, maxBoundary, guessedNumber);

    setGuessedNumber(newRndNumber);
    onGuess();
  }

  function getRandomInt(min, max, exclude) {
    min = Math.ceil(min);
    max = Math.floor(max);
    rndNum = Math.floor(Math.random() * (max - min + 1)) + min;

    if (rndNum === exclude) {
      return getRandomInt(min, max, exclude);
    } else {
      return rndNum;
    }
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{guessedNumber}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
        <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name="remove" size={24} color="white"/>
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
            <Ionicons name="add" size={24} color="white"/>
            </PrimaryButton>
          </View>          
        </View>
      </Card>
      <View>{/* LOG ROUNDS */}</View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
});
