import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { ApiError, PackWordDetailResponse } from '../types';

type Variables = {
  packId: string;
  wordId: string;
};

export const usePackWordDetail = createQuery<
  PackWordDetailResponse,
  Variables,
  AxiosError<ApiError>
>({
  queryKey: ['packs', 'word-detail'],
  fetcher: async (variables) => {
    const response = await client.get(
      `v1/packs/${variables.packId}/words/${variables.wordId}/`
    );
    return response.data;
  },
});
