import { commonColors, moderateScale, verticalScale } from '@/styles'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: moderateScale(16),
    },
    scrollStyle: {
        paddingTop: verticalScale(15)
    },
    textArea: {
        flex:1,
        minHeight: moderateScale(100),
        textAlignVertical: 'top',
        color: commonColors.white,
        fontSize: moderateScale(14)
    },
    row: {
        flexDirection: 'row',
        gap: moderateScale(12),
    },
    halfWidth: {
        flex: 1,
    },
    saveButton: {
        marginVertical: moderateScale(20),
    },
})