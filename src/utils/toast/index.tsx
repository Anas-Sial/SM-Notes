import React from 'react';
import Toast, { ToastShowParams, BaseToastProps } from 'react-native-toast-message';

import MyToast from '@/components/core/MyToast';
import { TOAST_TYPES, TOAST_DEFAULTS, TOAST_MESSAGES } from './constants';
import { ToastTypeValue, ToastOptions } from './types';

export const toastConfig: Record<ToastTypeValue, (props: BaseToastProps) => React.ReactElement> = {
  [TOAST_TYPES.SUCCESS]: (props) => <MyToast type={TOAST_TYPES.SUCCESS} {...props} />,
  [TOAST_TYPES.ERROR]: (props) => <MyToast type={TOAST_TYPES.ERROR} {...props} />,
  [TOAST_TYPES.WARNING]: (props) => <MyToast type={TOAST_TYPES.WARNING} {...props} />,
  [TOAST_TYPES.INFO]: (props) => <MyToast type={TOAST_TYPES.INFO} {...props} />,
};

export const showToast = (options: ToastOptions | string) => {
  let config: ToastOptions;

  if (typeof options === 'string') {
    config = {
      message: options,
      type: TOAST_TYPES.SUCCESS,
    };
  } else {
    config = options;
  }

  const {
    message,
    title,
    type = TOAST_TYPES.SUCCESS,
    visibilityTime = TOAST_DEFAULTS.VISIBILITY_TIME,
    position = TOAST_DEFAULTS.POSITION,
  } = config;

  const getDefaultMessages = (toastType: ToastTypeValue) => {
    switch (toastType) {
      case TOAST_TYPES.SUCCESS:
        return TOAST_MESSAGES.SUCCESS;
      case TOAST_TYPES.ERROR:
        return TOAST_MESSAGES.ERROR;
      case TOAST_TYPES.WARNING:
        return TOAST_MESSAGES.WARNING;
      case TOAST_TYPES.INFO:
        return TOAST_MESSAGES.INFO;
      default:
        return TOAST_MESSAGES.SUCCESS;
    }
  };

  const defaults = getDefaultMessages(type);

  const params: ToastShowParams = {
    type,
    text1: title || defaults.title,
    text2: message || defaults.message,
    visibilityTime,
    position,
    topOffset: TOAST_DEFAULTS.TOP_OFFSET,
    bottomOffset: TOAST_DEFAULTS.BOTTOM_OFFSET,
    autoHide: TOAST_DEFAULTS.AUTO_HIDE,
  };

  Toast.show(params);
};

export const showSuccessToast = (message: string, title?: string) => {
  showToast({ message, title, type: TOAST_TYPES.SUCCESS });
};

export const showErrorToast = (message: string, title?: string) => {
  showToast({ message, title, type: TOAST_TYPES.ERROR });
};

export const showWarningToast = (message: string, title?: string) => {
  showToast({ message, title, type: TOAST_TYPES.WARNING });
};

export const showInfoToast = (message: string, title?: string) => {
  showToast({ message, title, type: TOAST_TYPES.INFO });
};

export const hideToast = () => {
  Toast.hide();
};

export { TOAST_TYPES as toastTypes };
export * from './types';
export * from './constants';
