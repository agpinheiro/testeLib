import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    type KeyboardTypeOptions,
    type StyleProp,
    Text,
    TextInput,
    View,
    type ViewStyle,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    ColorValue,
    Animated,
    Easing,
} from 'react-native';
import { getMaskForType, type MaskType } from '../util/masks';

interface InputProps {
    title: string;
    titleColor?: [string, string];
    placeholder?: string;
    borderColor?: ColorValue;
    onChangeText: (string: string) => void;
    onCurrentValue?: (value: string) => void;
    password?: boolean;
    styleContainer?: StyleProp<ViewStyle>;
    message?: string;
    colorMessage?: ColorValue;
    keyboardType?: KeyboardTypeOptions | undefined;
    maxLength?: number;
    capitalize?: 'none' | 'sentences';
    textArea?: boolean;
    mask?: MaskType;
    backgroundColor?: ColorValue;
    textInputColor?: ColorValue;
}

export type Danger = { message: string; active: boolean; danger: boolean };

const { height } = Dimensions.get('screen');

const Input: React.FC<InputProps> = React.memo(({
    onCurrentValue,
    message,
    colorMessage = 'red',
    onChangeText,
    password = false,
    title,
    titleColor = ['#333', '#000'],
    styleContainer,
    keyboardType,
    maxLength,
    capitalize = 'sentences',
    textArea = false,
    borderColor,
    backgroundColor = 'white',
    textInputColor = 'black',
    mask,
}) => {
    const [show, setShow] = useState(password);
    const [currentText, setCurrentText] = useState('');
    const [focus, setFocus] = useState(false);
    const [currentTitleColor, setColor] = useState(titleColor[0]);
    const titleAnimation = useRef(new Animated.Value(0)).current;

    const titleTransformYAnimation = titleAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [height * 0.06 / 2 - 8, -height * 0.02]
    })
    
    const titleTransformXAnimation = titleAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [15, 2]
    })
    const handleInterseptUpdateValue = useCallback((text: string) => {
        if (onCurrentValue) onCurrentValue(text);
        setCurrentText(text);
    }, [onCurrentValue]);

    const handleValue = () => {
        const typeMask = getMaskForType(mask);
        return typeMask(currentText);
    };

    const handleAnimation = useCallback((value: 0 | 1) => {
        Animated.timing(titleAnimation, {
            toValue: value,
            duration: 100,
            useNativeDriver: true,
            easing: Easing.linear
        }).start();
        setColor(titleColor[1])
    }, []);

    const titleStyle = useMemo(() => ({
        ...styles.title,
        color: currentTitleColor,
    }), [currentTitleColor]);

    return (
        <View style={[styleContainer]}>
            <Animated.View style={{
                position: 'absolute',
                transform: [
                    { translateY: titleTransformYAnimation },
                    { translateX: titleTransformXAnimation }
                ],
                zIndex: 10,
            }}>
                <Animated.Text style={titleStyle}>
                    {title}
                </Animated.Text>
            </Animated.View>
            <View style={[styles.containerInput, {
                borderColor: focus ? borderColor : 'transparent',
                height: textArea ? height * 0.12 : height * 0.06,
                backgroundColor: backgroundColor,

            }]}>
                <TextInput
                    onChangeText={handleInterseptUpdateValue}
                    secureTextEntry={show}
                    multiline={textArea}
                    autoCapitalize={capitalize}
                    keyboardType={keyboardType}
                    value={handleValue()}
                    onFocus={() => { setFocus(true); handleAnimation(1); }}
                    maxLength={maxLength}
                    onEndEditing={() => {
                        setFocus(false);
                        onChangeText(currentText);
                    }}
                    style={[styles.textInput, { textAlignVertical: textArea ? 'top' : 'center', color: textInputColor }]}
                />
                {password && currentText.length > 0 && (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setShow(!show)}
                    />
                )}
            </View>
            {!message || <Text style={[styles.messageError, {
                color: colorMessage,

            }]}>{message}</Text>}
        </View>
    );
});

const styles = StyleSheet.create({
    title: {
        alignSelf: 'flex-start',
        fontSize: 14,
        height: height * 0.06,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    containerInput: {
        width: '99%',
        minHeight: height * 0.06,
        margin: 2,
        borderBottomWidth: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        paddingLeft: 15,
        flex: 1,
        fontSize: 14,
        height: '100%',
        padding: 10,
    },
    messageError: {
        marginTop: height * 0.0051,
        marginLeft: 2,
        fontSize: 11,
    },
    button: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        marginRight: 10,
    },
});

export default Input;
