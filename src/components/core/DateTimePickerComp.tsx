import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Modal } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import TextComp from './TextComp'
import { commonColors, moderateScale } from '@/styles'
import fontFamily from '@/styles/fontFamily'
import commonStyles from '@/styles/commonStyles'
import { DateTimePickerCompProps } from './types'
import { isAndroid, isIOS } from '@/utils/helper'

const DateTimePickerComp: React.FC<DateTimePickerCompProps> = ({
    value,
    onChange,
    mode,
    containerStyle,
    inputStyle,
    error,
    touched,
    placeholder,
    label,
    required,
    errorStyle,
    labelStyle,
    wrapperStyle,
    minimumDate,
    maximumDate,
}) => {
    const [showPicker, setShowPicker] = useState(false)
    const [tempValue, setTempValue] = useState<Date | null>(null)
    const hasError = !!error && touched;
    const errorMessage = typeof error === 'string' ? error : ''

    const isDateMode = mode === 'date'
    const defaultPlaceholder = isDateMode ? 'Select date' : 'Select time'
    const modalTitle = isDateMode ? 'Select Date' : 'Select Time'

    const parseValue = (valueString?: string): Date => {
        const now = new Date()
        if (!valueString) return now

        if (isDateMode) {
            const parsed = new Date(valueString)
            return isNaN(parsed.getTime()) ? now : parsed
        } else {
            const [hours, minutes] = valueString.split(':').map(Number)
            if (isNaN(hours) || isNaN(minutes)) return now
            now.setHours(hours, minutes, 0, 0)
            return now
        }
    };

    const formatValue = (valueString?: string): string => {
        if (!valueString) return ''

        if (isDateMode) {
            const date = parseValue(valueString)
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0')
            return `${year}-${month}-${day}`
        } else {
            return valueString
        }
    }

    const handleValueChange = (event: any, selectedValue?: Date) => {
        if (isAndroid) {
            setShowPicker(false);
            if (selectedValue && event.type === 'set') {
                if (isDateMode) {
                    const year = selectedValue.getFullYear()
                    const month = String(selectedValue.getMonth() + 1).padStart(2, '0')
                    const day = String(selectedValue.getDate()).padStart(2, '0')
                    onChange(`${year}-${month}-${day}`)
                } else {
                    const hours = String(selectedValue.getHours()).padStart(2, '0')
                    const minutes = String(selectedValue.getMinutes()).padStart(2, '0')
                    onChange(`${hours}:${minutes}`);
                }
            }
        } else {
            if (selectedValue) {
                setTempValue(selectedValue)
            }
        }
    }

    const handlePress = () => {
        setTempValue(parseValue(value))
        setShowPicker(true)
    }

    const handleConfirm = () => {
        if (tempValue) {
            if (isDateMode) {
                const year = tempValue.getFullYear()
                const month = String(tempValue.getMonth() + 1).padStart(2, '0')
                const day = String(tempValue.getDate()).padStart(2, '0')
                onChange(`${year}-${month}-${day}`)
            } else {
                const hours = String(tempValue.getHours()).padStart(2, '0')
                const minutes = String(tempValue.getMinutes()).padStart(2, '0')
                onChange(`${hours}:${minutes}`)
            }
        }
        setShowPicker(false)
    }

    const handleCancel = () => {
        setShowPicker(false)
        setTempValue(null)
    }

    return (
        <View style={[styles.wrapper, wrapperStyle]}>
            {label && (
                <View style={styles.labelContainer}>
                    <TextComp style={[styles.label, labelStyle]}>
                        {label}
                    </TextComp>
                    {required && <TextComp style={styles.required}>*</TextComp>}
                </View>
            )}

            <TouchableOpacity
                onPress={handlePress}
                style={[
                    styles.container,
                    hasError && styles.errorContainer,
                    containerStyle,
                ]}
                activeOpacity={0.7}
            >
                <TextComp
                    style={[
                        styles.input,
                        !value && styles.placeholderText,
                        hasError && styles.errorInput,
                        inputStyle,
                    ]}
                >
                    {value ? formatValue(value) : (placeholder || defaultPlaceholder)}
                </TextComp>
            </TouchableOpacity>

            {hasError && errorMessage && (
                <TextComp style={[styles.errorText, errorStyle]}>
                    {errorMessage}
                </TextComp>
            )}

            {isIOS && (
                <Modal
                    visible={showPicker}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={handleCancel}
                >
                    <TouchableOpacity
                        style={styles.modalOverlay}
                        activeOpacity={1}
                        onPress={handleCancel}
                    >
                        <View style={styles.modalContent}>
                            <View style={styles.pickerHeader}>
                                <TouchableOpacity onPress={handleCancel}>
                                    <TextComp style={styles.headerButton}>Cancel</TextComp>
                                </TouchableOpacity>
                                <TextComp style={styles.headerTitle}>{modalTitle}</TextComp>
                                <TouchableOpacity onPress={handleConfirm}>
                                    <TextComp style={[styles.headerButton, styles.confirmButton]}>Done</TextComp>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.pickerContainer}>
                                <DateTimePicker
                                    value={tempValue || parseValue(value)}
                                    mode={mode}
                                    display="spinner"
                                    onChange={handleValueChange}
                                    minimumDate={isDateMode ? minimumDate : undefined}
                                    maximumDate={isDateMode ? maximumDate : undefined}
                                    is24Hour={!isDateMode}
                                    style={{ backgroundColor: commonColors.gray }}
                                    textColor={commonColors.white}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
            )}

            {isAndroid && showPicker && (
                <DateTimePicker
                    value={parseValue(value)}
                    mode={mode}
                    display="default"
                    onChange={handleValueChange}
                    minimumDate={isDateMode ? minimumDate : undefined}
                    maximumDate={isDateMode ? maximumDate : undefined}
                    is24Hour={!isDateMode}
                />
            )}
        </View>
    )
}

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
    },
    placeholderText: {
        color: commonColors.gray400,
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
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: commonColors.gray,
        borderTopLeftRadius: moderateScale(20),
        borderTopRightRadius: moderateScale(20),
        overflow: 'hidden',
        alignItems: 'center'
    },
    pickerHeader: {
        ...commonStyles.rowJustify,
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(16),
        backgroundColor: commonColors.gray,
        borderBottomWidth: 1,
        borderBottomColor: commonColors.primary,
        width: '100%'
    },
    headerButton: {
        fontSize: moderateScale(16),
        fontFamily: fontFamily.medium,
        color: commonColors.white,
        minWidth: moderateScale(60),
    },
    confirmButton: {
        textAlign: 'right',
    },
    headerTitle: {
        fontSize: moderateScale(16),
        fontFamily: fontFamily.semiBold,
        color: commonColors.white,
    },
    pickerContainer: {
        backgroundColor: commonColors.gray,
        paddingVertical: moderateScale(10),
    },
});

export default React.memo(DateTimePickerComp);
