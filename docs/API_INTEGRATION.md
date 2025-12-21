# Vocab App - API Integration Guide

> **Frontend Integration Reference** — Sample requests and responses for all API endpoints.

## Base URL

```
https://your-api-domain.com/api
```

## Authentication

All vocabulary, review, analytics, and subscription endpoints require authentication via **HTTP-only cookie** (`authorization`) obtained from login.

---

## 🔐 Authentication Endpoints

### POST `/login`

Login with email and password. Sets an HTTP-only cookie.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

**Response (200 OK):**

```json
{
  "message": "login successful"
}
```

> [!NOTE]
> The `authorization` cookie is automatically set and should be included in subsequent requests.

---

### POST `/oauth-login`

OAuth2 token-based login (returns access token in body).

**Request:** `application/x-www-form-urlencoded`

```
username=user@example.com&password=your_password
```

**Response (200 OK):**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

---

### POST `/logout`

Clears the authentication cookie.

**Response (200 OK):**

```json
{
  "message": "logout successful"
}
```

---

## 📝 Word Generation

### POST `/v1/word/generate`

Generate word definition, mnemonic, and synonyms using AI.

**Request:**

```json
{
  "word": "ephemeral"
}
```

**Response (200 OK):**

```json
{
  "word": "ephemeral",
  "definition": "Lasting for a very short time; transitory.",
  "mnemonic": "Think of 'E-FEMORAL' - a femur bone that breaks and only lasts a second before healing.",
  "sentence": "The ephemeral beauty of cherry blossoms reminds us to appreciate fleeting moments.",
  "synonyms": ["transient", "fleeting", "momentary"],
  "audio_url": "https://api.dictionaryapi.dev/media/audio/ephemeral.mp3",
  "is_cached": false
}
```

| Field        | Type           | Description                   |
| ------------ | -------------- | ----------------------------- |
| `word`       | string         | The word requested            |
| `definition` | string         | Dictionary definition         |
| `mnemonic`   | string         | AI-generated memory aid       |
| `sentence`   | string         | Example sentence              |
| `synonyms`   | string[]       | Up to 3 synonyms              |
| `audio_url`  | string \| null | Pronunciation audio URL       |
| `is_cached`  | boolean        | Whether result was from cache |

---

## 📚 Word Bank _(Auth Required)_

### POST `/v1/words/`

Add a word to user's personal word bank.

**Request:**

```json
{
  "word": "ephemeral",
  "definition": "Lasting for a very short time; transitory.",
  "mnemonic": "E-FEMORAL - quick healing femur",
  "sentence": "The ephemeral beauty of spring flowers.",
  "synonyms": ["transient", "fleeting"],
  "audio_url": "https://example.com/audio.mp3"
}
```

| Field        | Type     | Required | Description             |
| ------------ | -------- | -------- | ----------------------- |
| `word`       | string   | ✅       | The vocabulary word     |
| `definition` | string   | ✅       | Word definition         |
| `mnemonic`   | string   | ❌       | Memory aid              |
| `sentence`   | string   | ❌       | Example sentence        |
| `synonyms`   | string[] | ❌       | List of synonyms        |
| `audio_url`  | string   | ❌       | Audio pronunciation URL |

**Response (201 Created):**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "word": "ephemeral",
  "definition": "Lasting for a very short time; transitory.",
  "mnemonic": "E-FEMORAL - quick healing femur",
  "sentence": "The ephemeral beauty of spring flowers.",
  "synonyms": ["transient", "fleeting"],
  "audio_url": "https://example.com/audio.mp3",
  "easiness_factor": 2.5,
  "interval": 1,
  "repetitions": 0,
  "next_review_date": "2025-12-22T00:00:00Z",
  "last_reviewed_at": null,
  "created_at": "2025-12-21T11:07:15Z"
}
```

---

### GET `/v1/words/`

List words in user's word bank with pagination and filters.

**Query Parameters:**

| Param       | Type   | Default | Description                    |
| ----------- | ------ | ------- | ------------------------------ |
| `page`      | int    | 1       | Page number (≥ 1)              |
| `page_size` | int    | 20      | Items per page (1-100)         |
| `search`    | string | null    | Search filter on word          |
| `due_only`  | bool   | false   | Show only words due for review |

**Example:**

```
GET /api/v1/words/?page=1&page_size=10&due_only=true
```

**Response (200 OK):**

```json
{
  "items": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "word": "ephemeral",
      "definition": "Lasting for a very short time.",
      "mnemonic": "E-FEMORAL",
      "sentence": "The ephemeral beauty...",
      "synonyms": ["transient", "fleeting"],
      "audio_url": null,
      "easiness_factor": 2.5,
      "interval": 1,
      "repetitions": 0,
      "next_review_date": "2025-12-21T00:00:00Z",
      "last_reviewed_at": null,
      "created_at": "2025-12-20T10:00:00Z"
    }
  ],
  "total": 42,
  "page": 1,
  "page_size": 10,
  "total_pages": 5
}
```

---

### GET `/v1/words/{word_id}/`

Get a specific word by ID.

**Response (200 OK):**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "word": "ephemeral",
  "definition": "Lasting for a very short time.",
  "mnemonic": "E-FEMORAL",
  "sentence": "The ephemeral beauty...",
  "synonyms": ["transient", "fleeting"],
  "audio_url": null,
  "easiness_factor": 2.5,
  "interval": 1,
  "repetitions": 0,
  "next_review_date": "2025-12-21T00:00:00Z",
  "last_reviewed_at": null,
  "created_at": "2025-12-20T10:00:00Z"
}
```

---

### DELETE `/v1/words/{word_id}/`

Remove a word from the word bank.

**Response (204 No Content):** Empty body.

---

## 🧠 SRS Reviews _(Auth Required)_

### GET `/v1/reviews/due/`

Get all words due for review today or earlier.

**Response (200 OK):**

```json
{
  "items": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "word": "ephemeral",
      "definition": "Lasting for a very short time.",
      "mnemonic": "E-FEMORAL",
      "synonyms": ["transient"],
      "audio_url": null,
      "easiness_factor": 2.5,
      "interval": 1,
      "repetitions": 0,
      "next_review_date": "2025-12-21T00:00:00Z"
    }
  ],
  "total": 5
}
```

---

### POST `/v1/reviews/`

Submit a review for a word. The SM-2 algorithm calculates the next review date.

**Request:**

```json
{
  "word_id": "550e8400-e29b-41d4-a716-446655440000",
  "quality": 4
}
```

**Quality Rating Scale:**

| Quality | Meaning                           |
| ------- | --------------------------------- |
| 0       | Complete blackout                 |
| 1       | Incorrect, remembered upon seeing |
| 2       | Incorrect, but seemed easy        |
| 3       | Correct with difficulty           |
| 4       | Correct with hesitation           |
| 5       | Perfect recall                    |

**Response (200 OK):**

```json
{
  "word_id": "550e8400-e29b-41d4-a716-446655440000",
  "word": "ephemeral",
  "next_review_date": "2025-12-27T00:00:00Z",
  "easiness_factor": 2.6,
  "interval": 6,
  "repetitions": 1,
  "message": "Good recall! Next review in 6 days."
}
```

> [!IMPORTANT]
> The `next_review_date` is calculated by the backend. **Never calculate dates on the client.**

---

## 📊 Analytics _(Auth Required)_

### GET `/v1/analytics/`

Get complete learning analytics for the authenticated user.

**Response (200 OK):**

```json
{
  "overall": {
    "total_words": 150,
    "words_mastered": 45,
    "words_learning": 80,
    "words_new": 25,
    "average_easiness_factor": 2.45,
    "total_reviews": 320,
    "streak_days": 7
  },
  "last_7_days": [
    {
      "date": "2025-12-21",
      "words_reviewed": 12,
      "words_learned": 3,
      "correct_count": 10,
      "incorrect_count": 2
    },
    {
      "date": "2025-12-20",
      "words_reviewed": 8,
      "words_learned": 2,
      "correct_count": 7,
      "incorrect_count": 1
    }
  ],
  "retention_trend": [
    {
      "date": "2025-12-21",
      "retention_rate": 0.85,
      "words_reviewed": 12
    }
  ],
  "heatmap": [
    {
      "date": "2025-12-21",
      "intensity": 3,
      "reviews_count": 12
    }
  ],
  "streak_days": 7,
  "words_due_today": 5
}
```

**Word Categories:**

| Category         | Definition                       |
| ---------------- | -------------------------------- |
| `words_mastered` | Words with `repetitions ≥ 5`     |
| `words_learning` | Words with `0 < repetitions < 5` |
| `words_new`      | Words with `repetitions == 0`    |

**Heatmap Intensity:**

| Intensity | Meaning                                              |
| --------- | ---------------------------------------------------- |
| 0         | No activity                                          |
| 1-4       | Increasing activity (like GitHub contribution graph) |

---

### GET `/v1/analytics/streak/`

Get current and longest streak.

**Response (200 OK):**

```json
{
  "current_streak": 7,
  "longest_streak": 14,
  "last_review_date": "2025-12-21"
}
```

---

## 💳 Subscription Status _(Auth Required)_

### GET `/webhooks/subscription-status/`

Get current user's subscription status.

**Response (200 OK):**

```json
{
  "is_premium": true,
  "subscription_status": "active",
  "subscription_ends_at": "2026-01-21T00:00:00Z"
}
```

**Possible `subscription_status` values:**

| Status      | Description                                     |
| ----------- | ----------------------------------------------- |
| `free`      | No subscription                                 |
| `active`    | Active premium subscription                     |
| `cancelled` | Subscription cancelled (access until `ends_at`) |
| `expired`   | Subscription expired                            |

---

## ⚠️ Error Handling

All endpoints return structured JSON errors with appropriate HTTP status codes.

### Error Response Format

```json
{
  "error": "Invalid payload",
  "detail": {
    "email": "This field is required",
    "quality": "Must be between 0 and 5"
  }
}
```

### HTTP Status Codes

| Status Code | Meaning                                         |
| ----------- | ----------------------------------------------- |
| 200         | Success (GET, PUT, PATCH, POST for actions)     |
| 201         | Created (POST for resource creation)            |
| 204         | No Content (DELETE)                             |
| 400         | Bad Request / Validation Error                  |
| 401         | Not Authenticated (missing/invalid credentials) |
| 403         | Forbidden (authenticated but not authorized)    |
| 404         | Resource Not Found                              |
| 422         | Unprocessable Entity (validation failed)        |
| 500         | Internal Server Error                           |

> [!CAUTION] > **Auth Distinction:**
>
> - Use `401 Unauthorized` for missing/invalid credentials (who are you?).
> - Use `403 Forbidden` for valid credentials but insufficient permissions (you aren't allowed here).

---

## 🔗 Quick Reference

| Endpoint                         | Method | Auth | Description                |
| -------------------------------- | ------ | ---- | -------------------------- |
| `/login`                         | POST   | ❌   | User login                 |
| `/oauth-login`                   | POST   | ❌   | OAuth2 token login         |
| `/logout`                        | POST   | ❌   | User logout                |
| `/v1/word/generate`              | POST   | ❌   | Generate word data with AI |
| `/v1/words/`                     | POST   | ✅   | Add word to bank           |
| `/v1/words/`                     | GET    | ✅   | List words in bank         |
| `/v1/words/{id}/`                | GET    | ✅   | Get specific word          |
| `/v1/words/{id}/`                | DELETE | ✅   | Remove word from bank      |
| `/v1/reviews/due/`               | GET    | ✅   | Get words due for review   |
| `/v1/reviews/`                   | POST   | ✅   | Submit a review            |
| `/v1/analytics/`                 | GET    | ✅   | Get learning analytics     |
| `/v1/analytics/streak/`          | GET    | ✅   | Get streak info            |
| `/webhooks/subscription-status/` | GET    | ✅   | Get subscription status    |
