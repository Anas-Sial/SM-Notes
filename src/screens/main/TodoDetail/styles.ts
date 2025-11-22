import { moderateScale, verticalScale } from '@/styles'
import fontFamily from '@/styles/fontFamily'
import { commonColors } from '@/styles/colors'
import { StyleSheet } from 'react-native'
import commonStyles from '@/styles/commonStyles'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: moderateScale(16),
    },
    scrollContent: {
        paddingVertical: verticalScale(20),
        gap: verticalScale(15),
    },
    statusBadge: {
        ...commonStyles.flexRowGap,
        alignSelf: 'flex-end',
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(8),
        borderRadius: moderateScale(20),
        marginBottom: verticalScale(10),
    },
    statusCompleted: {
        backgroundColor: commonColors.success,
    },
    statusPending: {
        backgroundColor: commonColors.gray,
        borderWidth: 2,
        borderColor: commonColors.primary,
    },
    statusText: {
        fontSize: moderateScale(14),
        fontFamily: fontFamily.semiBold,
        color: commonColors.white,
    },
    title: {
        fontSize: moderateScale(20),
        fontFamily: fontFamily.bold,
    },
    description: {
        fontSize: moderateScale(16),
        lineHeight: moderateScale(24),
    },
    dateTime: {
        fontSize: moderateScale(14),
        fontFamily: fontFamily.medium,
    },
})
