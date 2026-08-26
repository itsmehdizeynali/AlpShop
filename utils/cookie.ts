"use client";

import Cookies from "js-cookie";

export const setCookie = (key: string, value: string, options: object) => {
  return Cookies.set(key, value, {
    expires: 7,
    path: "/",
    ...options,
  });
};
export const getCookie = (key: string) => {
  return Cookies.get(key);
};
export const removeCookie = (key: string, options = {}) => {
  Cookies.remove(key, { path: "/", ...options });
};
