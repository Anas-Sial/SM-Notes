import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import SvgElement from './SvgElement'
import { BackArrowIcon, EditIcon, DeleteIcon } from '@/assets/icons'
import TextComp from './TextComp'
import { moderateScale } from '@/styles/scaling'
import fontFamily from '@/styles/fontFamily'
import commonStyles from '@/styles/commonStyles'
import { HeaderProps } from './types';

const Header = ({ title, onEditPress, onDeletePress }: HeaderProps) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={commonStyles.rowJustify}>
            <View style={styles.container}>
                <SvgElement name={BackArrowIcon} />
                <TextComp style={styles.backButton}>{title}</TextComp>
            </View>
            <View style={styles.actionsContainer}>
                {onEditPress && (
                    <SvgElement name={EditIcon} onPress={onEditPress} />
                )}
                {onDeletePress && (
                    <SvgElement name={DeleteIcon} onPress={onDeletePress} />
                )}
            </View>
        </TouchableOpacity>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(8)
    },
    backButton: {
        fontSize: moderateScale(18),
        fontFamily: fontFamily.medium,
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(12)
    }
})