import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text } from 'react-native';
import { NavProps } from '../navigation/Stack';
import Collapsable from '../components/Collapsable';

const Home: React.FC<NavProps> = ({ navigation }) => {

  const text = `Em linguística, a noção de texto é ampla e ainda aberta a uma definição mais precisa. Grosso modo, pode ser entendido como manifestação linguística das ideias de um autor, que serão interpretadas pelo leitor de acordo com seus conhecimentos linguísticos e culturais. Seu tamanho é variável.`;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
      <Collapsable
        containerStyle={styles.containerCollapsed}
        duration={30}
        title={<Text style={{ color: 'white', padding: 10 }}>Exemplo de uso com texto:</Text>}
        content={<Text style={{ color: 'white', marginTop: 10, padding: 50 }}>{text}</Text>}
        // content={<Image style={{ width: '100%', height: 100 }} source={{ uri: 'https://i.ytimg.com/vi/MoCjCw8Wm8s/maxresdefault.jpg' }} />}
        buttonTitleStyle={undefined}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  containerCollapsed: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 50,
    backgroundColor: '#888',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});

export default Home;
