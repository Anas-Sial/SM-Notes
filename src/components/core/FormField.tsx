import React, { memo } from 'react';
import { Controller } from 'react-hook-form';
import TextInputComp from './TextInputComp';
import DateTimePickerComp from './DateTimePickerComp';
import { FormFieldProps } from './types';

const FormField = ({
    control,
    name,
    rules,
    type = 'textInput',
    mode,
    ...restProps
}: FormFieldProps) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, onBlur, value }, fieldState: { error, isTouched }, formState: { isSubmitted } }) => {
                const commonProps = {
                    value,
                    error: error?.message,
                    touched: isTouched || isSubmitted,
                    ...restProps,
                };

                switch (type) {
                    case 'dateTimePicker':
                        return (
                            <DateTimePickerComp
                                onChange={onChange}
                                mode={mode || 'date'}
                                {...commonProps}
                            />
                        );
                    case 'textInput':
                    default:
                        return (
                            <TextInputComp
                                onChangeText={onChange}
                                onBlur={onBlur}
                                {...commonProps}
                            />
                        );
                }
            }}
        />
    );
};

export default memo(FormField);