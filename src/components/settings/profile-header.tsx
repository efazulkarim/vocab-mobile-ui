import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';

import { useMe } from '@/api/auth';
import { useSubscriptionStatus } from '@/api/subscription';
import { Text } from '@/components/ui';

export const ProfileHeader = () => {
  const router = useRouter();
  const { data: user, isLoading: isLoadingUser } = useMe();
  const { data: subscription } = useSubscriptionStatus();

  return (
    <View className="mb-6 flex-row items-center rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
      <View className="mr-4 h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
        <Text className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">
          {user?.full_name?.charAt(0).toUpperCase() ||
            user?.email?.charAt(0).toUpperCase() ||
            '?'}
        </Text>
      </View>
      <View>
        {isLoadingUser ? (
          <ActivityIndicator size="small" color="#6366f1" />
        ) : user ? (
          <>
            <Text className="text-lg font-bold text-neutral-900 dark:text-white">
              {user.full_name || 'User'}
            </Text>
            <Text className="text-sm text-neutral-500 dark:text-neutral-400">
              {user.email}
            </Text>
            <View className="mt-1 flex-row items-center">
              <View
                className={`mr-2 h-2 w-2 rounded-full ${subscription?.is_premium ? 'bg-amber-400' : 'bg-green-500'}`}
              />
              <Text className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                {subscription?.is_premium ? 'Premium Plan' : 'Free Plan'}
              </Text>
            </View>
          </>
        ) : (
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text className="text-lg font-bold text-neutral-900 dark:text-white">
              Login
            </Text>
            <Text className="text-sm text-neutral-500 dark:text-neutral-400">
              Tap to sign in
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
