import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { useQuizStats } from '@/api/quiz';
import { Text } from '@/components/ui';

import { Item } from './item';
import { ItemsContainer } from './items-container';

export const QuizStats = () => {
  const router = useRouter();
  const { data: quizStats } = useQuizStats();

  const handleQuizPress = () => {
    router.push('/quiz' as any);
  };

  if (!quizStats) {
    return null;
  }

  return (
    <ItemsContainer title="settings.quiz_stats">
      <Item
        text="settings.quizzes_completed"
        value={String(quizStats.total_quizzes)}
      />
      <Item
        text="settings.average_accuracy"
        value={`${Math.round(quizStats.average_accuracy * 100)}%`}
      />
      <Item text="settings.best_streak" value={`${quizStats.best_streak} 🔥`} />
      <TouchableOpacity
        onPress={handleQuizPress}
        className="mx-4 my-3 items-center rounded-xl bg-indigo-600 py-3 active:bg-indigo-700"
      >
        <Text className="font-semibold text-white">Take a Quiz</Text>
      </TouchableOpacity>
    </ItemsContainer>
  );
};
