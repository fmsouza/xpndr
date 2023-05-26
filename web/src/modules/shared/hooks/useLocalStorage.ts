import { useState, useCallback } from "react";

import { Maybe } from "../types";

function getStorageValue<T>(key: string, defaultValue?: T): Maybe<T> {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key) ?? null;
    const initial = saved !== null && saved !== undefined ? JSON.parse(saved) : defaultValue;
    return initial;
  }
  return defaultValue ?? null;
}

export function useLocalStorage<T>(key: string, defaultValue: Maybe<T> = null) {
  const [value, setValue] = useState<Maybe<T>>(() => getStorageValue(key, defaultValue));

  const setItem = useCallback((newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }, [key]);

  const removeItem = useCallback(() => {
    setValue(defaultValue);
    localStorage.removeItem(key);
  }, [key]);

  return {
    item: value,
    setItem,
    removeItem,
  }
};