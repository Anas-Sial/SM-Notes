export const TOAST_TYPES = {
  SUCCESS: 'customSuccess',
  ERROR: 'customError',
  WARNING: 'customWarning',
  INFO: 'customInfo',
} as const;

export type ToastTypeKey = keyof typeof TOAST_TYPES;
export type ToastTypeValue = (typeof TOAST_TYPES)[ToastTypeKey];

export interface ToastOptions {
  message?: string;
  title?: string;
  type?: ToastTypeValue;
  duration?: number;
  position?: 'top' | 'bottom';
  visibilityTime?: number;
}

export interface ToastColorScheme {
  borderColor: string;
  backgroundColor: string;
  textColor: string;
  iconColor: string;
}
