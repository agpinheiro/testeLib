import React, { useState } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavProps} from '../navigation/Stack';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

const Home: React.FC<NavProps> = ({navigation}) => {
  const navigationToNFC = () => {
    navigation.navigate('NFC');
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigationToNFC}>
        <Text style={styles.text}>HOME</Text>
      </TouchableOpacity>

      <View style={{marginTop: 20}} />
      <TouchableOpacity onPress={goBack}>
        <Text style={styles.text}>Voltar</Text>
      </TouchableOpacity>
      <View style={{marginTop: 200}} />
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
