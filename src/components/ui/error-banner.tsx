import React from 'react';

import { Text, View } from '@/components/ui';

interface ErrorBannerProps {
  message?: string;
}

export function ErrorBanner({ message }: ErrorBannerProps) {
  if (!message) return null;

  return (
    <View className="mb-2 rounded-xl border border-red-100 bg-red-50 p-4">
      <Text className="text-sm font-medium text-red-600">{message}</Text>
    </View>
  );
}
