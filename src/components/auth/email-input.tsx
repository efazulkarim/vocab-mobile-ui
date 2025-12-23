import { type Control, Controller, type FieldErrors } from 'react-hook-form';
import { TextInput } from 'react-native';

import { Text, View } from '@/components/ui';

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  onSubmitEditing: () => void;
}

export function EmailInput({ control, errors, onSubmitEditing }: Props) {
  return (
    <View className="mb-6">
      <Text className="mb-2 text-base font-semibold text-gray-900">
        Enter Your Email Address
      </Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="w-full rounded-xl border border-gray-300 bg-white p-4 text-base text-gray-900"
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
          {errors.email.message}
        </Text>
      ) : null}
    </View>
  );
}
