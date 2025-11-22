import React, { memo } from 'react'
import { Text, StyleSheet } from 'react-native'
import { moderateScale } from '@/styles/scaling'
import fontFamily from '@/styles/fontFamily'
import { commonColors } from '@/styles/colors'
import { TextCompProps } from './types'

const TextComp: React.FC<TextCompProps> = ({
    text,
    style,
    children,
    ...props
}) => {
    return (
        <Text style={[styles.text, style]} {...props}>
            {text || children}
        </Text>
    )
}

export default memo(TextComp)

const styles = StyleSheet.create({
    text: {
        fontFamily: fontFamily.regular,
        fontSize: moderateScale(14),
        color: commonColors.white,
        textAlign: 'left',
    },
})

