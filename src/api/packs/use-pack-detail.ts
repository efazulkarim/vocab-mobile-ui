import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { ApiError, WordPackDetail } from '../types';

type Variables = { packId: string };

export const usePackDetail = createQuery<
  WordPackDetail,
  Variables,
  AxiosError<ApiError>
>({
  queryKey: ['packs', 'detail'],
  fetcher: async (variables) => {
    const response = await client.get(`v1/packs/${variables.packId}/`);
    return response.data;
  },
});
