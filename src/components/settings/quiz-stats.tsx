import { useRouter } from 'expo-router';
import { CheckCircle2, Flame, Target } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { useQuizStats } from '@/api/quiz';
import { Text } from '@/components/ui';

import { Item } from './item';
import { ItemsContainer } from './items-container';

export const QuizStats = () => {
  const router = useRouter();
  const { data: quizStats } = useQuizStats();
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#a1a1aa' : '#737373';

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
        icon={<CheckCircle2 size={24} color={iconColor} />}
      />
      <Item
        text="settings.average_accuracy"
        value={`${Math.round(quizStats.average_accuracy * 100)}%`}
        icon={<Target size={24} color={iconColor} />}
      />
      <Item
        text="settings.best_streak"
        value={`${quizStats.best_streak} 🔥`}
        icon={<Flame size={24} color="#f97316" />}
      />
      <TouchableOpacity
        onPress={handleQuizPress}
        className="mx-4 my-3 items-center rounded-xl bg-indigo-600 py-3 active:bg-indigo-700"
      >
        <Text className="font-semibold text-white">Take a Quiz</Text>
      </TouchableOpacity>
    </ItemsContainer>
  );
};
