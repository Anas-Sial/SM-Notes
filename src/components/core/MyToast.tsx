import React from 'react'
import { StyleSheet } from 'react-native'
import { BaseToast, BaseToastProps } from 'react-native-toast-message'

import { TOAST_COLOR_SCHEMES } from '@/utils/toast/constants'
import { ToastTypeValue } from '@/utils/toast/types'
import fontFamily from '@/styles/fontFamily'
import { moderateScale } from '@/styles/scaling'

interface MyToastProps extends BaseToastProps {
  type: ToastTypeValue
}

const MyToast: React.FC<MyToastProps> = ({ type, ...props }) => {
  const colorScheme = TOAST_COLOR_SCHEMES[type] || TOAST_COLOR_SCHEMES.customSuccess

  return (
    <BaseToast
      {...props}
      style={[
        styles.container,
        {
          borderLeftColor: colorScheme.borderColor,
          backgroundColor: colorScheme.backgroundColor,
        },
      ]}
      contentContainerStyle={styles.contentContainer}
      text1Style={[
        styles.title,
        { color: colorScheme.textColor },
      ]}
      text2Style={[
        styles.message,
        { color: colorScheme.textColor },
      ]}
      text1NumberOfLines={2}
      text2NumberOfLines={3}
    />
  )
}

export default MyToast

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: moderateScale(5),
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(12),
    minHeight: moderateScale(60),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    paddingHorizontal: moderateScale(10),
  },
  title: {
    fontSize: moderateScale(12),
    fontFamily: fontFamily.semiBold,
  },
  message: {
    fontSize: moderateScale(10),
    fontFamily: fontFamily.regular,
    marginTop: moderateScale(4),
  },
})