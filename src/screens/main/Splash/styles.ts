import { StyleSheet } from 'react-native'
import commonStyles from '@/styles/commonStyles'
import { commonColors } from '@/styles'

export const styles = StyleSheet.create({
  container: {
    ...commonStyles.centerContent,
    backgroundColor: commonColors.bgColor
  },
  image: {
    width: '50%',
    height: '50%',
  },
})