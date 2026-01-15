import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type {
  ApiError,
  GenerateQuizRequest,
  GenerateQuizResponse,
} from '../types';

export const useGenerateQuiz = createMutation<
  GenerateQuizResponse,
  GenerateQuizRequest,
  AxiosError<ApiError>
>({
  mutationFn: async (variables) => {
    const response = await client.post('v1/quizzes/generate/', variables);
    return response.data;
  },
});
