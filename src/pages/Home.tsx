import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavProps } from '../navigation/Stack';
import Overlay from '../components/Overlay';
import Input from '../components/Input';
import Collapsable from '../components/Collapsable';

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

  const text = `Em linguística, a noção de texto é ampla e ainda aberta a uma definição mais precisa. Grosso modo, pode ser entendido como manifestação linguística das ideias de um autor, que serão interpretadas pelo leitor de acordo com seus conhecimentos linguísticos e culturais. Seu tamanho é variável.`;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 60}}>
      <Collapsable
        containerStyle={{ width: '80%', alignSelf: 'center', marginTop: 50, marginVertical: 10, gap: 10 }}
        titleStyle={{ color: 'blue' }}
        contentStyle={{ color: 'white' }}
        title="Exemplo de uso com texto:"
        content={text}
      />
      <Collapsable
        containerStyle={{ width: '80%', alignSelf: 'center', marginVertical: 10, gap: 10 }}
        titleStyle={{ color: 'white' }}
        contentStyle={{ color: 'white' }}
        title="Exemplo de uso com texto:"
        content={text}
      />
      <Collapsable
        containerStyle={{ width: '80%', alignSelf: 'center', marginVertical: 10, gap: 10 }}
        titleStyle={{ color: 'white' }}
        contentStyle={{ color: 'white' }}
        title="Exemplo de uso com texto:"
        content={text}
      />
      <Collapsable
        containerStyle={{ width: '80%', alignSelf: 'center', marginVertical: 10, gap: 10 }}
        titleStyle={{ color: 'white' }}
        contentStyle={{ color: 'white' }}
        title="Exemplo de uso com texto:"
        content={text}
      />
      <Collapsable
        containerStyle={{ width: '80%', alignSelf: 'center', marginVertical: 10, gap: 10 }}
        titleStyle={{ color: 'white' }}
        contentStyle={{ color: 'white' }}
        title="Exemplo de uso com texto:"
        content={text}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
