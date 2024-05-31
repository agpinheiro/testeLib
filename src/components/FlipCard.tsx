import React, { ReactNode, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated, ViewStyle, DimensionValue } from 'react-native';

interface Props {
	containerStyle?: ViewStyle;
	containerFront: ViewStyle;
	containerBack: ViewStyle;
	size: [DimensionValue, DimensionValue];
	contentFront: ReactNode;
	contentBack: ReactNode;
	isFlipped?: (value: boolean) => void;
	isVertical?: boolean;
}

const FlipCard: React.FC<Props> = ({
	containerStyle,
	containerFront,
	contentBack,
	containerBack,
	contentFront,
	size = ['auto', 'auto'],
	isFlipped,
	isVertical
}) => {
	const [flipped, setFlipped] = useState(false);
	const animatedValue = useRef(new Animated.Value(0)).current;

	const frontInterpolate = animatedValue.interpolate({
		inputRange: [0, 180],
		outputRange: ['0deg', '180deg'],
	});

	const backInterpolate = animatedValue.interpolate({
		inputRange: [0, 180],
		outputRange: ['180deg', '360deg'],
	});

	const frontAnimatedStyle = {
		transform: [isVertical ? { rotateX: frontInterpolate } : { rotateY: frontInterpolate }],
	};

	const backAnimatedStyle = {
		transform: [isVertical ? { rotateX: backInterpolate } : { rotateY: backInterpolate }],
	};

	const flipCard = () => {
		if (flipped) {
			Animated.spring(animatedValue, {
				toValue: 0,
				friction: 8,
				tension: 10,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.spring(animatedValue, {
				toValue: 180,
				friction: 8,
				tension: 10,
				useNativeDriver: true,
			}).start();
		}
		isFlipped && isFlipped(!flipped)
		setFlipped(!flipped);
	};

	return (
		<View>
			<TouchableWithoutFeedback onPress={flipCard}>
				<View>
					<Animated.View style={[styles.card, frontAnimatedStyle, containerFront, { width: size[0], height: size[1] }, containerStyle]}>
						{contentFront}
					</Animated.View>
					<Animated.View style={[styles.card, styles.back, backAnimatedStyle, containerBack, { width: size[0], height: size[1] }, containerStyle]}>
						{contentBack}
					</Animated.View>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		alignSelf: 'center',
		position: 'absolute',
		backfaceVisibility: 'hidden',
	},
	back: {
		transform: [{ rotateY: '180deg' }],
	}
});

export default FlipCard;
