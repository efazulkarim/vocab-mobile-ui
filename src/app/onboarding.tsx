import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { FocusAwareStatusBar, SafeAreaView, Text, View } from '@/components/ui';
import { useIsFirstTime } from '@/lib/hooks';

type ButtonVariant = 'primary' | 'secondary' | 'link';

interface OnboardingButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
}

const buttonStyles: Record<
  ButtonVariant,
  { container: string; text: string; opacity: number }
> = {
  primary: {
    container: 'mb-3 w-full items-center rounded-full bg-brand-700 px-6 py-4',
    text: 'text-lg font-semibold text-white',
    opacity: 0.85,
  },
  secondary: {
    container:
      'mb-4 w-full items-center rounded-full border border-gray-300 bg-white px-6 py-4',
    text: 'text-lg font-medium text-brand-700',
    opacity: 0.85,
  },
  link: {
    container: 'items-end py-2 pr-2',
    text: 'text-base font-medium text-brand-700',
    opacity: 0.7,
  },
};

function OnboardingButton({
  label,
  onPress,
  variant = 'primary',
}: OnboardingButtonProps) {
  const style = buttonStyles[variant];
  return (
    <TouchableOpacity
      activeOpacity={style.opacity}
      onPress={onPress}
      className={style.container}
    >
      <Text className={style.text}>{label}</Text>
    </TouchableOpacity>
  );
}

interface OnboardingActionsProps {
  onLogin: () => void;
  onGetStarted: () => void;
  onSkip: () => void;
}

function OnboardingActions({
  onLogin,
  onGetStarted,
  onSkip,
}: OnboardingActionsProps) {
  return (
    <View className="px-6 pb-6">
      <OnboardingButton label="Login" onPress={onLogin} variant="primary" />
      <OnboardingButton
        label="Get Started for Free"
        onPress={onGetStarted}
        variant="secondary"
      />
      <OnboardingButton label="Skip" onPress={onSkip} variant="link" />
    </View>
  );
}

export default function Onboarding() {
  const [_, setIsFirstTime] = useIsFirstTime();
  const router = useRouter();

  const handleLogin = () => router.push('/login');
  const handleGetStarted = () => router.push('/register');
  const handleSkip = () => {
    setIsFirstTime(false);
    router.replace('/');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FocusAwareStatusBar />
      <View className="flex-1 items-center justify-center px-6">
        <Text className="mb-2 text-center text-3xl font-bold text-gray-900">
          Hello!
        </Text>
        <View className="mb-2 items-center">
          <Text className="text-5xl font-bold tracking-tight text-brand-700">
            memli
          </Text>
          <View className="mt-1 h-1 w-40 rounded-full bg-brand-700" />
        </View>
        <Text className="mt-4 text-center text-lg text-gray-600">
          Learn. Memorize. Excel.
        </Text>
      </View>
      <OnboardingActions
        onLogin={handleLogin}
        onGetStarted={handleGetStarted}
        onSkip={handleSkip}
      />
    </SafeAreaView>
  );
}
