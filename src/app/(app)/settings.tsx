import { Env } from '@env';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { useMe } from '@/api/auth';
import { useLogout } from '@/api/auth/use-logout';
import { useQuizStats } from '@/api/quiz';
import { useSubscriptionStatus } from '@/api/subscription';
import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { LanguageItem } from '@/components/settings/language-item';
import { ThemeItem } from '@/components/settings/theme-item';
import {
  colors,
  FocusAwareStatusBar,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { Github, Rate, Share, Support, Website } from '@/components/ui/icons';
import { translate, useAuth } from '@/lib';

export default function Settings() {
  const router = useRouter();
  const signOut = useAuth.use.signOut();
  const { colorScheme } = useColorScheme();
  const iconColor =
    colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];

  // Fetch user data
  const { data: user, isLoading: isLoadingUser } = useMe();
  const { data: quizStats } = useQuizStats();
  const { data: subscription } = useSubscriptionStatus();

  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch {
      // Ignore logout errors, still sign out locally
    }
    signOut();
  };

  const handleQuizPress = () => {
    router.push('/quiz' as any);
  };

  return (
    <>
      <FocusAwareStatusBar />

      <ScrollView className="bg-neutral-50 dark:bg-black">
        <View className="flex-1 px-4 pt-16 ">
          <Text className="mb-6 text-3xl font-bold text-neutral-900 dark:text-white">
            {translate('settings.title')}
          </Text>

          {/* User Profile Section */}
          <ItemsContainer title="settings.profile">
            {isLoadingUser ? (
              <View className="p-4">
                <ActivityIndicator size="small" color="#6366f1" />
              </View>
            ) : user ? (
              <>
                <Item text="settings.email" value={user.email} />
                {user.full_name && (
                  <Item text="settings.name" value={user.full_name} />
                )}
                <Item
                  text="settings.status"
                  value={subscription?.is_premium ? '⭐ Premium' : 'Free'}
                />
              </>
            ) : (
              <Item text="settings.not_logged_in" />
            )}
          </ItemsContainer>

          {/* Quiz Stats */}
          {quizStats && (
            <ItemsContainer title="settings.quiz_stats">
              <Item
                text="settings.quizzes_completed"
                value={String(quizStats.total_quizzes)}
              />
              <Item
                text="settings.average_accuracy"
                value={`${Math.round(quizStats.average_accuracy * 100)}%`}
              />
              <Item
                text="settings.best_streak"
                value={`${quizStats.best_streak} 🔥`}
              />
              <TouchableOpacity
                onPress={handleQuizPress}
                className="mx-4 my-3 items-center rounded-xl bg-indigo-600 py-3"
              >
                <Text className="font-semibold text-white">Take a Quiz</Text>
              </TouchableOpacity>
            </ItemsContainer>
          )}

          <ItemsContainer title="settings.generale">
            <LanguageItem />
            <ThemeItem />
          </ItemsContainer>

          <ItemsContainer title="settings.about">
            <Item text="settings.app_name" value={Env.NAME} />
            <Item text="settings.version" value={Env.VERSION} />
          </ItemsContainer>

          <ItemsContainer title="settings.support_us">
            <Item
              text="settings.share"
              icon={<Share color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="settings.rate"
              icon={<Rate color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="settings.support"
              icon={<Support color={iconColor} />}
              onPress={() => {}}
            />
          </ItemsContainer>

          <ItemsContainer title="settings.links">
            <Item text="settings.privacy" onPress={() => {}} />
            <Item text="settings.terms" onPress={() => {}} />
            <Item
              text="settings.github"
              icon={<Github color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="settings.website"
              icon={<Website color={iconColor} />}
              onPress={() => {}}
            />
          </ItemsContainer>

          <View className="my-8">
            <ItemsContainer>
              <Item text="settings.logout" onPress={handleLogout} />
            </ItemsContainer>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
