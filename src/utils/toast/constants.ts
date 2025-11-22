import { ToastColorScheme, ToastTypeValue } from './types';
import { TOAST_TYPES } from './types';
import { commonColors } from '@/styles/colors';

export { TOAST_TYPES };

export const TOAST_COLOR_SCHEMES: Record<ToastTypeValue, ToastColorScheme> = {
  [TOAST_TYPES.SUCCESS]: {
    borderColor: commonColors.success,
    backgroundColor: '#FFFFFF',
    textColor: commonColors.success,
    iconColor: commonColors.success,
  },
  [TOAST_TYPES.ERROR]: {
    borderColor: commonColors.error,
    backgroundColor: '#FFFFFF',
    textColor: commonColors.error,
    iconColor: commonColors.error,
  },
  [TOAST_TYPES.WARNING]: {
    borderColor: commonColors.warning,
    backgroundColor: '#FFFFFF',
    textColor: commonColors.warning,
    iconColor: commonColors.warning,
  },
  [TOAST_TYPES.INFO]: {
    borderColor: commonColors.info,
    backgroundColor: '#FFFFFF',
    textColor: commonColors.info,
    iconColor: commonColors.info,
  },
};

export const TOAST_DEFAULTS = {
  VISIBILITY_TIME: 3000,
  POSITION: 'top' as const,
  AUTO_HIDE: true,
  TOP_OFFSET: 40,
  BOTTOM_OFFSET: 40,
};

export const TOAST_MESSAGES = {
  SUCCESS: {
    title: 'Success',
    message: 'Operation completed successfully',
  },
  ERROR: {
    title: 'Error',
    message: 'Something went wrong',
  },
  WARNING: {
    title: 'Warning',
    message: 'Please check and try again',
  },
  INFO: {
    title: 'Info',
    message: 'Information',
  },
};
