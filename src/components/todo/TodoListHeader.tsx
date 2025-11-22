import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Pressable, TextComp } from '../core'
import { commonColors, moderateScale } from '@/styles'
import commonStyles from '@/styles/commonStyles'
import fontFamily from '@/styles/fontFamily'
import { TodoListHeaderProps } from './types'

const TodoListHeader = ({ selectedIds, onCancel, onDelete }: TodoListHeaderProps) => {
    return (
        <View style={styles.selectionHeader}>
            <TextComp
                style={styles.selectionCount}
            >
                {`${selectedIds.size} selected`}
            </TextComp>
            <View style={styles.selectionActions}>
                <Pressable onPress={onCancel}>
                    <TextComp style={styles.cancelButton}>
                        Cancel
                    </TextComp>
                </Pressable>
                <Pressable
                    onPress={onDelete}
                    disabled={selectedIds.size === 0}
                >
                    <TextComp
                        style={[
                            styles.deleteButton,
                            selectedIds.size === 0 && styles.deleteButtonDisabled
                        ]}
                    >
                        Delete
                    </TextComp>
                </Pressable>
            </View>
        </View>
    )
}

export default TodoListHeader

const styles = StyleSheet.create({
    selectionHeader: {
        flex: 1,
        ...commonStyles.rowJustify,
    },
    selectionCount: {
        fontSize: moderateScale(18),
        fontFamily: fontFamily.semiBold,
    },
    selectionActions: {
        ...commonStyles.flexRow,
        gap: moderateScale(16),
    },
    cancelButton: {
        fontSize: moderateScale(16),
        fontFamily: fontFamily.medium,
    },
    deleteButton: {
        fontSize: moderateScale(16),
        fontFamily: fontFamily.medium,
        color: commonColors.error,
    },
    deleteButtonDisabled: {
        opacity: 0.5,
    },
})