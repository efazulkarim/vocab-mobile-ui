import { Env } from '@env';
import { useColorScheme } from 'nativewind';
import React from 'react';

import { colors } from '@/components/ui';
import { Github, Rate, Share, Support, Website } from '@/components/ui/icons';

import { Item } from './item';
import { ItemsContainer } from './items-container';

export const SettingsLinks = () => {
  const { colorScheme } = useColorScheme();
  const iconColor =
    colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];

  return (
    <>
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
    </>
  );
};
