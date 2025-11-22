import { ReactNode } from 'react';
import { DimensionValue, TextProps, TextInputProps, ViewStyle, TextStyle, NativeSyntheticEvent, NativeScrollEvent, StyleProp, ScrollViewProps, TouchableOpacityProps } from 'react-native';
import { SafeAreaViewProps } from 'react-native-safe-area-context';

// ButtonComp Types
export interface ButtonCompProps {
    onPress: () => void;
    title: string;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    width?: DimensionValue;
    height?: DimensionValue;
    variant?: 'primary' | 'secondary';
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    iconSize?: number;
}

// TextComp Types
export interface TextCompProps extends TextProps {
    text?: string;
    style?: any;
    children?: React.ReactNode;
}

// TextInputComp Types
export interface TextInputCompProps extends TextInputProps {
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    error?: boolean | string;
    touched?: boolean;
    placeholder?: string;
    rightIcon?: React.ReactNode;
    onRightIconPress?: () => void;
    label?: string;
    required?: boolean;
    errorStyle?: TextStyle;
    labelStyle?: TextStyle;
    wrapperStyle?: ViewStyle;
}

// DateTimePickerComp Types
export type PickerMode = 'date' | 'time';

export interface DateTimePickerCompProps {
    value?: string;
    onChange: (value: string) => void;
    mode: PickerMode;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    error?: boolean | string;
    touched?: boolean;
    placeholder?: string;
    label?: string;
    required?: boolean;
    errorStyle?: TextStyle;
    labelStyle?: TextStyle;
    wrapperStyle?: ViewStyle;
    minimumDate?: Date;
    maximumDate?: Date;
}

// FormField Types
export interface FormFieldProps {
    control: any;
    name: string;
    rules?: any;
    type?: 'textInput' | 'datePicker' | 'timePicker' | 'dateTimePicker';
    mode?: 'date' | 'time';
    [key: string]: any;
}

// Header Types
export interface HeaderProps {
    title: string;
    onEditPress?: () => void;
    onDeletePress?: () => void;
}

// SvgElement Types
export interface SvgElementProps {
    name: any;
    onPress?: () => void;
    style?: any;
    width?: number;
    height?: number;
}

// Pressable Types
export interface PressableProps extends TouchableOpacityProps {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
    opacity?: number;
}


// Scrollable Types
export interface ScrollableProps extends Omit<ScrollViewProps, 'style'> {
    children: ReactNode;
    hasInput?: boolean;
    horizontal?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

// WrapperContainer Types
export interface WrapperContainerProps extends SafeAreaViewProps {
    children: React.ReactNode;
    style?: ViewStyle;
}

// EmptyComp Types
export interface EmptyCompProps {
    title?: string;
}

// LoaderIndicator Types
export interface LoaderIndicatorProps {
    title?: string;
    size?: 'small' | 'large';
    color?: string;
}
