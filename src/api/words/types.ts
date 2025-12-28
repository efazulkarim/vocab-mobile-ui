// Word types based on API_INTEGRATION.md

export type Word = {
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
};

export type WordGenerateResponse = {
  word: string;
  definition: string;
  mnemonic: string;
  sentence: string;
  synonyms: string[];
  audio_url: string | null;
  is_cached: boolean;
};

export type WordsListResponse = {
  items: Word[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
};

export type WordsListParams = {
  page?: number;
  page_size?: number;
  search?: string;
  due_only?: boolean;
};

export type ReviewDueResponse = {
  items: Word[];
  total: number;
};

export type ReviewSubmitRequest = {
  word_id: string;
  quality: 0 | 1 | 2 | 3 | 4 | 5;
};

export type ReviewSubmitResponse = {
  word_id: string;
  word: string;
  next_review_date: string;
  easiness_factor: number;
  interval: number;
  repetitions: number;
  message: string;
};
