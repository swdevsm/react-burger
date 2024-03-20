import { useState, useEffect, Dispatch, SetStateAction } from "react";

type SaveableData = string | number | object | boolean | undefined | null;

export default function useLocalStorage<T extends SaveableData>(
  key: string,
  defaultValue: T
): [value: T, setValue: Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    const v = localStorage.getItem(key);
    if (v === null) {
      return defaultValue;
    }
    try {
      return JSON.parse(v);
    } catch (e) {
      console.error("error parsing saved state from useStickyState");
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
