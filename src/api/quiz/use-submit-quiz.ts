import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { ApiError, SubmitQuizRequest, SubmitQuizResponse } from '../types';

export const useSubmitQuiz = createMutation<
  SubmitQuizResponse,
  SubmitQuizRequest,
  AxiosError<ApiError>
>({
  mutationFn: async (variables) => {
    const response = await client.post('v1/quizzes/submit/', variables);
    return response.data;
  },
});
