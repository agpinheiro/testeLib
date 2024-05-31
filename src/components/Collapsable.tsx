import React, { useCallback, useEffect, useRef, useState } from 'react'
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
  const [measuredHeight, setMeasuredHeight] = useState<number | null>(null)
  const viewRef = useRef<View>(null)

  const heightCollapsable = collapsableAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, measuredHeight || 0],
  })

  const handleAnimation = useCallback((value: 0 | 1) => {
    collapsed.current = !collapsed.current;
    Animated.timing(collapsableAnimation, {
      toValue: value,
      duration: duration,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(() => {
      onCurrentValue && onCurrentValue(collapsed.current)
    });
  }, [duration, measuredHeight, onCurrentValue, collapsableAnimation]);

  const callAnimation = () => {
    collapsed.current ? handleAnimation(0) : handleAnimation(1)
  }

  const onContentLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    setMeasuredHeight(Math.round(height))
  }

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        onPress={callAnimation}
        style={buttonTitleStyle}
      >
        {title}
      </TouchableOpacity>
      {measuredHeight !== null ? (
        <Animated.View style={{ height: heightCollapsable, overflow: 'hidden' }}>
          <View>
            {content}
          </View>
        </Animated.View>
      ) : (
        <View
          ref={viewRef}
          style={{ position: 'absolute', opacity: 0 }}
          onLayout={onContentLayout}
        >
          {content}
        </View>
      )}
    </View>
  )
}

export default Collapsable
