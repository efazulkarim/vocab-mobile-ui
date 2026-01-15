import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, TextInput, TouchableOpacity } from 'react-native';
import { z } from 'zod';

import { useLogin, useRegister } from '@/api/auth';
import { FocusAwareStatusBar, SafeAreaView, Text, View } from '@/components/ui';
import { useAuth } from '@/lib';

const schema = z
  .object({
    fullName: z
      .string()
      .refine((val) => val === '' || val.length >= 2, {
        message: 'Name must be at least 2 characters',
      })
      .optional(),
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
      className={`w-full items-center rounded-xl bg-indigo-600 px-4 py-3 ${
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

  const registerMutation = useRegister();
  const loginMutation = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const isSubmitting = registerMutation.isPending || loginMutation.isPending;

  const handleRegister = async (values: FormValues) => {
    try {
      // First, register the user
      await registerMutation.mutateAsync({
        email: values.email.trim(),
        password: values.password,
        full_name: values.fullName?.trim(),
      });

      // Then auto-login after successful registration
      const loginResponse = await loginMutation.mutateAsync({
        email: values.email.trim(),
        password: values.password,
      });

      signIn({
        access: loginResponse.access_token,
        refresh: loginResponse.access_token,
      });

      router.push('/');
    } catch (error: any) {
      const detail = error.response?.data?.detail;
      let message = 'Registration failed. Please try again.';

      if (typeof detail === 'string') {
        message = detail;
      } else if (typeof detail === 'object') {
        // Handle validation errors
        const errorMessages = Object.values(detail).join(', ');
        message = errorMessages || message;
      }

      Alert.alert('Registration Error', message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <FocusAwareStatusBar />
      <View className="flex-1 justify-center space-y-8 px-5">
        <View className="space-y-2">
          <Text className="text-3xl font-bold text-gray-900 dark:text-white">
            Create Account
          </Text>
          <Text className="text-base text-gray-600 dark:text-gray-400">
            Start building your vocabulary today
          </Text>
        </View>

        <View className="space-y-4">
          {/* Full Name Field */}
          <View className="space-y-2">
            <Text className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Full Name (Optional)
            </Text>
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-base text-gray-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  placeholder="John Doe"
                  placeholderTextColor="#9ca3af"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="words"
                  autoCorrect={false}
                  returnKeyType="next"
                />
              )}
            />
            {errors.fullName?.message ? (
              <Text className="text-sm text-red-500">
                {errors.fullName.message}
              </Text>
            ) : null}
          </View>

          {/* Email Field */}
          <View className="space-y-2">
            <Text className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Email
            </Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-base text-gray-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
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

          {/* Password Field */}
          <View className="space-y-2">
            <Text className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Password
            </Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-base text-gray-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
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

          {/* Confirm Password Field */}
          <View className="space-y-2">
            <Text className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Confirm Password
            </Text>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-base text-gray-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
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
            <Text className="text-sm text-indigo-600 dark:text-indigo-400">
              Already have an account?{' '}
              <Text className="font-semibold text-indigo-700 dark:text-indigo-300">
                Log in
              </Text>
            </Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
