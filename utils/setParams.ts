"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useSetParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // toggles `value` inside a comma-separated param, e.g. category=electronics,tools
  // adds it if missing, removes it if present, and drops the param entirely once empty
  const toggleParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.get(key)?.split(",").filter(Boolean) ?? [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    if (next.length) params.set(key, next.join(","));
    else params.delete(key);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const getParamList = (key: string) => searchParams.get(key)?.split(",").filter(Boolean) ?? [];

  // sets/removes several params in ONE navigation (e.g. category + brand + min/max
  // price all at once when the "Filter" button is clicked). A value of undefined,
  // null or "" deletes that param instead of setting it.
  const setManyParams = (entries: Record<string, string | undefined | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(entries)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { setParam, setParams: setParam, setManyParams, toggleParam, getParamList };
}
