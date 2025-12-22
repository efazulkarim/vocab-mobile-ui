import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextInput, TouchableOpacity } from 'react-native';
import { z } from 'zod';

import { FocusAwareStatusBar, SafeAreaView, Text, View } from '@/components/ui';
import { useAuth } from '@/lib';

const schema = z
  .object({
    email: z.string().email('Enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });

type FormValues = z.infer<typeof schema>;

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

function PrimaryButton({ label, onPress, disabled }: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      className={`w-full items-center rounded-xl bg-blue-600 px-4 py-3 ${
        disabled ? 'opacity-60' : ''
      }`}
    >
      <Text className="text-base font-semibold text-white">{label}</Text>
    </TouchableOpacity>
  );
}

export default function Register() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });

  const handleRegister = (values: FormValues) => {
    console.log('Register submit', values);
    signIn({ access: 'access-token', refresh: 'refresh-token' });
    router.push('/');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FocusAwareStatusBar />
      <View className="flex-1 justify-center space-y-8 px-5">
        <View className="space-y-2">
          <Text className="text-3xl font-bold text-gray-900">
            Create Account
          </Text>
          <Text className="text-base text-gray-600">
            Start building your vocabulary today
          </Text>
        </View>

        <View className="space-y-4">
          <View className="space-y-2">
            <Text className="text-sm font-semibold text-gray-800">Email</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-base text-gray-900"
                  placeholder="you@example.com"
                  placeholderTextColor="#9ca3af"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                />
              )}
            />
            {errors.email?.message ? (
              <Text className="text-sm text-red-500">
                {errors.email.message}
              </Text>
            ) : null}
          </View>

          <View className="space-y-2">
            <Text className="text-sm font-semibold text-gray-800">
              Password
            </Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-base text-gray-900"
                  placeholder="••••••"
                  placeholderTextColor="#9ca3af"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                  returnKeyType="next"
                />
              )}
            />
            {errors.password?.message ? (
              <Text className="text-sm text-red-500">
                {errors.password.message}
              </Text>
            ) : null}
          </View>

          <View className="space-y-2">
            <Text className="text-sm font-semibold text-gray-800">
              Confirm Password
            </Text>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-base text-gray-900"
                  placeholder="••••••"
                  placeholderTextColor="#9ca3af"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                  returnKeyType="done"
                />
              )}
            />
            {errors.confirmPassword?.message ? (
              <Text className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </Text>
            ) : null}
          </View>
        </View>

        <PrimaryButton
          label={isSubmitting ? 'Creating account...' : 'Sign Up'}
          onPress={handleSubmit(handleRegister)}
          disabled={isSubmitting}
        />

        <View className="items-center">
          <Link href="/login" asChild>
            <Text className="text-sm text-blue-600">
              Already have an account?{' '}
              <Text className="font-semibold text-blue-700">Log in</Text>
            </Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
