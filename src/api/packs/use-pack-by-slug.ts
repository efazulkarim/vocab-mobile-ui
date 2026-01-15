import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { ApiError, WordPackDetail } from '../types';

type Variables = { slug: string };

export const usePackBySlug = createQuery<
  WordPackDetail,
  Variables,
  AxiosError<ApiError>
>({
  queryKey: ['packs', 'by-slug'],
  fetcher: async (variables) => {
    const response = await client.get(`v1/packs/by-slug/${variables.slug}/`);
    return response.data;
  },
});
