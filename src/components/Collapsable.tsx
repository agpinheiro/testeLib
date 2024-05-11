import React, { useCallback, useRef, useState } from 'react';
import { Animated, Easing, LayoutChangeEvent, Pressable, StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

interface CollapsableProps {
    title: string;
    titleStyle: StyleProp<TextStyle>;
    content: string;
    contentStyle: StyleProp<TextStyle>;
    containerStyle: StyleProp<ViewStyle>
}

const Collapsable: React.FC<CollapsableProps> = ({ title, content, contentStyle, titleStyle, containerStyle }) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const collapsableAnimation = useRef(new Animated.Value(0)).current;
    const [collapsedHeight, setCollapsedHeight] = useState(10)
    const heightCollapsable = collapsableAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, collapsedHeight],
    })

    const handleAnimation = (value: 0 | 1) => {
        Animated.timing(collapsableAnimation, {
            toValue: value,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.linear
        }).start();
        setIsCollapsed(!isCollapsed)
    };
    const onTextLayout = useCallback((event: LayoutChangeEvent) => {
        const { height: h } = event.nativeEvent.layout;
        setCollapsedHeight(h + 10)
    }, [collapsedHeight]);

    return (
        <View style={containerStyle}>
            <TouchableOpacity onPress={() => isCollapsed ? handleAnimation(0) : handleAnimation(1)} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={titleStyle}>{title}</Text>
                <Text style={titleStyle}>{isCollapsed ? '➖' : '➕'}</Text>
            </TouchableOpacity>
            <Animated.View style={{ overflow: 'hidden', height: heightCollapsable }}>
                <Text onLayout={onTextLayout} style={contentStyle}>{content}</Text>
            </Animated.View>
        </View>
    );
}

export default Collapsable;
