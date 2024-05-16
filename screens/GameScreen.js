import { Alert, View, Text, FlatList, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import PrimaryButton from '../components/ui/PrimaryButton';
import NumberContainer from '../components/game/NumberContainer';
import InstructionText from '../components/ui/InstructionText';
import GuessLogItem from '../components/game/GuessLogItem';
import Colors from '../constants/colors';

let minBoundary = 1;
let maxBoundary = 99;

function GameScreen({ userNumber, onGuess, onGameOver }) {
  const initialGuess = getRandomInt(1, 99, userNumber);
  const [guessedNumber, setGuessedNumber] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (guessedNumber === userNumber) {
      onGameOver();
    }
  }, [guessedNumber, userNumber, onGameOver]);

  useEffect(() => {
    return () => {
      minBoundary = 1;
      maxBoundary = 99;
    };
  }, []);

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
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
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

  const guessRoundsListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{guessedNumber}</NumberContainer>
      <Card>
        <Text style={styles.text}>Is your number</Text>
        <InstructionText style={styles.instructionText}>
          Higher or Lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name='remove' size={24} color='white' />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
              <Ionicons name='add' size={24} color='white' />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem roundNumber={guessRoundsListLength - itemData.index} guess={itemData.item}/>
          )}
          keyExtractor={(item) => item}
        />
      </View>
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
  text: {
    fontFamily: 'open-sans',
    color: Colors.accent500,
  },
  guessText: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  }
});
