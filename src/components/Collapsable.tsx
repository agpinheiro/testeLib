import React, { useCallback, useRef, useState } from 'react'
import {
  Animated,
  Easing,
  type LayoutChangeEvent,
  type StyleProp,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native'

interface CollapsableProps {
  title: React.JSX.Element
  content: React.JSX.Element
  containerStyle?: StyleProp<ViewStyle>
  buttonTitleStyle?: StyleProp<ViewStyle>
  onCurrentValue?: (value: boolean) => void;
  duration?: number;
}

const Collapsable: React.FC<CollapsableProps> = ({
  title,
  content,
  containerStyle,
  buttonTitleStyle,
  onCurrentValue,
  duration = 300,
}) => {
  const collapsed = useRef(false)
  const collapsableAnimation = useRef(new Animated.Value(0)).current
  const [collapsedHeight, setCollapsedHeight] = useState(10)
  const heightCollapsable = collapsableAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, collapsedHeight],
  })

  const handleAnimation = useCallback(async (value: 0 | 1) => {
    collapsed.current = !collapsed.current;
    Animated.timing(collapsableAnimation, {
      toValue: value,
      duration: duration,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(() => {
      onCurrentValue && onCurrentValue(collapsed.current)
    });
  }, [duration]);


  const onTextLayout = (event: LayoutChangeEvent) => {
    setCollapsedHeight(Math.round(event.nativeEvent.layout.height) + 13)
  }


  const callAnimation = async () => {
    collapsed.current ? handleAnimation(0) : handleAnimation(1)
  }


  return (
    <View style={containerStyle}>
      <TouchableOpacity
        onPress={callAnimation}
        style={buttonTitleStyle}
      >
        {title}
      </TouchableOpacity>
      <Animated.View style={{ overflow: 'hidden', height: heightCollapsable }}>
        <View onLayout={onTextLayout}>{content}</View>
      </Animated.View>
    </View>
  )
}

export default Collapsable
