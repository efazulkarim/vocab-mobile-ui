import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import type { ApiError, PackWordListResponse } from '../types';
import { client } from '../common';

type Variables = { 
  packId: string;
  page?: number;
  page_size?: number;
};

export const usePackWords = createQuery<PackWordListResponse, Variables, AxiosError<ApiError>>({
  queryKey: ['packs', 'words'],
  fetcher: async (variables) => {
    const params = new URLSearchParams();
    
    if (variables.page) {
      params.append('page', String(variables.page));
    }
    if (variables.page_size) {
      params.append('page_size', String(variables.page_size));
    }
    
    const queryString = params.toString();
    const url = queryString 
      ? `v1/packs/${variables.packId}/words/?${queryString}`
      : `v1/packs/${variables.packId}/words/`;
    const response = await client.get(url);
    return response.data;
  },
});
