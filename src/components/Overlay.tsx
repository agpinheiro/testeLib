import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions, Easing, LayoutChangeEvent } from 'react-native';

interface OverlayProps {
    children?: React.ReactNode;
    visible: boolean;
    setVisible: (value: boolean) => void;
    orientation: 'left' | 'right' | 'top' | 'bottom';
    duration?: number
}

const { height } = Dimensions.get('window');

const Overlay: React.FC<OverlayProps> = ({ children, visible, setVisible, orientation = 'top', duration = 300 }) => {
    const visibleAnimation = useRef(new Animated.Value(0)).current;
    const [viewSize, setViewSize] = useState({ width: 0, height: 0 });
    const animation = {
        top: {
            initial: -viewSize.height + 100,
            final: height * 0.5 - viewSize.height / 2,
        },
        left: {
            initial: -viewSize.width * 1.5,
            final: 0
        },
        right: {
            initial: viewSize.width * 1.5,
            final: 0
        },
        bottom: {
            initial: height + 100,
            final: height * 0.5 - viewSize.height / 2
        },
    };

    useEffect(() => {
        handleAnimation(visible ? 1 : 0);
    }, [visible]);

    const handleBackgroundPress = useCallback(() => {
        handleAnimation(0);
    }, [])

    const handleAnimation = useCallback((value: 0 | 1) => {
        Animated.timing(visibleAnimation, {
            toValue: value,
            duration: duration,
            useNativeDriver: true,
            easing: Easing.linear
        }).start(({ finished }) => {
            finished && value === 0 && setVisible(false);
        });
    }, [duration]);

    const onViewLayout = useCallback((event: LayoutChangeEvent) => {
        const { width: w, height: h } = event.nativeEvent.layout;
        setViewSize({ width: w, height: h });
    }, []);

    const handleTransform = orientation === 'left' || orientation === 'right' ?
        [{ translateX: visibleAnimation.interpolate({ inputRange: [0, 1], outputRange: [animation[orientation].initial, animation[orientation].final] }) }, { translateY: height * 0.5 - viewSize.height * 0.5 }] :
        [{ translateY: visibleAnimation.interpolate({ inputRange: [0, 1], outputRange: [animation[orientation].initial, animation[orientation].final] }) }];

    return (
        <Modal visible={visible} transparent style={styles.containerOverlay}>
            <Animated.View onTouchEnd={handleBackgroundPress} style={[styles.containerView, { opacity: visibleAnimation.interpolate({ inputRange: [0, 1], outputRange: [0, 0.6] }) }]} />
            <Animated.View style={[{ transform: handleTransform }, styles.animationContainer]}>
                <View onLayout={onViewLayout}>
                    {children}
                </View>
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    containerOverlay: {
        flex: 1,
    },
    containerView: {
        flex: 1,
        backgroundColor: 'black'
    },
    animationContainer: {
        position: 'absolute',
        alignSelf: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        width: 300,
        height: 200,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeButtonText: {
        color: 'black',
        fontSize: 16,
    },
});

export default Overlay;
