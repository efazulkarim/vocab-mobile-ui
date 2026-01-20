import {
  type Control,
  Controller,
  type FieldErrors,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { TextInput } from 'react-native';

import { Text, View } from '@/components/ui';

interface Props<TFormValues extends FieldValues & { email: string }> {
  control: Control<TFormValues>;
  errors: FieldErrors<TFormValues>;
  onSubmitEditing: () => void;
}

export function EmailInput<
  TFormValues extends FieldValues & { email: string },
>({ control, errors, onSubmitEditing }: Props<TFormValues>) {
  return (
    <View className="mb-6">
      <Text className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
        Enter Your Email Address
      </Text>
      <Controller
        control={control}
        name={'email' as Path<TFormValues>}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="w-full rounded-xl border border-gray-300 bg-white p-4 text-base text-gray-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
            placeholder="user@email.com"
            placeholderTextColor="#9ca3af"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={onSubmitEditing}
          />
        )}
      />
      {errors.email?.message ? (
        <Text className="mt-1 text-sm text-red-500">
          {errors.email.message as string}
        </Text>
      ) : null}
    </View>
  );
}
