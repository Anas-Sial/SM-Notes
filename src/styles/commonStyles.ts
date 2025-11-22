
import { StyleSheet } from 'react-native'
import { scale } from './scaling'
import { commonColors } from './colors'

const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonColors.bgColor,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowJustify: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowStartJustify: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    columnJustify: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    columnCenter: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flexRowWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    flexRowGap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(5),
    },
    flexRowGap1: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(5),
    },
    flexRowStart: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    flexColumn: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    flexJustifyStart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
})

export default commonStyles