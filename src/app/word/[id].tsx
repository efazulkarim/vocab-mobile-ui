import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Bookmark, BookmarkCheck } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, TouchableOpacity } from 'react-native';

import { useGenerateWord, useSearchWords } from '@/api/words';
import { useAddWord } from '@/api/words/use-add-word';
import { FadeInView, SlideUpCard } from '@/components/animations';
import { SRSActionBar } from '@/components/features/srs-action-bar';
import { WordDefinition } from '@/components/features/word-definition';
import { WordHero } from '@/components/features/word-hero';
import { SafeAreaView, Text, View } from '@/components/ui';

export default function WordDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colorScheme } = useColorScheme();

  // Handle case where id is array
  const wordId = Array.isArray(id) ? id[0] : id;

  const { mutate, data, isPending, isError } = useGenerateWord();
  const addWordMutation = useAddWord();

  const [savedWordId, setSavedWordId] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (wordId) {
      mutate({ word: wordId });
    }
  }, [wordId, mutate]);

  // Helper function to fetch the word ID from the word bank
  const fetchExistingWordId = async (word: string): Promise<string | null> => {
    try {
      const response = await useSearchWords.fetcher({
        search: word,
        page_size: 10,
      });
      
      // Find exact match (case-insensitive)
      const exactMatch = response.items.find(
        (item) => item.word.toLowerCase() === word.toLowerCase()
      );
      
      return exactMatch?.id || null;
    } catch (error) {
      console.error('Failed to fetch existing word ID:', error);
      return null;
    }
  };

  const handleSaveWord = async () => {
    if (!data) return;

    try {
      const result = await addWordMutation.mutateAsync({
        word: data.word,
        definition: data.definition,
        mnemonic: data.mnemonic,
        sentence: data.sentence,
        synonyms: data.synonyms,
        audio_url: data.audio_url ?? undefined,
      });

      setSavedWordId(result.id);
      setIsSaved(true);
      Alert.alert(
        'Word Saved! 📚',
        `"${data.word}" has been added to your word bank.`
      );
    } catch (error: any) {
      const message = error.response?.data?.detail || 'Failed to save word';
      if (typeof message === 'string' && message.includes('already')) {
        // Fetch the existing word ID so reviews can work
        const existingWordId = await fetchExistingWordId(data.word);
        
        if (existingWordId) {
          setSavedWordId(existingWordId);
          setIsSaved(true);
          Alert.alert(
            'Already Saved',
            `"${data.word}" is already in your word bank.`
          );
        } else {
          Alert.alert(
            'Error',
            'This word already exists but could not be loaded. Please try searching for it in your word bank.'
          );
        }
      } else {
        Alert.alert('Error', 'Failed to save word. Please try again.');
      }
    }
  };

  const iconColor = colorScheme === 'dark' ? '#d4d4d4' : '#525252';
  const bookmarkColor = isSaved ? '#6366f1' : iconColor;

  // Loading state
  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <ActivityIndicator size="large" color="#6366f1" />
        <Text className="mt-4 text-neutral-500">
          Generating word details...
        </Text>
      </View>
    );
  }

  // Error state
  if (isError || !data) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <Text className="text-lg text-red-500">Failed to load word</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 rounded-xl bg-neutral-100 px-6 py-3 dark:bg-neutral-800"
        >
          <Text className="text-neutral-900 dark:text-white">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
        {/* Header */}
        <FadeInView
          delay={0}
          className="flex-row items-center justify-between px-4 py-2"
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full active:bg-neutral-100 dark:active:bg-neutral-800"
          >
            <ArrowLeft size={24} color={iconColor} />
          </TouchableOpacity>

          {/* Save/Bookmark Button */}
          <TouchableOpacity
            onPress={handleSaveWord}
            disabled={addWordMutation.isPending || isSaved}
            className={`h-10 w-10 items-center justify-center rounded-full active:bg-neutral-100 dark:active:bg-neutral-800 ${addWordMutation.isPending ? 'opacity-50' : ''}`}
          >
            {addWordMutation.isPending ? (
              <ActivityIndicator size="small" color="#6366f1" />
            ) : isSaved ? (
              <BookmarkCheck size={24} color="#6366f1" />
            ) : (
              <Bookmark size={24} color={bookmarkColor} />
            )}
          </TouchableOpacity>
        </FadeInView>

        {/* Content */}
        <View className="flex-1 pt-2">
          <SlideUpCard delay={100}>
            <WordHero
              word={data.word}
              phonetic={data.audio_url ? '🔊' : ''}
              mnemonic={data.mnemonic}
            />
          </SlideUpCard>

          <FadeInView delay={200} className="flex-1">
            <WordDefinition
              definition={data.definition}
              translation={data.synonyms.join(', ') || 'No synonyms available'}
              examples={data.sentence ? [data.sentence] : []}
            />
          </FadeInView>
        </View>

        {/* SRS Action Bar (Fixed at bottom) */}
        <SlideUpCard delay={300}>
          <SRSActionBar
            wordId={savedWordId ?? undefined}
            onReviewComplete={() => router.back()}
          />
        </SlideUpCard>
      </SafeAreaView>
    </View>
  );
}
