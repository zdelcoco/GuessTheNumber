import { Text } from 'react-native';

function GameOverScreen({ numGuesses }) {
  return <Text>Game Over! It only took me {numGuesses} tries!</Text>;
}

export default GameOverScreen;
