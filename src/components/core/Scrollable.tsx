import React, { forwardRef, memo } from 'react'
import { ScrollView, } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ScrollableProps } from './types'

const Scrollable = forwardRef<ScrollView, ScrollableProps>(
    ({ children, hasInput, horizontal, containerStyle, style, onScroll, ...rest }, ref) => {
        if (hasInput) {
            return (
                <KeyboardAwareScrollView
                    ref={ref as any}
                    onScroll={onScroll}
                    overScrollMode="never"
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={containerStyle}
                    horizontal={horizontal}
                    style={style}
                    bounces={false}
                    {...rest}
                >
                    {children}
                </KeyboardAwareScrollView>
            )
        } else {
            return (
                <ScrollView
                    ref={ref}
                    onScroll={onScroll}
                    overScrollMode="never"
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={containerStyle}
                    horizontal={horizontal}
                    bounces={false}
                    style={style}
                    {...rest}
                >
                    {children}
                </ScrollView>
            )
        }
    }
)

export default memo(Scrollable)