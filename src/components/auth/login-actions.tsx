import { Link } from 'expo-router';
import { TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/ui';

interface Props {
  isSubmitting: boolean;
  onPress: () => void;
}

export function LoginActions({ isSubmitting, onPress }: Props) {
  return (
    <>
      {/* Login Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
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
    </>
  );
}
