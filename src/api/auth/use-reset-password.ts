import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { ApiError, ResetPasswordRequest } from '../types';

interface ResetPasswordResponse {
  message: string;
}

export const useResetPassword = createMutation<
  ResetPasswordResponse,
  ResetPasswordRequest,
  AxiosError<ApiError>
>({
  mutationFn: async (variables) => {
    const response = await client.post('reset-password', variables);
    return response.data;
  },
});
