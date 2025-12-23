import { TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/ui';
import { ArrowLeft } from '@/components/ui/icons';

interface Props {
  onGoBack: () => void;
}

export function LoginHeader({ onGoBack }: Props) {
  return (
    <View className="flex-row items-center p-4">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onGoBack}
        className="mr-4 p-2"
        accessibilityLabel="Go back"
      >
        <ArrowLeft color="#1E3A5F" />
      </TouchableOpacity>
      <Text className="text-xl font-bold text-gray-900">
        Login with password
      </Text>
    </View>
  );
}
