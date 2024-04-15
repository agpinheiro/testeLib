import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavProps} from '../navigation/Stack';

const Login: React.FC<NavProps> = ({navigation}) => {
  const navigationToHome = () => {
    navigation.navigate('Home');
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigationToHome}>
        <Text style={styles.text}>LOGIN</Text>
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
    backgroundColor: 'green',
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Login;
