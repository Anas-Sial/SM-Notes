import { StyleSheet, View } from 'react-native'
import React from 'react'
import TextComp from './TextComp'
import { commonColors, moderateScale } from '@/styles'
import fontFamily from '@/styles/fontFamily'
import commonStyles from '@/styles/commonStyles'
import { EmptyCompProps } from './types'

const EmptyComp = ({ title = 'No todos yet. Add your first todo!' }: EmptyCompProps) => {
    return (
        <View style={commonStyles.centerContent}>
            <TextComp
                style={styles.emptyText}
            >
                {title}
            </TextComp>
        </View>
    )
}

export default EmptyComp

const styles = StyleSheet.create({
    emptyText: {
        fontSize: moderateScale(16),
        fontFamily: fontFamily.medium,
        color: commonColors.white,
    }
})