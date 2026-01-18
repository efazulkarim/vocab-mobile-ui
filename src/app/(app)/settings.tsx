import React from 'react';
import { View } from 'react-native';

import {
  ItemsContainer,
  LanguageItem,
  LogoutButton,
  ProfileHeader,
  QuizStats,
  SettingsLinks,
  ThemeItem,
} from '@/components/settings';
import { FocusAwareStatusBar, ScrollView, Text } from '@/components/ui';
import { translate } from '@/lib';

export default function Settings() {
  return (
    <>
      <FocusAwareStatusBar />

      <ScrollView
        className="bg-neutral-50 dark:bg-black"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="flex-1 px-4 pt-16">
          <Text className="mb-6 text-3xl font-bold text-neutral-900 dark:text-white">
            {translate('settings.title')}
          </Text>

          <ProfileHeader />
          <QuizStats />

          <ItemsContainer title="settings.generale">
            <LanguageItem />
            <ThemeItem />
          </ItemsContainer>

          <SettingsLinks />
          <LogoutButton />
        </View>
      </ScrollView>
    </>
  );
}
