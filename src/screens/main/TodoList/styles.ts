import { StyleSheet } from 'react-native'
import { moderateScale } from '@/styles';
import commonStyles from '@/styles/commonStyles';
import fontFamily from '@/styles/fontFamily';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: moderateScale(15),
    },
    header: {
        ...commonStyles.rowJustify,
        marginBottom: moderateScale(20),
    },
    title: {
        fontSize: moderateScale(24),
        fontFamily: fontFamily.bold,
    },
    listContent: {
        paddingBottom: moderateScale(80),
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
})