import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { type TextInput } from 'react-native';
import { z } from 'zod';

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
  const params = useLocalSearchParams<{ email?: string }>();
  const signIn = useAuth.use.signIn();
  const passwordInputRef = React.useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: params.email || '', password: '' },
  });

  const handleLogin = async (values: FormValues): Promise<void> => {
    const { email, password } = values;
    // TODO: Replace with actual API call to POST /login
    await Promise.resolve(
      signIn({ access: email.trim(), refresh: password.trim() })
    );
    router.push('/');
  };

  const focusPassword = () => passwordInputRef.current?.focus();

  return (
    <SafeAreaView className="flex-1 bg-white">
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
          isSubmitting={isSubmitting}
          onPress={handleSubmit(handleLogin)}
        />
      </View>
    </SafeAreaView>
  );
}
