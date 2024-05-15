import { View, Text, Image, StyleSheet } from 'react-native';
import Title from '../components/ui/Title';

import Colors from '../constants/colors';
import PrimaryButton from '../components/ui/PrimaryButton';

function GameOverScreen({ numGuesses, userNumber, onRestart }) {
  return (
    <View style={styles.rootContainer}>
      <Title>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image          
          style={styles.image}
          source={require('../assets/images/success.png')}
        />
      </View>
      <Text>Your phone needed {numGuesses} rounds to guess the number {userNumber} </Text>
      <PrimaryButton onPress={onRestart}>Restart</PrimaryButton>
    </View>
  );
}

export default GameOverScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 36,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
