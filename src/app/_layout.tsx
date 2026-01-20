// Import  global CSS file
import '../../global.css';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import {
  Stack,
  useRootNavigationState,
  useRouter,
  useSegments,
} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { LogBox, StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { APIProvider } from '@/api';
import { hydrateAuth, loadSelectedTheme, useAuth } from '@/lib';
import { useThemeConfig } from '@/lib/use-theme-config';

LogBox.ignoreLogs(['SafeAreaView has been deprecated']);

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(app)',
};

hydrateAuth();
loadSelectedTheme();
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
// Set the animation options. This is optional.

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  const { status, token } = useAuth();

  useEffect(() => {
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === '(app)';

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      status === 'signOut' &&
      inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace('/login');
    } else if (status === 'signIn' && !inAuthGroup) {
      // Redirect to the home page.
      router.replace('/(app)/');
    } else if (status === 'idle') {
      // Still hydrating
    }
  }, [status, segments, navigationState, router]);

  return (
    <Providers>
      <Stack>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const theme = useThemeConfig();

  return (
    <GestureHandlerRootView
      style={styles.container}
      className={theme.dark ? `dark` : undefined}
    >
      <KeyboardProvider>
        <ThemeProvider value={theme}>
          <APIProvider>
            <BottomSheetModalProvider>
              {children}
              <FlashMessage position="top" />
            </BottomSheetModalProvider>
          </APIProvider>
        </ThemeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
