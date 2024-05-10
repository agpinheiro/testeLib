import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavProps } from '../navigation/Stack';
import Overlay from '../components/Overlay';
import Input from '../components/Input';

const Home: React.FC<NavProps> = ({ navigation }) => {

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Sair do App', 'Tem certeza que deseja sair do aplicativo?', [
        {
          text: 'Cancelar',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text style={styles.text}>HOME</Text>
      </TouchableOpacity>

      <View style={{ width: '100%', paddingHorizontal: 30, gap: 30 }}>
        <Input keyboardType='decimal-pad' mask='cpf' textInputColor='white' backgroundColor='#999' borderColor='#5900ff' titleColor={['black', 'white']} title='Teste' onChangeText={() => { }} />
      </View>
      <Overlay orientation='top' visible={visible} setVisible={setVisible}>
        <View style={{ width: 300, height: 100, backgroundColor: 'white', borderRadius: 10 }}>
          <TouchableOpacity>
            <Text>ASDASD</Text>
          </TouchableOpacity>
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
    backgroundColor: 'black',
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
