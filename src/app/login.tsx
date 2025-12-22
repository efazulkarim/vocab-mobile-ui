import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextInput, TouchableOpacity } from 'react-native';
import { z } from 'zod';

import { FocusAwareStatusBar, SafeAreaView, Text, View } from '@/components/ui';
import { ArrowLeft, Eye, EyeOff } from '@/components/ui/icons';
import { useAuth } from '@/lib';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormValues = z.infer<typeof schema>;

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  const passwordInputRef = React.useRef<TextInput>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const handleLogin = async (values: FormValues): Promise<void> => {
    const { email, password } = values;
    // TODO: Replace with actual API call to POST /login
    await Promise.resolve(
      signIn({ access: email.trim(), refresh: password.trim() })
    );
    router.push('/');
  };

  const focusPassword = () => {
    passwordInputRef.current?.focus();
  };

  const handleGoBack = () => {
    router.back();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FocusAwareStatusBar />

      {/* Header with back button */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleGoBack}
          className="mr-4 p-2"
          accessibilityLabel="Go back"
        >
          <ArrowLeft color="#1E3A5F" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">
          Login with password
        </Text>
      </View>

      {/* Form content */}
      <View className="flex-1 px-6 pt-4">
        {/* Email Input */}
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
                onSubmitEditing={focusPassword}
              />
            )}
          />
          {errors.email?.message ? (
            <Text className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </Text>
          ) : null}
        </View>

        {/* Password Input */}
        <View className="mb-6">
          <Text className="mb-2 text-base font-semibold text-gray-900">
            Your Password
          </Text>
          <View className="relative">
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  ref={passwordInputRef}
                  className="w-full rounded-xl border border-gray-300 bg-white p-4 pr-14 text-base text-gray-900"
                  placeholder="••••••••"
                  placeholderTextColor="#9ca3af"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!showPassword}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit(handleLogin)}
                />
              )}
            />
            {/* Eye toggle button */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={togglePasswordVisibility}
              className="absolute right-4 top-4"
              accessibilityLabel={
                showPassword ? 'Hide password' : 'Show password'
              }
            >
              {showPassword ? (
                <EyeOff color="#6B7280" />
              ) : (
                <Eye color="#6B7280" />
              )}
            </TouchableOpacity>
          </View>
          {errors.password?.message ? (
            <Text className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </Text>
          ) : null}
        </View>

        {/* Login Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleSubmit(handleLogin)}
          disabled={isSubmitting}
          className={`w-full items-center rounded-xl bg-brand-700 px-6 py-4 ${
            isSubmitting ? 'opacity-60' : ''
          }`}
        >
          <Text className="text-base font-semibold uppercase tracking-wide text-white">
            {isSubmitting ? 'Logging in...' : 'LOGIN'}
          </Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <View className="mt-6 flex-row items-center justify-center">
          <Text className="text-base text-gray-600">Forgot password? </Text>
          <Link href="/register" asChild>
            <TouchableOpacity activeOpacity={0.7}>
              <Text className="text-base font-medium text-brand-700">
                click here
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
