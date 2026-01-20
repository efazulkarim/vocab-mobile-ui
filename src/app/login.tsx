import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Alert, type TextInput } from 'react-native';
import { z } from 'zod';

import { useLogin } from '@/api/auth';
import {
  EmailInput,
  LoginActions,
  LoginHeader,
  PasswordInput,
} from '@/components/auth';
import { FocusAwareStatusBar, SafeAreaView, View } from '@/components/ui';
import { useAuth } from '@/lib';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormValues = z.infer<typeof schema>;

export default function Login() {
  const router = useRouter();
  const navigation = useNavigation();
  const signIn = useAuth.use.signIn();
  const status = useAuth.use.status();
  const passwordInputRef = React.useRef<TextInput>(null);

  const loginMutation = useLogin();

  // Navigate to app when auth status changes to signIn
  // Handled by Root Layout now

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const handleLogin = async (values: FormValues): Promise<void> => {
    console.log('🔄 Login attempt started...');
    try {
      const response = await loginMutation.mutateAsync({
        email: values.email.trim(),
        password: values.password,
      });

      console.log(
        '✅ API login successful, token received:',
        !!response.access_token
      );

      signIn({
        access: response.access_token,
        refresh: response.access_token,
      });

      console.log('✅ signIn() called, status should change...');
    } catch (error: any) {
      console.log('❌ Login error:', error.response?.data || error.message);
      const message =
        error.response?.data?.detail || 'Login failed. Please try again.';
      Alert.alert(
        'Login Error',
        typeof message === 'string' ? message : 'Invalid credentials'
      );
    }
  };

  const focusPassword = () => passwordInputRef.current?.focus();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <FocusAwareStatusBar />
      <LoginHeader onGoBack={() => router.back()} />
      <View className="flex-1 px-6 pt-4">
        <EmailInput
          control={control}
          errors={errors}
          onSubmitEditing={focusPassword}
        />
        <PasswordInput
          ref={passwordInputRef}
          control={control}
          errors={errors}
          onSubmitEditing={handleSubmit(handleLogin)}
        />
        <LoginActions
          isSubmitting={loginMutation.isPending}
          onPress={handleSubmit(handleLogin)}
        />
      </View>
    </SafeAreaView>
  );
}
