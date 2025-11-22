import React, { useState } from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import { TextComp, ButtonComp, Scrollable, SvgElement, Pressable } from '@/components'
import { commonColors } from '@/styles/colors'
import { moderateScale, verticalScale } from '@/styles/scaling'
import fontFamily from '@/styles/fontFamily'
import commonStyles from '@/styles/commonStyles'
import { CrossIcon } from '@/assets/icons'

export type SortField = 'name' | 'date' | 'time' | 'none'
export type SortOrder = 'asc' | 'desc'

export interface SortOptions {
  field: SortField;
  order: SortOrder;
}

interface SortModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (sort: SortOptions) => void;
  currentSort: SortOptions;
}

const SortModal: React.FC<SortModalProps> = ({
  visible,
  onClose,
  onApply,
  currentSort,
}) => {
  const [sortField, setSortField] = useState<SortField>(currentSort.field)
  const [sortOrder, setSortOrder] = useState<SortOrder>(currentSort.order)

  const handleApply = () => {
    onApply({ field: sortField, order: sortOrder });
    onClose();
  }

  const handleClear = () => {
    setSortField('none')
    setSortOrder('asc')
    onApply({ field: 'none', order: 'asc' })
    onClose()
  };

  const sortOptions: { label: string; value: SortField }[] = [
    { label: 'None', value: 'none' },
    { label: 'Name', value: 'name' },
    { label: 'Date', value: 'date' },
    { label: 'Time', value: 'time' },
  ]

  const orderOptions: { label: string; value: SortOrder }[] = [
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' },
  ]

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TextComp text="Sort Todos" style={styles.title} />
            <SvgElement
              name={CrossIcon}
              onPress={onClose} />
          </View>

          <Scrollable containerStyle={styles.content}>
            <View style={styles.section}>
              <TextComp text="Sort by" style={styles.label} />
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: verticalScale(5) }}>
                {sortOptions.map(option => (
                  <Pressable
                    key={option.value}
                    style={styles.optionButton}
                    onPress={() => setSortField(option.value)}>
                    <View style={styles.radioButton}>
                      {sortField === option.value && (
                        <View style={styles.radioButtonInner} />
                      )}
                    </View>
                    <TextComp
                      text={option.label}
                      style={styles.optionText}
                    />
                  </Pressable>
                ))}
              </View>
            </View>

            {sortField !== 'none' && (
              <View style={styles.section}>
                <TextComp text="Order" style={styles.label} />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: verticalScale(5) }}>
                  {orderOptions.map(option => (
                    <Pressable
                      key={option.value}
                      style={styles.optionButton}
                      onPress={() => setSortOrder(option.value)}>
                      <View style={styles.radioButton}>
                        {sortOrder === option.value && (
                          <View style={styles.radioButtonInner} />
                        )}
                      </View>
                      <TextComp
                        text={option.label}
                        style={styles.optionText}
                      />
                    </Pressable>
                  ))}
                </View>
              </View>
            )}
          </Scrollable>

          <View style={styles.footer}>
            <ButtonComp
              title="Clear"
              onPress={handleClear}
              style={styles.clearButton}
            />
            <ButtonComp
              title="Apply Sort"
              onPress={handleApply}
              style={styles.applyButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default SortModal

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
  section: {
    marginBottom: moderateScale(24),
  },
  label: {
    fontSize: moderateScale(16),
    fontFamily: fontFamily.semiBold,
    marginBottom: moderateScale(12),
  },
  optionButton: {
    ...commonStyles.flexRowGap,
    width: '45%',
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(8),
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionText: {
    fontSize: moderateScale(14),
    fontFamily: fontFamily.medium,
  },
  radioButton: {
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    borderWidth: 2,
    borderColor: commonColors.primary,
    ...commonStyles.center,
    backgroundColor: 'transparent',
  },
  radioButtonInner: {
    width: moderateScale(12),
    height: moderateScale(12),
    borderRadius: moderateScale(6),
    backgroundColor: commonColors.primary,
  },
  footer: {
    flexDirection: 'row',
    gap: moderateScale(12),
    padding: moderateScale(20),
    borderTopWidth: moderateScale(1),
    borderTopColor: commonColors.gray,
  },
  clearButton: {
    flex: 1,
  },
  applyButton: {
    flex: 2,
  },
})