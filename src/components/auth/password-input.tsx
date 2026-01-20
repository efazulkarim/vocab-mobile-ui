import { useColorScheme } from 'nativewind';
import React, { forwardRef, useState } from 'react';
import { type Control, Controller, type FieldErrors } from 'react-hook-form';
import { TextInput, TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/ui';
import { Eye, EyeOff } from '@/components/ui/icons';

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  onSubmitEditing: () => void;
}

export const PasswordInput = forwardRef<TextInput, Props>(
  ({ control, errors, onSubmitEditing }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const { colorScheme } = useColorScheme();

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const iconColor = colorScheme === 'dark' ? '#9ca3af' : '#6B7280';

    return (
      <View className="mb-6">
        <Text className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
          Your Password
        </Text>
        <View className="relative">
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                ref={ref}
                className="w-full rounded-xl border border-gray-300 bg-white p-4 pr-14 text-base text-gray-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                placeholder="••••••••"
                placeholderTextColor="#9ca3af"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={!showPassword}
                returnKeyType="done"
                onSubmitEditing={onSubmitEditing}
              />
            )}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={togglePasswordVisibility}
            className="absolute right-4 top-4"
            accessibilityLabel={
              showPassword ? 'Hide password' : 'Show password'
            }
          >
            {showPassword ? (
              <EyeOff color={iconColor} />
            ) : (
              <Eye color={iconColor} />
            )}
          </TouchableOpacity>
        </View>
        {errors.password?.message ? (
          <Text className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </Text>
        ) : null}
      </View>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
