import { useRouter } from 'expo-router';
import { ArrowLeft, Clock, Trophy, Zap } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { useGenerateQuiz, useSubmitQuiz } from '@/api/quiz';
import type {
  QuestionAnswer,
  QuizQuestion,
  QuizType,
  SubmitQuizResponse,
} from '@/api/types';
import { FadeInView, SlideUpCard } from '@/components/animations';
import { FocusAwareStatusBar, SafeAreaView, Text, View } from '@/components/ui';

const QUIZ_TYPES: {
  type: QuizType;
  label: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    type: 'definition_match',
    label: 'Definition Match',
    icon: <Zap size={24} color="#6366f1" />,
    color: 'bg-indigo-100 dark:bg-indigo-900/30',
  },
  {
    type: 'synonym_match',
    label: 'Synonym Match',
    icon: <Zap size={24} color="#10b981" />,
    color: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
  {
    type: 'multiple_choice',
    label: 'Multiple Choice',
    icon: <Trophy size={24} color="#f59e0b" />,
    color: 'bg-amber-100 dark:bg-amber-900/30',
  },
  {
    type: 'speed_round',
    label: 'Speed Round',
    icon: <Clock size={24} color="#ef4444" />,
    color: 'bg-red-100 dark:bg-red-900/30',
  },
];

function QuizTypeSelector({
  onSelect,
}: {
  onSelect: (type: QuizType) => void;
}) {
  return (
    <View className="flex-1 px-6 pt-8">
      <Text className="mb-2 text-3xl font-bold text-neutral-900 dark:text-white">
        Quiz Time! 🧠
      </Text>
      <Text className="mb-8 text-neutral-500 dark:text-neutral-400">
        Test your vocabulary knowledge
      </Text>

      {QUIZ_TYPES.map((quiz, index) => (
        <FadeInView key={quiz.type} delay={index * 100}>
          <TouchableOpacity
            onPress={() => onSelect(quiz.type)}
            className={`mb-4 flex-row items-center rounded-2xl p-4 ${quiz.color}`}
          >
            <View className="mr-4 h-12 w-12 items-center justify-center rounded-xl bg-white/50 dark:bg-black/20">
              {quiz.icon}
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-neutral-900 dark:text-white">
                {quiz.label}
              </Text>
              <Text className="text-sm text-neutral-600 dark:text-neutral-400">
                10 questions
              </Text>
            </View>
          </TouchableOpacity>
        </FadeInView>
      ))}
    </View>
  );
}

function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  selectedAnswer,
  isSubmitting,
}: {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (index: number) => void;
  selectedAnswer: number | null;
  isSubmitting: boolean;
}) {
  return (
    <View className="flex-1 px-6 pt-4">
      {/* Progress */}
      <View className="mb-6">
        <View className="mb-2 flex-row justify-between">
          <Text className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            Question {questionNumber} of {totalQuestions}
          </Text>
          <Text className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            {question.max_points} pts
          </Text>
        </View>
        <View className="h-2 rounded-full bg-neutral-200 dark:bg-neutral-800">
          <View
            className="h-2 rounded-full bg-indigo-600"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </View>
      </View>

      {/* Question */}
      <View className="mb-8">
        <Text className="text-2xl font-bold capitalize text-neutral-900 dark:text-white">
          {question.word}
        </Text>
        <Text className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
          {question.question_text}
        </Text>
      </View>

      {/* Options */}
      {question.options.map((option, index) => (
        <FadeInView key={index} delay={index * 50}>
          <TouchableOpacity
            onPress={() => onAnswer(index)}
            disabled={selectedAnswer !== null || isSubmitting}
            className={`mb-3 rounded-xl border-2 p-4 ${
              selectedAnswer === index
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30'
                : 'border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900'
            }`}
          >
            <View className="flex-row items-center">
              <View
                className={`h-8 w-8 items-center justify-center rounded-full ${
                  selectedAnswer === index
                    ? 'bg-indigo-600'
                    : 'bg-neutral-100 dark:bg-neutral-800'
                }`}
              >
                <Text
                  className={`font-bold ${
                    selectedAnswer === index
                      ? 'text-white'
                      : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </Text>
              </View>
              <Text className="ml-3 flex-1 text-neutral-900 dark:text-white">
                {option}
              </Text>
            </View>
          </TouchableOpacity>
        </FadeInView>
      ))}
    </View>
  );
}

function QuizResults({
  results,
  onClose,
}: {
  results: SubmitQuizResponse;
  onClose: () => void;
}) {
  const accuracyPercent = Math.round(results.accuracy * 100);

  return (
    <View className="flex-1 items-center justify-center px-6">
      <FadeInView delay={0}>
        <View className="items-center">
          <Text className="text-6xl">
            {accuracyPercent >= 70 ? '🎉' : '💪'}
          </Text>
          <Text className="mt-4 text-3xl font-bold text-neutral-900 dark:text-white">
            Quiz Complete!
          </Text>
        </View>
      </FadeInView>

      <SlideUpCard delay={200}>
        <View className="mt-8 w-full rounded-2xl bg-white p-6 dark:bg-neutral-900">
          {/* Score */}
          <View className="mb-6 items-center">
            <Text className="text-5xl font-bold text-indigo-600">
              {results.score}/{results.max_score}
            </Text>
            <Text className="mt-2 text-neutral-500 dark:text-neutral-400">
              {accuracyPercent}% accuracy
            </Text>
          </View>

          {/* Stats */}
          <View className="flex-row justify-around">
            <View className="items-center">
              <Text className="text-2xl font-bold text-green-600">
                {results.correct_count}
              </Text>
              <Text className="text-sm text-neutral-500">Correct</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-red-600">
                {results.incorrect_count}
              </Text>
              <Text className="text-sm text-neutral-500">Incorrect</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-neutral-700 dark:text-neutral-300">
                {results.time_taken_seconds}s
              </Text>
              <Text className="text-sm text-neutral-500">Time</Text>
            </View>
          </View>
        </View>
      </SlideUpCard>

      <SlideUpCard delay={400}>
        <TouchableOpacity
          onPress={onClose}
          className="mt-8 rounded-xl bg-indigo-600 px-8 py-4"
        >
          <Text className="font-semibold text-white">Back to Home</Text>
        </TouchableOpacity>
      </SlideUpCard>
    </View>
  );
}

export default function QuizScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#d4d4d4' : '#525252';

  const [stage, setStage] = useState<'select' | 'quiz' | 'results'>('select');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuestionAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number>(0);

  const generateQuizMutation = useGenerateQuiz();
  const submitQuizMutation = useSubmitQuiz();

  const quiz = generateQuizMutation.data;
  const results = submitQuizMutation.data;
  const currentQuestion = quiz?.questions[currentQuestionIndex];

  const handleSelectQuizType = async (type: QuizType) => {
    try {
      await generateQuizMutation.mutateAsync({
        quiz_type: type,
        word_count: 10,
      });
      setStage('quiz');
      setStartTime(Date.now());
    } catch (error) {
      // Handle error
    }
  };

  const handleAnswer = useCallback(
    (answerIndex: number) => {
      if (!currentQuestion) return;

      setSelectedAnswer(answerIndex);

      const timeTaken = Date.now() - startTime;
      const newAnswers = [
        ...answers,
        {
          question_id: currentQuestion.id,
          answer_index: answerIndex,
          time_taken_ms: timeTaken,
        },
      ];
      setAnswers(newAnswers);

      // Move to next question after delay
      setTimeout(async () => {
        if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
          setSelectedAnswer(null);
          setStartTime(Date.now());
        } else if (quiz) {
          // Submit quiz
          try {
            await submitQuizMutation.mutateAsync({
              session_id: quiz.session_id,
              answers: newAnswers,
            });
            setStage('results');
          } catch (error) {
            // Handle error
          }
        }
      }, 500);
    },
    [
      currentQuestion,
      quiz,
      currentQuestionIndex,
      answers,
      startTime,
      submitQuizMutation,
    ]
  );

  const handleClose = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-neutral-50 dark:bg-black">
      <FocusAwareStatusBar />
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center px-4 py-3">
          <TouchableOpacity
            onPress={handleClose}
            className="h-10 w-10 items-center justify-center rounded-full"
          >
            <ArrowLeft size={24} color={iconColor} />
          </TouchableOpacity>
          <View className="flex-1 items-center">
            <Text className="text-lg font-semibold text-neutral-900 dark:text-white">
              {stage === 'select'
                ? 'Choose Quiz'
                : stage === 'quiz'
                  ? 'Quiz'
                  : 'Results'}
            </Text>
          </View>
          <View className="h-10 w-10" />
        </View>

        {/* Content */}
        {generateQuizMutation.isPending ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#6366f1" />
            <Text className="mt-4 text-neutral-500">Generating quiz...</Text>
          </View>
        ) : stage === 'select' ? (
          <QuizTypeSelector onSelect={handleSelectQuizType} />
        ) : stage === 'quiz' && currentQuestion ? (
          <QuizQuestion
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={quiz?.questions.length ?? 0}
            onAnswer={handleAnswer}
            selectedAnswer={selectedAnswer}
            isSubmitting={submitQuizMutation.isPending}
          />
        ) : stage === 'results' && results ? (
          <QuizResults results={results} onClose={handleClose} />
        ) : null}
      </SafeAreaView>
    </View>
  );
}
