import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type {
  ApiError,
  SubmitReviewRequest,
  SubmitReviewResponse,
} from '../types';

export const useSubmitReview = createMutation<
  SubmitReviewResponse,
  SubmitReviewRequest,
  AxiosError<ApiError>
>({
  mutationFn: async (variables) => {
    const response = await client.post('v1/reviews/', variables);
    return response.data;
  },
});
