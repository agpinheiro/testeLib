import React, { useState } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavProps } from '../navigation/Stack';
import Collapsable from '../components/Collapsable';
import FlipCard from '../components/FlipCard';

const { width, height } = Dimensions.get('screen')

const Home: React.FC<NavProps> = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <FlipCard
        isFlipped={(v) => console.log(v)}
        containerStyle={{ borderRadius: 8 }}
        contentFront={<Text>Aqui vai a frente</Text>}
        contentBack={<Text>Aqui vai o fundo</Text>}
        containerFront={{ backgroundColor: 'white' }}
        containerBack={{ backgroundColor: 'purple' }}
        size={[width * 0.88, width * 0.52]} 
        isVertical
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default Home;
