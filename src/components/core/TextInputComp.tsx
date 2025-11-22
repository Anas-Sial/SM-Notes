import React, { memo } from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native'
import fontFamily from '@/styles/fontFamily'
import { moderateScale } from '@/styles/scaling'
import { commonColors } from '@/styles/colors'
import TextComp from './TextComp'
import commonStyles from '@/styles/commonStyles'
import { TextInputCompProps } from './types'

const TextInputComp: React.FC<TextInputCompProps> = ({
    containerStyle,
    inputStyle,
    error,
    touched,
    placeholder,
    rightIcon,
    onRightIconPress,
    label,
    required,
    errorStyle,
    labelStyle,
    wrapperStyle,
    ...props
}) => {
    const hasError = !!error && touched
    const errorMessage = typeof error === 'string' ? error : ''

    return (
        <View style={[styles.wrapper, wrapperStyle]}>
            {/* Label with required indicator */}
            {label && (
                <View style={styles.labelContainer}>
                    <TextComp style={[styles.label, labelStyle]}>
                        {label}
                    </TextComp>
                    {required && <TextComp style={styles.required}>*</TextComp>}
                </View>
            )}

            {/* Input container */}
            <View
                style={[
                    styles.container,
                    hasError && styles.errorContainer,
                    containerStyle,
                ]}
            >
                <TextInput
                    style={[
                        styles.input,
                        hasError && styles.errorInput,
                        inputStyle
                    ]}
                    placeholderTextColor={commonColors.gray400}
                    placeholder={placeholder}
                    textAlign="left"
                    {...props}
                />
                {rightIcon && (
                    <TouchableOpacity
                        onPress={onRightIconPress}
                        disabled={!onRightIconPress}
                    >
                        {rightIcon}
                    </TouchableOpacity>
                )}
            </View>

            {/* Error message */}
            {hasError && errorMessage && (
                <TextComp style={[styles.errorText, errorStyle]}>
                    {errorMessage}
                </TextComp>
            )}
        </View>
    )
}

export default memo(TextInputComp)

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: moderateScale(16),
    },
    labelContainer: {
        flexDirection: 'row',
        marginBottom: moderateScale(8),
    },
    label: {
        fontFamily: fontFamily.medium,
        fontSize: moderateScale(15),
    },
    required: {
        color: commonColors.error,
        marginLeft: moderateScale(2),
        fontFamily: fontFamily.medium,
        fontSize: moderateScale(16),
    },
    container: {
        ...commonStyles.flexRow,
        backgroundColor: commonColors.gray,
        borderWidth: 1,
        borderColor: commonColors.primary,
        borderRadius: moderateScale(7),
        padding: moderateScale(14),
    },
    input: {
        flex: 1,
        fontFamily: fontFamily.regular,
        fontSize: moderateScale(14),
        color: commonColors.white,
        padding: 0,
        margin: 0,
    },
    errorContainer: {
        borderColor: commonColors.error,
    },
    errorInput: {
        color: commonColors.error,
    },
    errorText: {
        fontSize: moderateScale(12),
        color: commonColors.error,
        marginTop: moderateScale(4),
    }
})