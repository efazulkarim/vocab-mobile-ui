import React from 'react';
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { TextInput, type TextInputProps } from 'react-native';

import { Text, View } from '@/components/ui';

interface FormFieldProps<T extends FieldValues> extends Omit<
  TextInputProps,
  'value'
> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error?: string;
}

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  error,
  ...inputProps
}: FormFieldProps<T>) {
  return (
    <View>
      <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="w-full rounded-xl border border-gray-300 bg-white p-4 text-base text-gray-900 focus:border-brand-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
            placeholderTextColor="#9ca3af"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...inputProps}
          />
        )}
      />
      {error && <Text className="mt-1 text-sm text-red-500">{error}</Text>}
    </View>
  );
}
