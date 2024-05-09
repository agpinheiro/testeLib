import React, { useState } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavProps} from '../navigation/Stack';
import Overlay from '../components/Overlay';

const Home: React.FC<NavProps> = ({navigation}) => {

  const [visible, setVisible] = useState(false)

  const navigationToNFC = () => {
    navigation.navigate('NFC');
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text style={styles.text}>HOME</Text>
      </TouchableOpacity>

      <View style={{marginTop: 20}} />
      <TouchableOpacity onPress={goBack}>
        <Text style={styles.text}>Voltar</Text>
      </TouchableOpacity>
      <View style={{marginTop: 200}} />
      <Overlay orientation='top' visible={visible} setVisible={setVisible}>
        <View style={{width: 300, height: 100, backgroundColor: 'white', borderRadius: 10}}>
          <Text>ASDASD</Text>
        </View>
      </Overlay>
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
