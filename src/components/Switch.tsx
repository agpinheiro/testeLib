import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, Animated} from 'react-native';

interface Props {
  disabledColor?: string;
  enabledColor?: string;
  size?: number;
  value?: (value: boolean) => void;
}

const SwitchUI: React.FC<Props> = ({
  disabledColor = '#ccc',
  enabledColor = '#05d172',
  size = 1,
  value,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => {
      if (typeof value === 'function') {
        value(!previousState);
      }

      return !previousState;
    });
  };

  const toggleAnimation = new Animated.Value(isEnabled ? 1 : 0);

  const toggleBackgroundColor = toggleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [disabledColor, enabledColor],
  });

  const toggleCirclePosition = toggleAnimation.interpolate({
    inputRange: [-0.05, 1.05],
    outputRange: [0, 25 * size],
  });

  const handleToggle = () => {
    Animated.timing(toggleAnimation, {
      toValue: isEnabled ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start(({finished}) => {
      finished && toggleSwitch();
    });
  };

  const styles = getStyles(size);

  return (
    <TouchableOpacity onPress={handleToggle}>
      <Animated.View
        style={[styles.container, {backgroundColor: toggleBackgroundColor}]}>
        <Animated.View
          style={[
            styles.toggleCircle,
            {transform: [{translateX: toggleCirclePosition}]},
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const getStyles = (size: number) =>
  StyleSheet.create({
    container: {
      width: 50 * size,
      height: 30 * size,
      borderRadius: 15 * size,
      justifyContent: 'center',
    },
    toggleCircle: {
      width: 25 * size,
      height: 25 * size,
      backgroundColor: '#fff',
      borderRadius: 12.5 * size,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      fontSize: 30,
    },
  });

export default SwitchUI;
