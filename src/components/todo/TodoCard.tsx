import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Pressable, TextComp } from '@/components'
import { CheckIcon, UnCheckIcon } from '@/assets/icons'
import { commonColors } from '@/styles/colors'
import { moderateScale } from '@/styles/scaling'
import fontFamily from '@/styles/fontFamily'
import commonStyles from '@/styles/commonStyles'
import { formatMonthDate } from '@/utils/helper'
import { TodoCardProps } from './types'

const TodoCard: React.FC<TodoCardProps> = ({
  todo,
  isSelected,
  selectionMode,
  onPress,
  onLongPress,
  onToggleComplete,
}) => {

  return (
    <Pressable
      style={[
        styles.todoCard,
        isSelected && styles.todoCardSelected,
        todo.completed && styles.todoCardCompleted,
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}>

      {selectionMode && (
        <View>
          {isSelected && (
            <CheckIcon />
          )}
        </View>
      )}

      <View style={styles.headerRow}>
        <TextComp
          text={todo.name}
          style={[
            styles.todoName,
            todo.completed && styles.todoNameCompleted,
          ]}
          numberOfLines={2}
        />

        {!selectionMode && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onToggleComplete}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {todo.completed ? (
              <CheckIcon height={moderateScale(20)} />
            ) : (
              <UnCheckIcon height={moderateScale(20)} />
            )}
          </TouchableOpacity>
        )}
      </View>

      <TextComp
        text={todo.description}
        style={[
          styles.todoDescription,
          todo.completed && styles.todoDescriptionCompleted,
        ]}
        numberOfLines={3}
      />

      <View style={styles.todoFooter}>
        <TextComp text={formatMonthDate(todo.dueDate)} style={styles.dueDate} />
        <TextComp text={todo.dueTime} style={styles.dueDate} />
      </View>
    </Pressable>
  );
};

export default TodoCard

const styles = StyleSheet.create({
  todoCard: {
    width: '48%',
    backgroundColor: commonColors.gray,
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    marginBottom: moderateScale(12),
    borderWidth: 2,
    borderColor: 'transparent',
  },
  todoCardSelected: {
    borderColor: commonColors.primary,
    backgroundColor: commonColors.bgColor,
  },
  todoCardCompleted: {
    borderColor: commonColors.success,
    opacity: 0.85,
  },
  headerRow: {
    ...commonStyles.flexJustifyStart,
    marginBottom: moderateScale(6),
  },
  todoName: {
    flex: 1,
    fontSize: moderateScale(16),
    fontFamily: fontFamily.semiBold,
    marginRight: moderateScale(8),
  },
  todoNameCompleted: {
    textDecorationLine: 'line-through',
    color: commonColors.primary,
  },
  iconButton: {
    padding: moderateScale(2),
  },
  todoDescription: {
    fontSize: moderateScale(12),
    marginBottom: moderateScale(8),
    minHeight: moderateScale(30),
    opacity: 0.8,
  },
  todoDescriptionCompleted: {
    opacity: 0.5,
  },
  todoFooter: {
    ...commonStyles.rowJustify,
    borderTopWidth: 1,
    borderTopColor: commonColors.primary,
    paddingTop: moderateScale(8),
  },
  dueDate: {
    fontSize: moderateScale(11),
    fontFamily: fontFamily.medium,
  },
})