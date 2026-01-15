import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { ApiError, RegisterRequest, RegisterResponse } from '../types';

export const useRegister = createMutation<
  RegisterResponse,
  RegisterRequest,
  AxiosError<ApiError>
>({
  mutationFn: async (variables) => {
    const response = await client.post('register', variables);
    return response.data;
  },
});
