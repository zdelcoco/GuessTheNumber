import { View, Text, Image, StyleSheet, ImageComponent } from 'react-native';
import Title from '../components/ui/Title';

import Colors from '../constants/colors';

function GameOverScreen({ numGuesses }) {
  return (
    <View>
      <Title>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image          
          style={styles.image}
          source={require('../assets/images/success.png')}
        />
      </View>
    </View>
  );
}

export default GameOverScreen;

const styles = StyleSheet.create({
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
