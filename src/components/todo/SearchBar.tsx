import React from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { SvgElement } from '@/components'
import { commonColors } from '@/styles/colors'
import { moderateScale, scale } from '@/styles/scaling'
import fontFamily from '@/styles/fontFamily'
import { CrossIcon, FilterIcon, SearchIcon, SortIcon } from '@/assets/icons'
import commonStyles from '@/styles/commonStyles'
import { SearchBarProps } from './types'

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onFilterPress,
  onSortPress,
  placeholder = 'Search todos...',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SvgElement
          name={SearchIcon}
          style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={commonColors.gray200}
        />
        {value?.length > 0 && (
          <SvgElement
            name={CrossIcon}
            onPress={() => onChangeText('')}
            style={styles.clearIcon} />
        )}
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.iconButton} onPress={onFilterPress}>
          <FilterIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={onSortPress}>
          <SortIcon />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...commonStyles.flexRow,
    gap: scale(8),
    marginBottom: moderateScale(16),
  },
  searchContainer: {
    flex: 1,
    ...commonStyles.flexRow,
    backgroundColor: commonColors.gray,
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(8),
    borderWidth: 2,
    borderColor: commonColors.primary,
  },
  searchIcon: {
    marginRight: moderateScale(8),
  },
  input: {
    flex: 1,
    fontSize: moderateScale(14),
    fontFamily: fontFamily.regular,
    color: commonColors.white,
    padding: 0,
  },
  clearIcon: {
    marginLeft: moderateScale(8),
  },
  actionButtons: {
    flexDirection: 'row',
    gap: moderateScale(8),
  },
  iconButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    backgroundColor: commonColors.gray,
    borderRadius: moderateScale(12),
    ...commonStyles.center,
    borderWidth: 2,
    borderColor: commonColors.primary,
  }
})