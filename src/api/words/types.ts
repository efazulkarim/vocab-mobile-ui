// Re-export core types from the main types file for backwards compatibility
export type {
  DueReviewsResponse as ReviewDueResponse,
  SubmitReviewRequest as ReviewSubmitRequest,
  SubmitReviewResponse as ReviewSubmitResponse,
  UserWordResponse as Word,
  WordGenerateResponse,
  WordsListParams,
  WordBankListResponse as WordsListResponse,
} from '../types';
