import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextInput, TouchableOpacity } from 'react-native';
import { z } from 'zod';

import { FocusAwareStatusBar, SafeAreaView, Text, View } from '@/components/ui';
import { useAuth } from '@/lib';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
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

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  const passwordInputRef = React.useRef<TextInput>(null);
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
    await Promise.resolve(
      signIn({ access: email.trim(), refresh: password.trim() })
    );
    router.push('/');
  };

  const focusPassword = () => {
    passwordInputRef.current?.focus();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FocusAwareStatusBar />
      <View className="flex-1 justify-center space-y-8 px-5">
        <View className="space-y-2">
          <Text className="text-3xl font-bold text-gray-900">Welcome Back</Text>
          <Text className="text-base text-gray-600">
            Please sign in to continue
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
                  onSubmitEditing={focusPassword}
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
                  ref={passwordInputRef}
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
            {errors.password?.message ? (
              <Text className="text-sm text-red-500">
                {errors.password.message}
              </Text>
            ) : null}
          </View>
        </View>

        <PrimaryButton
          label={isSubmitting ? 'Signing in...' : 'Sign In'}
          onPress={handleSubmit(handleLogin)}
          disabled={isSubmitting}
        />

        <View className="items-center">
          <Link href="/register" asChild>
            <Text className="text-sm text-blue-600">
              Don&apos;t have an account?{' '}
              <Text className="font-semibold text-blue-700">Sign up</Text>
            </Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
