import React from 'react';
import {Animated, StyleSheet} from 'react-native';

interface Props {
  children: React.ReactNode;
}
const NavigatorContainer: React.FC<Props> = ({children}) => {
  return <Animated.View style={styles.container}>{children}</Animated.View>;
};

const styles = StyleSheet.create({container: {flex: 1}});

export default NavigatorContainer;
