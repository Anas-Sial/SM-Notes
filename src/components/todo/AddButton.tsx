import { StyleSheet } from 'react-native'
import React, { memo } from 'react'
import { Pressable } from '../core'
import { PlusIcon } from '@/assets/icons'
import { commonColors, moderateScale, scale, verticalScale } from '@/styles'
import commonStyles from '@/styles/commonStyles'
import { AddButtonProps } from './types'

const AddButton = ({ onPress }: AddButtonProps) => {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <PlusIcon height={moderateScale(35)} />
        </Pressable>
    )
}

export default memo(AddButton)

const styles = StyleSheet.create({
    container: {
        height: verticalScale(50),
        width: verticalScale(50),
        borderRadius: verticalScale(50 / 2),
        backgroundColor: commonColors.primary,
        position: 'absolute',
        bottom: verticalScale(30),
        right: scale(15),
        ...commonStyles.center,
        elevation: 6,
        shadowColor: commonColors.primary,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    }
})