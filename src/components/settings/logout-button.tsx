import React from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';

import { useLogout } from '@/api/auth/use-logout';
import { Text } from '@/components/ui';
import { translate, useAuth } from '@/lib';

export const LogoutButton = () => {
  const signOut = useAuth.use.signOut();
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch {
      // Ignore logout errors, still sign out locally
    }
    signOut();
  };

  return (
    <View className="my-6">
      <TouchableOpacity
        onPress={handleLogout}
        disabled={logoutMutation.isPending}
        className="flex-row items-center justify-center rounded-xl bg-red-50 py-4 dark:bg-red-900/20"
      >
        {logoutMutation.isPending ? (
          <ActivityIndicator size="small" color="#ef4444" />
        ) : (
          <Text className="font-semibold text-red-500 dark:text-red-400">
            {translate('settings.logout')}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
