import React, {Component} from 'react'
import {Animated, Easing} from 'react-native'

let SlideFromRight = (index, position, width) => {
    const translateX = position.interpolate({
        inputRange: [index -1, index],
        outputRange: [width, 0]
    })

    return { transform : [ { translateX }]}
}

export const TransitionConfiguration = () => {
    console.log('transitionning')
    return {
        transitionSpec: {
            duration: 1750,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: (sceneProps) => {
            const { layout, position, scene } = sceneProps;

            const width = layout.initWidth;
            const height = layout.initHeight;
            const {index, route} = scene;
            const params = route.params || {};
            const transition = param.transition || 'default';

            return {
                default: SlideFromRight(index, position, width),
            }[transition];

        }
    }
}