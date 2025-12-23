import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { EmailInput } from '@/components/auth';
import {
  FocusAwareStatusBar,
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';
import { ArrowLeft, Google, Mail } from '@/components/ui/icons';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
});

type FormValues = z.infer<typeof schema>;

export default function SignIn() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  const handleContinue = (values: FormValues) => {
    // Navigate to login with password screen
    router.push({
      pathname: '/login',
      params: { email: values.email },
    });
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google sign-in
    console.log('Google sign-in');
  };

  const handleEmailSignIn = () => {
    // TODO: Implement email sign-in
    console.log('Email sign-in');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FocusAwareStatusBar />
      {/* Header */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          className="mr-4 p-2"
          accessibilityLabel="Go back"
        >
          <ArrowLeft color="#1E3A5F" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-xl font-bold text-gray-900">
          Sign In
        </Text>
        <View className="w-10" />
      </View>

      <View className="flex-1 px-6 pt-4">
        {/* Email Input */}
        <EmailInput
          control={control}
          errors={errors}
          onSubmitEditing={handleSubmit(handleContinue)}
        />

        {/* Continue Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleSubmit(handleContinue)}
          className="w-full items-center rounded-lg bg-brand-700 px-6 py-4"
        >
          <Text className="text-base font-semibold text-white">CONTINUE</Text>
        </TouchableOpacity>

        {/* OR Divider */}
        <View className="my-6 flex-row items-center">
          <View className="h-px flex-1 bg-gray-300" />
          <Text className="px-4 text-sm font-medium text-gray-500">OR</Text>
          <View className="h-px flex-1 bg-gray-300" />
        </View>

        {/* Social Login Buttons */}
        <View className="flex-row justify-center gap-4">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleGoogleSignIn}
            className="h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white"
            accessibilityLabel="Sign in with Google"
          >
            <Google />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleEmailSignIn}
            className="h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white"
            accessibilityLabel="Sign in with Email"
          >
            <Mail color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Terms and Privacy Policy */}
        <View className="mt-auto pb-6">
          <Text className="text-center text-xs text-gray-500">
            By signing in to Memli, you agree to our{' '}
            <Text className="font-semibold text-gray-700">Terms</Text> and{' '}
            <Text className="font-semibold text-gray-700">Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

