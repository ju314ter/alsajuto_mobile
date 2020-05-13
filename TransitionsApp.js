import React, { Component } from 'react'
import { Animated, Easing } from 'react-native'

const SlideFromBottom = (index, position, height) => {
  const translateY = position.interpolate({
    inputRange: [index - 1, index],
    outputRange: [height, 0]
  })

  return { transform: [{ translateY }] }
}

export const TransitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: (sceneProps) => {
      const { layout, position, scene } = sceneProps

      // const width = layout.initWidth
      const height = layout.initHeight
      const { index, route } = scene
      const params = route.params || {}
      const transition = params.transition || 'default'

      return {
        default: SlideFromBottom(index, position, height)
      }[transition]
    }
  }
}
