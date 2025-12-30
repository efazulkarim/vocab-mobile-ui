import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';

type DatamuseSuggestion = {
  word: string;
  score: number;
};

type UseAutocompleteOptions = {
  debounceMs?: number;
  maxResults?: number;
};

type UseAutocompleteReturn = {
  suggestions: string[];
  isLoading: boolean;
  error: Error | null;
};

const DATAMUSE_API = 'https://api.datamuse.com/sug';

export function useAutocomplete(
  query: string,
  options: UseAutocompleteOptions = {}
): UseAutocompleteReturn {
  const { debounceMs = 300, maxResults = 8 } = options;

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchSuggestions = useMemo(
    () =>
      debounce(async (searchQuery: string) => {
        if (!searchQuery || searchQuery.length < 2) {
          setSuggestions([]);
          setIsLoading(false);
          return;
        }

        setIsLoading(true);
        setError(null);

        try {
          const response = await fetch(
            `${DATAMUSE_API}?s=${encodeURIComponent(searchQuery)}&max=${maxResults}`
          );

          if (!response.ok) {
            throw new Error(`Datamuse API error: ${response.status}`);
          }

          const data: DatamuseSuggestion[] = await response.json();
          setSuggestions(data.map((item) => item.word));
        } catch (err) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      }, debounceMs),
    [debounceMs, maxResults]
  );

  useEffect(() => {
    fetchSuggestions(query);

    return () => {
      fetchSuggestions.cancel();
    };
  }, [query, fetchSuggestions]);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);

  return { suggestions, isLoading, error };
}
