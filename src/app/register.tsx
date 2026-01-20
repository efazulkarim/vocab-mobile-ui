import { useNavigation } from '@react-navigation/native';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { FocusAwareStatusBar, SafeAreaView, Text, View } from '@/components/ui';
import { FormField } from '@/components/ui/form-field';
import { ArrowLeft } from '@/components/ui/icons';
import { useRegisterLogic } from '@/hooks/use-register-logic';
import { useAuth } from '@/lib';

export default function Register() {
  const router = useRouter();
  const status = useAuth.use.status();
  const navigation = useNavigation();
  const { form, handleRegister, isSubmitting, errors } = useRegisterLogic();

  // Navigation handled by Root Layout

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <FocusAwareStatusBar />
      <View className="flex-row items-center p-4">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={router.back}
          className="mr-4 rounded-full p-2 active:bg-neutral-100 dark:active:bg-neutral-800"
        >
          <ArrowLeft color="#1E3A5F" />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingBottom: 40,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center space-y-8">
            <View>
              <Text className="text-3xl font-bold text-brand-700 dark:text-white">
                Create Account
              </Text>
              <Text className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Join us and start your vocabulary journey.
              </Text>
            </View>
            <View className="space-y-5">
              {errors.root && (
                <View className="mb-2 rounded-xl border border-red-100 bg-red-50 p-4">
                  <Text className="text-sm font-medium text-red-600">
                    {errors.root.message}
                  </Text>
                </View>
              )}
              <FormField
                control={form.control}
                name="fullName"
                label="Full Name (Optional)"
                placeholder="John Doe"
                autoCapitalize="words"
                returnKeyType="next"
              />
              <FormField
                control={form.control}
                name="email"
                label="Email Address"
                placeholder="you@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                error={errors.email?.message}
              />
              <FormField
                control={form.control}
                name="password"
                label="Password"
                placeholder="••••••••"
                secureTextEntry
                returnKeyType="next"
                error={errors.password?.message}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                label="Confirm Password"
                placeholder="••••••••"
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={form.handleSubmit(handleRegister)}
                error={errors.confirmPassword?.message}
              />
            </View>
            <View className="space-y-4 pt-4">
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={form.handleSubmit(handleRegister)}
                disabled={isSubmitting}
                className={`w-full items-center rounded-xl bg-brand-700 py-4 shadow-sm shadow-brand-500/30 ${isSubmitting ? 'opacity-70' : ''}`}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-base font-bold uppercase tracking-wide text-white">
                    Sign Up
                  </Text>
                )}
              </TouchableOpacity>
              <View className="flex-row justify-center">
                <Text className="text-base text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                </Text>
                <Link href="/login" asChild>
                  <TouchableOpacity activeOpacity={0.7}>
                    <Text className="text-base font-semibold text-brand-700 dark:text-brand-400">
                      Login
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
