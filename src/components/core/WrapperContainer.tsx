import React, { memo } from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { commonColors } from '@/styles/colors'
import { WrapperContainerProps } from './types'

const WrapperContainer: React.FC<WrapperContainerProps> = ({
    children,
    style,
    ...safeAreaProps
}) => {
    return (
        <SafeAreaView
            style={[styles.container, style]}
            {...safeAreaProps}
        >
            <StatusBar barStyle="light-content" backgroundColor={commonColors.white} />
            {children}
        </SafeAreaView>
    )
}

export default memo(WrapperContainer)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonColors.bgColor,
    }
})