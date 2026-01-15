import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { ApiError, LoginRequest, LoginResponse } from '../types';

export const useLogin = createMutation<
  LoginResponse,
  LoginRequest,
  AxiosError<ApiError>
>({
  mutationFn: async (variables) => {
    const response = await client.post('login', variables);
    return response.data;
  },
});
