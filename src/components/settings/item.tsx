import { ChevronRight } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';

import { Pressable, Text, View } from '@/components/ui';
import type { TxKeyPath } from '@/lib';

type ItemProps = {
  text: TxKeyPath;
  value?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  isDestructive?: boolean;
};

export const Item = ({
  text,
  value,
  icon,
  onPress,
  isDestructive,
}: ItemProps) => {
  const isPressable = onPress !== undefined;
  const { colorScheme } = useColorScheme();
  const chevronColor = colorScheme === 'dark' ? '#525252' : '#d4d4d4';

  return (
    <Pressable
      onPress={onPress}
      pointerEvents={isPressable ? 'auto' : 'none'}
      className="flex-1 flex-row items-center justify-between border-b border-neutral-100 px-4 py-4 active:bg-neutral-50 dark:border-neutral-800 dark:active:bg-neutral-800"
    >
      <View className="flex-row items-center">
        {icon && <View className="mr-3">{icon}</View>}
        <Text
          tx={text}
          className={`text-base font-medium ${
            isDestructive
              ? 'text-red-600 dark:text-red-400'
              : 'text-neutral-900 dark:text-white'
          }`}
        />
      </View>
      <View className="flex-row items-center">
        {value && (
          <Text className="mr-2 text-sm text-neutral-500 dark:text-neutral-400">
            {value}
          </Text>
        )}
        {isPressable && <ChevronRight size={20} color={chevronColor} />}
      </View>
    </Pressable>
  );
};
