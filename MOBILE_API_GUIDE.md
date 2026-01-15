# Vocab App - Mobile API Guide

> **Complete API Reference for Mobile Developers** — All endpoints with TypeScript definitions and mobile-specific considerations.

## Table of Contents

1. [Base URL & Authentication](#base-url--authentication)
2. [Authentication Endpoints](#authentication-endpoints)
3. [Word Generation](#word-generation)
4. [Word Bank](#word-bank)
5. [Spaced Repetition Reviews](#spaced-repetition-reviews)
6. [Analytics](#analytics)
7. [Word Packs](#word-packs)
8. [Quiz System](#quiz-system)
9. [Subscription Status](#subscription-status)
10. [Error Handling](#error-handling)
11. [TypeScript Interfaces](#typescript-interfaces)

---

## Base URL & Authentication

### Base URL

```
https://your-api-domain.com/api
```

### Authentication

**Mobile apps use Bearer Token authentication.**

After login, store the `access_token` securely (Keychain/Keystore) and include it in the `Authorization` header for all authenticated requests:

```typescript
headers: {
  'Authorization': `Bearer ${accessToken}`
}
```

> **IMPORTANT:** Unlike web clients that use HTTP-only cookies, mobile apps must include the Bearer token in every request.

---

## Authentication Endpoints

### POST `/login`

Login with email and password. Returns a Bearer token for mobile apps.

**Request Body:**

```typescript
interface LoginRequest {
  email: string;
  password: string;
}
```

**Response (200 OK):**

```typescript
interface LoginResponse {
  access_token: string;
  token_type: "bearer";
}
```

**Example:**

```typescript
const response = await fetch('https://api.example.com/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'secure_password'
  })
});

const data: LoginResponse = await response.json();
// Store data.access_token securely
```

---

### POST `/register`

Create a new user account.

**Request Body:**

```typescript
interface RegisterRequest {
  email: string;
  password: string;
  full_name?: string;
}
```

**Response (201 Created):**

```typescript
interface RegisterResponse {
  id: string;
  email: string;
  message: string;
}
```

---

### POST `/google`

Authenticate with Google ID token (supports Android and iOS).

**Request Body:**

```typescript
interface GoogleAuthRequest {
  id_token: string;  // Google ID token from Sign-In SDK
}
```

**Response (200 OK):**

```typescript
interface GoogleAuthResponse {
  access_token: string;
  token_type: "bearer";
  is_new_user: boolean;
}
```

**Integration Guide:**

| Platform | SDK                             | How to Get ID Token                |
|----------|---------------------------------|-------------------------------------|
| Android  | Google Sign-In for Android      | `GoogleSignInAccount.idToken`       |
| iOS      | Google Sign-In for iOS          | `GIDGoogleUser.authentication.idToken` |
| React Native| `@react-native-google-signin/google-signin` | `userInfo.idToken` |

**Android Example:**

```kotlin
val account = GoogleSignIn.getSignedInAccountFromIntent(data).getResult(Task::class.java)
val idToken = account.idToken

// Send to your API
val response = apiService.googleAuth(GoogleAuthRequest(idToken))
```

**iOS Example:**

```swift
let user = GIDSignIn.sharedInstance().currentUser
let idToken = user.authentication.idToken

// Send to your API
let response = try await apiService.googleAuth(idToken: idToken)
```

---

### POST `/forgot-password`

Request a password reset email.

**Request Body:**

```typescript
interface ForgotPasswordRequest {
  email: string;
}
```

**Response (200 OK):**

```typescript
interface ForgotPasswordResponse {
  message: string;
}
```

> **Note:** Always returns success to prevent email enumeration.

---

### POST `/reset-password`

Reset password using token from email.

**Request Body:**

```typescript
interface ResetPasswordRequest {
  token: string;
  new_password: string;
  confirm_password: string;
}
```

---

### POST `/logout`

Logout current user.

**Response (200 OK):**

```typescript
interface LogoutResponse {
  message: string;
}
```

> **Mobile:** Clear the stored access token from secure storage.

---

### GET `/me`

Get current authenticated user info.

**Response (200 OK):**

```typescript
interface UserResponse {
  id: string;
  email: string;
  full_name: string | null;
  is_premium: boolean;
  created_at: string;
}
```

---

## Word Generation

### POST `/v1/word/generate`

Generate word definition, mnemonic, and synonyms using AI.

**Rate Limit:** 100 requests per day per user (authenticated), 10 per day for unauthenticated.

**Request Body:**

```typescript
interface WordGenerateRequest {
  word: string;
}
```

**Response (200 OK):**

```typescript
interface WordGenerateResponse {
  word: string;
  definition: string;
  mnemonic: string;
  sentence: string;
  synonyms: string[];
  audio_url: string | null;
  is_cached: boolean;
}
```

**Example:**

```typescript
const response = await fetch('https://api.example.com/api/v1/word/generate', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ word: 'ephemeral' })
});
```

---

## Word Bank

All Word Bank endpoints require authentication.

### POST `/v1/words/`

Add a word to user's personal word bank.

**Request Body:**

```typescript
interface AddWordRequest {
  word: string;
  definition: string;
  mnemonic?: string;
  sentence?: string;
  synonyms?: string[];
  audio_url?: string;
}
```

**Response (201 Created):**

```typescript
interface UserWordResponse {
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
  next_review_date: string;  // ISO 8601 datetime
  last_reviewed_at: string | null;
  created_at: string;
}
```

---

### GET `/v1/words/`

List words in user's word bank with pagination.

**Query Parameters:**

| Parameter | Type   | Default | Constraints      | Description                    |
|-----------|--------|---------|------------------|--------------------------------|
| `page`    | int    | 1       | >= 1             | Page number                    |
| `page_size` | int  | 20      | 1-100            | Items per page                 |
| `search`  | string | null    | max 255 chars    | Search filter on word text     |
| `due_only` | bool  | false   | -                | Show only words due for review |

**Response (200 OK):**

```typescript
interface WordBankListResponse {
  items: UserWordResponse[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}
```

**Example:**

```typescript
const response = await fetch(
  'https://api.example.com/api/v1/words/?page=1&page_size=20&due_only=true',
  {
    headers: { 'Authorization': `Bearer ${token}` }
  }
);
```

---

### GET `/v1/words/{word_id}/`

Get a specific word by ID.

**Response (200 OK):**

```typescript
interface UserWordResponse {
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
```

---

### PATCH `/v1/words/{word_id}/`

Update a word in the word bank (partial update).

**Request Body:** All fields are optional.

```typescript
interface UpdateWordRequest {
  definition?: string;
  mnemonic?: string;
  sentence?: string;
  synonyms?: string[];
  audio_url?: string;
}
```

**Response (200 OK):** Returns updated `UserWordResponse`.

---

### DELETE `/v1/words/{word_id}/`

Remove a word from the word bank.

**Response (204 No Content):** Empty body.

---

## Spaced Repetition Reviews

### GET `/v1/reviews/due/`

Get all words due for review today or earlier.

**Response (200 OK):**

```typescript
interface DueReviewsResponse {
  items: Array<{
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
  }>;
  total: number;
}
```

---

### POST `/v1/reviews/`

Submit a review for a word using the SM-2 algorithm.

**Request Body:**

```typescript
interface SubmitReviewRequest {
  word_id: string;
  quality: number;  // 0-5 rating scale
}
```

**Quality Rating Scale:**

| Quality | Meaning                           |
|---------|-----------------------------------|
| 0       | Complete blackout                 |
| 1       | Incorrect, remembered upon seeing |
| 2       | Incorrect, but seemed easy        |
| 3       | Correct with difficulty           |
| 4       | Correct with hesitation           |
| 5       | Perfect recall                    |

**Response (200 OK):**

```typescript
interface SubmitReviewResponse {
  word_id: string;
  word: string;
  next_review_date: string;
  easiness_factor: number;
  interval: number;
  repetitions: number;
  message: string;
}
```

> **IMPORTANT:** The `next_review_date` is calculated by the backend using the SM-2 algorithm. Never calculate review dates on the client.

---

## Analytics

### GET `/v1/analytics/`

Get complete learning analytics for the authenticated user.

**Response (200 OK):**

```typescript
interface AnalyticsResponse {
  overall: {
    total_words: number;
    words_mastered: number;      // repetitions >= 5
    words_learning: number;      // 0 < repetitions < 5
    words_new: number;           // repetitions == 0
    average_easiness_factor: number;
    total_reviews: number;
    streak_days: number;
  };
  last_7_days: DailyStats[];
  retention_trend: RetentionData[];
  heatmap: HeatmapData[];
  streak_days: number;
  words_due_today: number;
}

interface DailyStats {
  date: string;           // ISO date (YYYY-MM-DD)
  words_reviewed: number;
  words_learned: number;
  correct_count: number;
  incorrect_count: number;
}

interface RetentionData {
  date: string;
  retention_rate: number;  // 0.0 - 1.0
  words_reviewed: number;
}

interface HeatmapData {
  date: string;
  intensity: number;       // 0-4 (like GitHub contributions)
  reviews_count: number;
}
```

---

### GET `/v1/analytics/streak/`

Get current and longest streak information.

**Response (200 OK):**

```typescript
interface StreakResponse {
  current_streak: number;
  longest_streak: number;
  last_review_date: string;  // ISO date (YYYY-MM-DD)
}
```

---

## Word Packs

### GET `/v1/packs/`

List available word packs with optional filters.

**Query Parameters:**

| Parameter   | Type    | Default | Description                          |
|-------------|---------|---------|--------------------------------------|
| `page`      | int     | 1       | Page number (>= 1)                   |
| `page_size` | int     | 20      | Items per page (1-100)               |
| `category`  | string  | null    | Filter by category                   |
| `difficulty` | string | null    | Filter by difficulty                 |
| `search`    | string  | null    | Search in name/description           |
| `is_premium` | bool   | null    | Filter by premium status             |

**Categories:** `exam_prep`, `career`, `academic`, `casual`, `specialized`

**Difficulty Levels:** `beginner`, `intermediate`, `advanced`

**Response (200 OK):**

```typescript
interface WordPackListResponse {
  items: WordPackSummary[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

interface WordPackSummary {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  difficulty: string;
  word_count: number;
  is_system: boolean;
  is_premium: boolean;
  subscriber_count: number;
  average_rating: number;
}
```

---

### GET `/v1/packs/{pack_id}/`

Get detailed information about a word pack.

**Authentication:** Optional (required for premium packs)

**Response (200 OK):**

```typescript
interface WordPackDetail extends WordPackSummary {
  words: PackWord[];
  created_at: string;
}

interface PackWord {
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
```

---

### GET `/v1/packs/by-slug/{slug}/`

Get a word pack by its URL-friendly slug.

**Response (200 OK):** Same as `/v1/packs/{pack_id}/`

---

### GET `/v1/packs/{pack_id}/words/`

Get paginated list of words in a pack.

**Authentication:** Optional (required for premium packs)

**Query Parameters:** `page`, `page_size` (same as list endpoint)

**Response (200 OK):**

```typescript
interface PackWordListResponse {
  items: PackWord[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  pack_name: string;
  pack_id: string;
}
```

---

### GET `/v1/packs/{pack_id}/words/{word_id}/`

Get detailed information about a specific word within a pack.

**Authentication:** Optional (required for premium packs)

**Response (200 OK):**

```typescript
interface PackWordDetailResponse {
  // Word details
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

  // Pack context
  pack_id: string;
  pack_name: string;
  pack_slug: string;

  // Navigation
  total_words: number;
  previous_word_id: string | null;
  next_word_id: string | null;

  // Learning status (if authenticated)
  is_in_word_bank: boolean;
  word_bank_word_id: string | null;
  learning_status: {
    easiness_factor: number;
    interval: number;
    repetitions: number;
    next_review_date: string;
  } | null;
}
```

---

### GET `/v1/packs/subscriptions/`

List all word packs the user is subscribed to.

**Authentication:** Required

**Response (200 OK):**

```typescript
interface UserSubscriptionsResponse {
  items: SubscriptionResponse[];
  total: number;
}

interface SubscriptionResponse {
  id: string;
  pack_id: string;
  pack_name: string;
  words_started: number;
  words_mastered: number;
  is_active: boolean;
  subscribed_at: string;
}
```

---

### POST `/v1/packs/subscriptions/`

Subscribe to a word pack to track progress.

**Authentication:** Required

**Request Body:**

```typescript
interface SubscribeRequest {
  pack_id: string;
}
```

**Response (201 Created):** Returns `SubscriptionResponse`

---

### DELETE `/v1/packs/subscriptions/{pack_id}/`

Unsubscribe from a word pack.

**Authentication:** Required

**Response (204 No Content):** Empty body.

---

### POST `/v1/packs/add-to-bank/`

Add words from a pack to user's personal word bank.

**Authentication:** Required

**Request Body:**

```typescript
interface AddPackWordsRequest {
  pack_id: string;
  word_ids?: string[];  // Optional: specific words to add
  limit?: number;       // Optional: limit number of words (1-50)
}
```

**Response (201 Created):**

```typescript
interface AddPackWordsResponse {
  added_count: number;
  skipped_count: number;  // Words already in bank
  message: string;
}
```

---

## Quiz System

### POST `/v1/quizzes/generate/`

Generate a quiz session.

**Authentication:** Required

**Request Body:**

```typescript
interface GenerateQuizRequest {
  quiz_type: "definition_match" | "synonym_match" | "antonym_match" |
             "fill_in_blank" | "multiple_choice" | "speed_round";
  word_count: number;          // 5-50
  time_limit_seconds?: number; // 30-600 (optional)
  pack_id?: string;            // UUID (optional, uses word bank if omitted)
}
```

**Response (201 Created):**

```typescript
interface GenerateQuizResponse {
  session_id: string;
  quiz_type: string;
  questions: QuizQuestion[];
  word_count: number;
  time_limit_seconds: number | null;
  started_at: string;  // ISO datetime
}

interface QuizQuestion {
  id: string;
  question_number: number;
  word: string;
  question_text: string;
  options: string[];  // Always 4 options
  max_points: number;
}
```

---

### POST `/v1/quizzes/submit/`

Submit quiz answers for scoring.

**Authentication:** Required

**Request Body:**

```typescript
interface SubmitQuizRequest {
  session_id: string;
  answers: QuestionAnswer[];
}

interface QuestionAnswer {
  question_id: string;
  answer_index: number;     // 0-3 (index of selected option)
  time_taken_ms?: number;   // Optional, for speed bonus calculation
}
```

**Response (200 OK):**

```typescript
interface SubmitQuizResponse {
  session_id: string;
  score: number;
  max_score: number;
  correct_count: number;
  incorrect_count: number;
  accuracy: number;         // 0.0 - 1.0
  time_taken_seconds: number;
  results: QuestionResult[];
  message: string;
}

interface QuestionResult {
  question_id: string;
  word: string;
  correct_answer: string;
  user_answer: string;
  is_correct: boolean;
  points_earned: number;
}
```

---

### GET `/v1/quizzes/history/`

Get user's quiz history with pagination.

**Authentication:** Required

**Query Parameters:** `page`, `page_size` (same as word list)

**Response (200 OK):**

```typescript
interface QuizHistoryResponse {
  items: QuizHistoryItem[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

interface QuizHistoryItem {
  session_id: string;
  quiz_type: string;
  score: number;
  max_score: number;
  accuracy: number;
  completed_at: string;
}
```

---

### GET `/v1/quizzes/stats/`

Get user's quiz statistics.

**Authentication:** Required

**Response (200 OK):**

```typescript
interface UserQuizStats {
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
```

---

### GET `/v1/quizzes/leaderboard/`

Get quiz leaderboard rankings.

**Authentication:** Required

**Query Parameters:**

| Parameter | Type   | Default | Values                          |
|-----------|--------|---------|---------------------------------|
| `period`  | string | weekly  | `weekly`, `monthly`, `all_time` |
| `limit`   | int    | 10      | 1-100                           |

**Response (200 OK):**

```typescript
interface LeaderboardResponse {
  period: string;
  entries: LeaderboardEntry[];
}

interface LeaderboardEntry {
  rank: number;
  user_id: string;
  username: string;
  score: number;
  quizzes_completed: number;
}
```

---

## Subscription Status

### GET `/webhooks/subscription-status/`

Get current user's premium subscription status.

**Authentication:** Required

**Response (200 OK):**

```typescript
interface SubscriptionStatusResponse {
  is_premium: boolean;
  subscription_status: "free" | "active" | "cancelled" | "expired";
  subscription_ends_at: string | null;
}
```

**Status Values:**

| Status     | Description                                     |
|------------|-------------------------------------------------|
| `free`     | No subscription                                 |
| `active`   | Active premium subscription                     |
| `cancelled`| Subscription cancelled (access until `ends_at`) |
| `expired`  | Subscription expired                            |

---

## Error Handling

### Error Response Format

```typescript
interface ErrorResponse {
  error?: string;
  detail: string | Record<string, string>;
}
```

### HTTP Status Codes

| Status Code | Meaning                                         |
|-------------|-------------------------------------------------|
| 200         | Success                                         |
| 201         | Created                                         |
| 204         | No Content (successful DELETE)                  |
| 400         | Bad Request / Validation Error                  |
| 401         | Not Authenticated (missing/invalid token)       |
| 403         | Forbidden (premium feature without subscription)|
| 404         | Resource Not Found                              |
| 422         | Unprocessable Entity (validation failed)        |
| 500         | Internal Server Error                           |

---

## TypeScript Interfaces

Copy and paste these interfaces into your mobile project:

```typescript
// ============================================
// Base Types
// ============================================

type QuizType = "definition_match" | "synonym_match" | "antonym_match" |
               "fill_in_blank" | "multiple_choice" | "speed_round";

type PackCategory = "exam_prep" | "career" | "academic" | "casual" | "specialized";

type PackDifficulty = "beginner" | "intermediate" | "advanced";

type SubscriptionStatus = "free" | "active" | "cancelled" | "expired";

// ============================================
// Authentication
// ============================================

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  token_type: "bearer";
}

interface RegisterRequest {
  email: string;
  password: string;
  full_name?: string;
}

interface GoogleAuthRequest {
  id_token: string;
}

interface GoogleAuthResponse {
  access_token: string;
  token_type: "bearer";
  is_new_user: boolean;
}

interface UserResponse {
  id: string;
  email: string;
  full_name: string | null;
  is_premium: boolean;
  created_at: string;
}

// ============================================
// Word Generation
// ============================================

interface WordGenerateRequest {
  word: string;
}

interface WordGenerateResponse {
  word: string;
  definition: string;
  mnemonic: string;
  sentence: string;
  synonyms: string[];
  audio_url: string | null;
  is_cached: boolean;
}

// ============================================
// Word Bank
// ============================================

interface AddWordRequest {
  word: string;
  definition: string;
  mnemonic?: string;
  sentence?: string;
  synonyms?: string[];
  audio_url?: string;
}

interface UpdateWordRequest {
  definition?: string;
  mnemonic?: string;
  sentence?: string;
  synonyms?: string[];
  audio_url?: string;
}

interface UserWordResponse {
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

interface WordBankListResponse {
  items: UserWordResponse[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

// ============================================
// Reviews
// ============================================

interface SubmitReviewRequest {
  word_id: string;
  quality: number; // 0-5
}

interface SubmitReviewResponse {
  word_id: string;
  word: string;
  next_review_date: string;
  easiness_factor: number;
  interval: number;
  repetitions: number;
  message: string;
}

interface DueReviewsResponse {
  items: Array<{
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
  }>;
  total: number;
}

// ============================================
// Analytics
// ============================================

interface AnalyticsResponse {
  overall: {
    total_words: number;
    words_mastered: number;
    words_learning: number;
    words_new: number;
    average_easiness_factor: number;
    total_reviews: number;
    streak_days: number;
  };
  last_7_days: DailyStats[];
  retention_trend: RetentionData[];
  heatmap: HeatmapData[];
  streak_days: number;
  words_due_today: number;
}

interface DailyStats {
  date: string;
  words_reviewed: number;
  words_learned: number;
  correct_count: number;
  incorrect_count: number;
}

interface RetentionData {
  date: string;
  retention_rate: number;
  words_reviewed: number;
}

interface HeatmapData {
  date: string;
  intensity: number;
  reviews_count: number;
}

interface StreakResponse {
  current_streak: number;
  longest_streak: number;
  last_review_date: string;
}

// ============================================
// Word Packs
// ============================================

interface WordPackSummary {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  difficulty: string;
  word_count: number;
  is_system: boolean;
  is_premium: boolean;
  subscriber_count: number;
  average_rating: number;
}

interface WordPackDetail extends WordPackSummary {
  words: PackWord[];
  created_at: string;
}

interface PackWord {
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

interface WordPackListResponse {
  items: WordPackSummary[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

interface PackWordListResponse {
  items: PackWord[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  pack_name: string;
  pack_id: string;
}

interface PackWordDetailResponse {
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
  pack_id: string;
  pack_name: string;
  pack_slug: string;
  total_words: number;
  previous_word_id: string | null;
  next_word_id: string | null;
  is_in_word_bank: boolean;
  word_bank_word_id: string | null;
  learning_status: {
    easiness_factor: number;
    interval: number;
    repetitions: number;
    next_review_date: string;
  } | null;
}

interface SubscribeRequest {
  pack_id: string;
}

interface SubscriptionResponse {
  id: string;
  pack_id: string;
  pack_name: string;
  words_started: number;
  words_mastered: number;
  is_active: boolean;
  subscribed_at: string;
}

interface UserSubscriptionsResponse {
  items: SubscriptionResponse[];
  total: number;
}

interface AddPackWordsRequest {
  pack_id: string;
  word_ids?: string[];
  limit?: number;
}

interface AddPackWordsResponse {
  added_count: number;
  skipped_count: number;
  message: string;
}

// ============================================
// Quiz
// ============================================

interface GenerateQuizRequest {
  quiz_type: QuizType;
  word_count: number;
  time_limit_seconds?: number;
  pack_id?: string;
}

interface QuizQuestion {
  id: string;
  question_number: number;
  word: string;
  question_text: string;
  options: string[];
  max_points: number;
}

interface GenerateQuizResponse {
  session_id: string;
  quiz_type: string;
  questions: QuizQuestion[];
  word_count: number;
  time_limit_seconds: number | null;
  started_at: string;
}

interface QuestionAnswer {
  question_id: string;
  answer_index: number;
  time_taken_ms?: number;
}

interface SubmitQuizRequest {
  session_id: string;
  answers: QuestionAnswer[];
}

interface QuestionResult {
  question_id: string;
  word: string;
  correct_answer: string;
  user_answer: string;
  is_correct: boolean;
  points_earned: number;
}

interface SubmitQuizResponse {
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

interface QuizHistoryItem {
  session_id: string;
  quiz_type: string;
  score: number;
  max_score: number;
  accuracy: number;
  completed_at: string;
}

interface QuizHistoryResponse {
  items: QuizHistoryItem[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

interface UserQuizStats {
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

interface LeaderboardEntry {
  rank: number;
  user_id: string;
  username: string;
  score: number;
  quizzes_completed: number;
}

// ============================================
// Subscription
// ============================================

interface SubscriptionStatusResponse {
  is_premium: boolean;
  subscription_status: SubscriptionStatus;
  subscription_ends_at: string | null;
}
```

---

## Quick Reference

| Endpoint                      | Method | Auth   | Description                        |
|-------------------------------|--------|--------|------------------------------------|
| `/login`                      | POST   | No     | Email/password login               |
| `/register`                   | POST   | No     | Create account                     |
| `/google`                     | POST   | No     | Google OAuth (Android/iOS)         |
| `/logout`                     | POST   | No     | Logout                             |
| `/forgot-password`            | POST   | No     | Request password reset             |
| `/reset-password`             | POST   | No     | Reset password with token          |
| `/me`                         | GET    | Yes    | Get current user                   |
| `/v1/word/generate`           | POST   | Optional | Generate AI word data           |
| `/v1/words/`                  | POST   | Yes    | Add word to bank                   |
| `/v1/words/`                  | GET    | Yes    | List words in bank                 |
| `/v1/words/{id}/`             | GET    | Yes    | Get specific word                  |
| `/v1/words/{id}/`             | PATCH  | Yes    | Update word                        |
| `/v1/words/{id}/`             | DELETE | Yes    | Delete word                        |
| `/v1/reviews/due/`            | GET    | Yes    | Get words due for review           |
| `/v1/reviews/`                | POST   | Yes    | Submit review                      |
| `/v1/analytics/`              | GET    | Yes    | Get analytics                      |
| `/v1/analytics/streak/`       | GET    | Yes    | Get streak info                    |
| `/v1/packs/`                  | GET    | No     | List word packs                    |
| `/v1/packs/{id}/`             | GET    | Optional | Get pack details               |
| `/v1/packs/by-slug/{slug}/`   | GET    | Optional | Get pack by slug               |
| `/v1/packs/{id}/words/`       | GET    | Optional | Get pack words                  |
| `/v1/packs/{id}/words/{wid}/` | GET    | Optional | Get pack word detail          |
| `/v1/packs/subscriptions/`    | GET    | Yes    | List subscriptions                 |
| `/v1/packs/subscriptions/`    | POST   | Yes    | Subscribe to pack                  |
| `/v1/packs/subscriptions/{id}/`| DELETE | Yes   | Unsubscribe from pack              |
| `/v1/packs/add-to-bank/`      | POST   | Yes    | Add pack words to bank             |
| `/v1/quizzes/generate/`       | POST   | Yes    | Generate quiz                      |
| `/v1/quizzes/submit/`         | POST   | Yes    | Submit quiz answers                |
| `/v1/quizzes/history/`        | GET    | Yes    | Get quiz history                   |
| `/v1/quizzes/stats/`          | GET    | Yes    | Get quiz stats                     |
| `/v1/quizzes/leaderboard/`    | GET    | Yes    | Get leaderboard                    |
| `/webhooks/subscription-status/`| GET  | Yes    | Get subscription status            |

---

## Auto-Generated Documentation

FastAPI automatically generates interactive API documentation:

- **Swagger UI**: `https://your-api-domain.com/docs`
- **ReDoc**: `https://your-api-domain.com/redoc`

These provide interactive testing capabilities for all endpoints.
