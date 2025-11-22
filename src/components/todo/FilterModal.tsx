import React, { useState } from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import { TextComp, ButtonComp, SvgElement, Scrollable, DateTimePickerComp } from '@/components'
import { CrossIcon } from '@/assets/icons'
import commonStyles from '@/styles/commonStyles'
import { commonColors, moderateScale } from '@/styles'
import fontFamily from '@/styles/fontFamily'
import { FilterOptions, FilterModalProps } from './types'

export type { FilterOptions }

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
  currentFilters,
}) => {
  const [dateFilter, setDateFilter] = useState(currentFilters?.dateFilter)
  const [timeFilter, setTimeFilter] = useState(currentFilters?.timeFilter)

  const handleApply = () => {
    onApply({ dateFilter, timeFilter })
    onClose()
  }

  const handleClear = () => {
    setDateFilter('')
    setTimeFilter('')
    onApply({ dateFilter: '', timeFilter: '' })
    onClose()
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TextComp text="Filter Todos" style={styles.title} />
            <SvgElement
              name={CrossIcon}
              onPress={onClose} />
          </View>

          <Scrollable containerStyle={styles.content}>
            <View style={styles.filterSection}>
              <TextComp text="Filter by Date" style={styles.label} />
              <DateTimePickerComp
                value={dateFilter}
                onChange={setDateFilter}
                mode="date"
                placeholder="Select date"
              />
            </View>

            <View style={styles.filterSection}>
              <TextComp text="Filter by Time" style={styles.label} />
              <DateTimePickerComp
                value={timeFilter}
                onChange={setTimeFilter}
                mode="time"
                placeholder="Select time"
              />
            </View>
          </Scrollable>

          <View style={styles.footer}>
            <ButtonComp
              title="Clear"
              onPress={handleClear}
              style={styles.clearButton}
            />
            <ButtonComp
              title="Apply Filters"
              onPress={handleApply}
              style={styles.applyButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default FilterModal

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: commonColors.blackOpacity70,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: commonColors.bgColor,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    maxHeight: '80%',
  },
  header: {
    ...commonStyles.rowJustify,
    padding: moderateScale(20),
    borderBottomWidth: 1,
    borderBottomColor: commonColors.gray,
  },
  title: {
    fontSize: moderateScale(20),
    fontFamily: fontFamily.bold,
  },
  content: {
    padding: moderateScale(20),
  },
  filterSection: {
    marginBottom: moderateScale(5),
  },
  label: {
    fontSize: moderateScale(14),
    fontFamily: fontFamily.semiBold,
    marginBottom: moderateScale(8),
  },
  footer: {
    flexDirection: 'row',
    gap: moderateScale(12),
    padding: moderateScale(20),
    borderTopWidth: 1,
    borderTopColor: commonColors.gray,
  },
  clearButton: {
    flex: 1,
  },
  applyButton: {
    flex: 2,
  },
})