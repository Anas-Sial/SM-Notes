import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'
import { LoaderIndicatorProps, TextComp } from '.'
import { commonColors, moderateScale } from '@/styles'
import commonStyles from '@/styles/commonStyles'
import fontFamily from '@/styles/fontFamily'


const LoaderIndicator = ({ title = 'Loading todos...', color = commonColors.white, size = 'large' }: LoaderIndicatorProps) => {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size={size} color={color} />
            <TextComp style={styles.loadingText} >
                {title}
            </TextComp>
        </View>
    )
}

export default LoaderIndicator

const styles = StyleSheet.create({
    loadingContainer: {
        ...commonStyles.centerContent,
        paddingVertical: moderateScale(40),
    },
    loadingText: {
        fontSize: moderateScale(16),
        fontFamily: fontFamily.medium,
        marginTop: moderateScale(12),
    },
})