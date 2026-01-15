// ============================================
// Pagination Types
// ============================================

export type PaginateQuery<T> = {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
};

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
};

// ============================================
// Base Types
// ============================================

export type QuizType =
  | 'definition_match'
  | 'synonym_match'
  | 'antonym_match'
  | 'fill_in_blank'
  | 'multiple_choice'
  | 'speed_round';

export type PackCategory =
  | 'exam_prep'
  | 'career'
  | 'academic'
  | 'casual'
  | 'specialized';

export type PackDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type SubscriptionStatus = 'free' | 'active' | 'cancelled' | 'expired';

// ============================================
// Authentication Types
// ============================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: 'bearer';
}

export interface RegisterRequest {
  email: string;
  password: string;
  full_name?: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  message: string;
}

export interface GoogleAuthRequest {
  id_token: string;
}

export interface GoogleAuthResponse {
  access_token: string;
  token_type: 'bearer';
  is_new_user: boolean;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordRequest {
  token: string;
  new_password: string;
  confirm_password: string;
}

export interface LogoutResponse {
  message: string;
}

export interface UserResponse {
  id: string;
  email: string;
  full_name: string | null;
  is_premium: boolean;
  created_at: string;
}

// ============================================
// Word Generation Types
// ============================================

export interface WordGenerateRequest {
  word: string;
}

export interface WordGenerateResponse {
  word: string;
  definition: string;
  mnemonic: string;
  sentence: string;
  synonyms: string[];
  audio_url: string | null;
  is_cached: boolean;
}

// ============================================
// Word Bank Types
// ============================================

export interface AddWordRequest {
  word: string;
  definition: string;
  mnemonic?: string;
  sentence?: string;
  synonyms?: string[];
  audio_url?: string;
}

export interface UpdateWordRequest {
  definition?: string;
  mnemonic?: string;
  sentence?: string;
  synonyms?: string[];
  audio_url?: string;
}

export interface UserWordResponse {
  id: string;
  word: string;
  definition: string;
  mnemonic: string | null;
  sentence: string | null;
  synonyms: string[];
  audio_url: string | null;
  easiness_factor: number;
  interval: number;
  repetitions: number;
  next_review_date: string;
  last_reviewed_at: string | null;
  created_at: string;
}

export interface WordBankListResponse extends PaginatedResponse<UserWordResponse> {}

export interface WordsListParams {
  page?: number;
  page_size?: number;
  search?: string;
  due_only?: boolean;
}

// ============================================
// Review Types
// ============================================

export type QualityRating = 0 | 1 | 2 | 3 | 4 | 5;

export interface SubmitReviewRequest {
  word_id: string;
  quality: QualityRating;
}

export interface SubmitReviewResponse {
  word_id: string;
  word: string;
  next_review_date: string;
  easiness_factor: number;
  interval: number;
  repetitions: number;
  message: string;
}

export interface DueReviewItem {
  id: string;
  word: string;
  definition: string;
  mnemonic: string | null;
  synonyms: string[];
  audio_url: string | null;
  easiness_factor: number;
  interval: number;
  repetitions: number;
  next_review_date: string;
}

export interface DueReviewsResponse {
  items: DueReviewItem[];
  total: number;
}

// ============================================
// Analytics Types
// ============================================

export interface DailyStats {
  date: string;
  words_reviewed: number;
  words_learned: number;
  correct_count: number;
  incorrect_count: number;
}

export interface RetentionData {
  date: string;
  retention_rate: number;
  words_reviewed: number;
}

export interface HeatmapData {
  date: string;
  intensity: number;
  reviews_count: number;
}

export interface OverallStats {
  total_words: number;
  words_mastered: number;
  words_learning: number;
  words_new: number;
  average_easiness_factor: number;
  total_reviews: number;
  streak_days: number;
}

export interface AnalyticsResponse {
  overall: OverallStats;
  last_7_days: DailyStats[];
  retention_trend: RetentionData[];
  heatmap: HeatmapData[];
  streak_days: number;
  words_due_today: number;
}

export interface StreakResponse {
  current_streak: number;
  longest_streak: number;
  last_review_date: string;
}

// ============================================
// Word Packs Types
// ============================================

export interface WordPackSummary {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: PackCategory;
  difficulty: PackDifficulty;
  word_count: number;
  is_system: boolean;
  is_premium: boolean;
  subscriber_count: number;
  average_rating: number;
}

export interface PackWord {
  id: string;
  word: string;
  definition: string;
  mnemonic: string | null;
  sentence: string | null;
  synonyms: string[];
  antonyms: string[];
  etymology: string | null;
  audio_url: string | null;
  order_index: number;
}

export interface WordPackDetail extends WordPackSummary {
  words: PackWord[];
  created_at: string;
}

export interface WordPackListResponse extends PaginatedResponse<WordPackSummary> {}

export interface WordPackListParams {
  page?: number;
  page_size?: number;
  category?: PackCategory;
  difficulty?: PackDifficulty;
  search?: string;
  is_premium?: boolean;
}

export interface PackWordListResponse extends PaginatedResponse<PackWord> {
  pack_name: string;
  pack_id: string;
}

export interface LearningStatus {
  easiness_factor: number;
  interval: number;
  repetitions: number;
  next_review_date: string;
}

export interface PackWordDetailResponse extends PackWord {
  pack_id: string;
  pack_name: string;
  pack_slug: string;
  total_words: number;
  previous_word_id: string | null;
  next_word_id: string | null;
  is_in_word_bank: boolean;
  word_bank_word_id: string | null;
  learning_status: LearningStatus | null;
}

export interface SubscribeRequest {
  pack_id: string;
}

export interface SubscriptionResponse {
  id: string;
  pack_id: string;
  pack_name: string;
  words_started: number;
  words_mastered: number;
  is_active: boolean;
  subscribed_at: string;
}

export interface UserSubscriptionsResponse {
  items: SubscriptionResponse[];
  total: number;
}

export interface AddPackWordsRequest {
  pack_id: string;
  word_ids?: string[];
  limit?: number;
}

export interface AddPackWordsResponse {
  added_count: number;
  skipped_count: number;
  message: string;
}

// ============================================
// Quiz Types
// ============================================

export interface GenerateQuizRequest {
  quiz_type: QuizType;
  word_count: number;
  time_limit_seconds?: number;
  pack_id?: string;
}

export interface QuizQuestion {
  id: string;
  question_number: number;
  word: string;
  question_text: string;
  options: string[];
  max_points: number;
}

export interface GenerateQuizResponse {
  session_id: string;
  quiz_type: QuizType;
  questions: QuizQuestion[];
  word_count: number;
  time_limit_seconds: number | null;
  started_at: string;
}

export interface QuestionAnswer {
  question_id: string;
  answer_index: number;
  time_taken_ms?: number;
}

export interface SubmitQuizRequest {
  session_id: string;
  answers: QuestionAnswer[];
}

export interface QuestionResult {
  question_id: string;
  word: string;
  correct_answer: string;
  user_answer: string;
  is_correct: boolean;
  points_earned: number;
}

export interface SubmitQuizResponse {
  session_id: string;
  score: number;
  max_score: number;
  correct_count: number;
  incorrect_count: number;
  accuracy: number;
  time_taken_seconds: number;
  results: QuestionResult[];
  message: string;
}

export interface QuizHistoryItem {
  session_id: string;
  quiz_type: QuizType;
  score: number;
  max_score: number;
  accuracy: number;
  completed_at: string;
}

export interface QuizHistoryResponse extends PaginatedResponse<QuizHistoryItem> {}

export interface UserQuizStats {
  total_quizzes: number;
  total_score: number;
  total_correct: number;
  total_questions: number;
  average_accuracy: number;
  best_streak: number;
  weekly_score: number;
  monthly_score: number;
  last_quiz_at: string | null;
}

export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  username: string;
  score: number;
  quizzes_completed: number;
}

export interface LeaderboardResponse {
  period: 'weekly' | 'monthly' | 'all_time';
  entries: LeaderboardEntry[];
}

// ============================================
// Subscription Status Types
// ============================================

export interface SubscriptionStatusResponse {
  is_premium: boolean;
  subscription_status: SubscriptionStatus;
  subscription_ends_at: string | null;
}

// ============================================
// Error Types
// ============================================

export interface ApiError {
  error?: string;
  detail: string | Record<string, string>;
}
