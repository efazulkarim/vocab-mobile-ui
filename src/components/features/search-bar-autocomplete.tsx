import { useRouter } from 'expo-router';
import { Bookmark, Search, Sparkles, X } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React, { useCallback, useState } from 'react';
import {
  Keyboard,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInUp } from 'react-native-reanimated';

import { useAutocomplete, useSearchWords } from '@/api/words';
import { Text, View } from '@/components/ui';
import { useAuth } from '@/lib';

export function SearchBarWithAutocomplete() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const status = useAuth.use.status();
  const isAuthenticated = status === 'signIn';

  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Datamuse suggestions
  const { suggestions, isLoading: isSuggestionsLoading } =
    useAutocomplete(query);

  // User's word bank search (only if authenticated)
  const { data: wordBankData, isLoading: isWordBankLoading } = useSearchWords({
    variables: { search: query, page_size: 5 },
    enabled: isAuthenticated && query.length >= 2,
  });

  const savedWords = wordBankData?.items ?? [];

  const showDropdown =
    isFocused &&
    query.length >= 2 &&
    (suggestions.length > 0 || savedWords.length > 0);

  const handleSelectWord = useCallback(
    (word: string) => {
      Keyboard.dismiss();
      setQuery('');
      setIsFocused(false);
      router.push(`/word/${encodeURIComponent(word)}`);
    },
    [router]
  );

  const handleClear = useCallback(() => {
    setQuery('');
  }, []);

  const iconColor = colorScheme === 'dark' ? '#9ca3af' : '#6b7280';

  return (
    <View className="relative z-50">
      {/* Search Input */}
      <View className="relative">
        <View className="absolute bottom-0 left-3 top-0 z-10 justify-center">
          <Search size={20} color={iconColor} />
        </View>

        <TextInput
          value={query}
          onChangeText={setQuery}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search for new words..."
          placeholderTextColor={iconColor}
          className="h-12 rounded-full border-none bg-neutral-100 pl-10 pr-10 font-inter text-base text-neutral-900 dark:bg-neutral-800 dark:text-white"
          autoCapitalize="none"
          autoCorrect={false}
        />

        {query.length > 0 && (
          <TouchableOpacity
            onPress={handleClear}
            className="absolute bottom-0 right-3 top-0 justify-center"
          >
            <X size={18} color={iconColor} />
          </TouchableOpacity>
        )}
      </View>

      {/* Dropdown */}
      {showDropdown && (
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(150)}
          className="absolute left-0 right-0 top-14 z-50 max-h-72 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* User's Saved Words Section */}
            {isAuthenticated && savedWords.length > 0 && (
              <View className="border-b border-neutral-100 dark:border-neutral-800">
                <View className="flex-row items-center px-4 py-2">
                  <Bookmark size={14} color="#6366f1" />
                  <Text className="ml-2 text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                    Your Words
                  </Text>
                </View>
                {savedWords.map((word) => (
                  <Animated.View
                    key={word.id}
                    entering={SlideInUp.duration(200)}
                  >
                    <Pressable
                      onPress={() => handleSelectWord(word.word)}
                      className="flex-row items-center px-4 py-3 active:bg-neutral-50 dark:active:bg-neutral-800"
                    >
                      <Text className="flex-1 text-base text-neutral-900 dark:text-white">
                        {word.word}
                      </Text>
                      <View className="rounded-full bg-indigo-100 px-2 py-1 dark:bg-indigo-900/30">
                        <Text className="text-xs text-indigo-600 dark:text-indigo-400">
                          Saved
                        </Text>
                      </View>
                    </Pressable>
                  </Animated.View>
                ))}
              </View>
            )}

            {/* Datamuse Suggestions Section */}
            {suggestions.length > 0 && (
              <View>
                <View className="flex-row items-center px-4 py-2">
                  <Sparkles size={14} color="#f59e0b" />
                  <Text className="ml-2 text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                    Suggestions
                  </Text>
                </View>
                {suggestions
                  .filter(
                    (s) =>
                      !savedWords.some(
                        (w) => w.word.toLowerCase() === s.toLowerCase()
                      )
                  )
                  .map((word, index) => (
                    <Animated.View
                      key={`${word}-${index}`}
                      entering={SlideInUp.delay(index * 30).duration(200)}
                    >
                      <Pressable
                        onPress={() => handleSelectWord(word)}
                        className="px-4 py-3 active:bg-neutral-50 dark:active:bg-neutral-800"
                      >
                        <Text className="text-base text-neutral-900 dark:text-white">
                          {word}
                        </Text>
                      </Pressable>
                    </Animated.View>
                  ))}
              </View>
            )}

            {/* Loading State */}
            {(isSuggestionsLoading || isWordBankLoading) && (
              <View className="items-center py-4">
                <Text className="text-sm text-neutral-500">Searching...</Text>
              </View>
            )}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
}
