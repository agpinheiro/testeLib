import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavProps} from '../navigation/Stack';

const Home: React.FC<NavProps> = ({navigation}) => {
  const navigationToLogin = () => {
    navigation.navigate('Login2');
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigationToLogin}>
        <Text style={styles.text}>HOME</Text>
      </TouchableOpacity>

      <View style={{marginTop: 20}} />
      <TouchableOpacity onPress={goBack}>
        <Text style={styles.text}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
