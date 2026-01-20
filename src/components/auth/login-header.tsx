import { useColorScheme } from 'nativewind';
import { TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/ui';
import { ArrowLeft } from '@/components/ui/icons';

interface Props {
  onGoBack: () => void;
}

export function LoginHeader({ onGoBack }: Props) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#d4d4d4' : '#1E3A5F';

  return (
    <View className="flex-row items-center p-4">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onGoBack}
        className="mr-4 p-2"
        accessibilityLabel="Go back"
      >
        <ArrowLeft color={iconColor} />
      </TouchableOpacity>
      <Text className="text-xl font-bold text-gray-900 dark:text-white">
        Login with password
      </Text>
    </View>
  );
}
