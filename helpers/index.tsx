import { ApiError } from "next/dist/server/api-utils";
import { useCallback, useRef } from "react";

export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction = useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedFunction;
}

export function handleApiError(error: unknown, defaultMessage: string): void {
  const apiError = error as { response?: { data?: ApiError } };
  const message = apiError.response?.data?.message || defaultMessage;
  throw new Error(message);
}
