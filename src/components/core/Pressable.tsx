import React, { forwardRef, memo } from 'react'
import { TouchableOpacity } from 'react-native'
import { PressableProps } from './types'

const Pressable = forwardRef<React.ElementRef<typeof TouchableOpacity>, PressableProps>(
  ({ children, onPress, style, opacity = 0.8, ...props }, ref) => (
    <TouchableOpacity
      ref={ref}
      activeOpacity={opacity}
      style={style}
      onPress={onPress}
      {...props}
    >
      {children}
    </TouchableOpacity>
  )
);

Pressable.displayName = 'Pressable'

export default memo(Pressable)
