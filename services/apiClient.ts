'use client';
import axios, { AxiosError } from 'axios';
import { API_CONFIG } from '@/constants/api/config';
import toast from 'react-hot-toast';

interface ApiErrorDetail {
  field?: string;
  detail: string | string[];
}

interface ApiErrorResponse {
  error?: string;
  errors?: ApiErrorDetail[];
  message?: string;
}

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.DEFAULT_HEADERS,
  withCredentials: false,
});

// Request interceptor
apiClient.interceptors.request.use(
  config =>  config,
  error => {
    toast.error('error sending request');
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    // for all 4xx/5xx and network errors
    const status = error?.response?.status;
    const data = error?.response?.data;

    if (status) {
      // if you want to show error message return
      if (data?.error && status !== 401) {
        toast.error(data?.error || 'your request is failed');
      }
      if (data?.errors && Array.isArray(data.errors) && status !== 401) {
        // Handle field-specific errors
        data.errors.forEach(error => {
          if (error.field && error.detail && Array.isArray(error.detail)) {
            // Show each error detail for the field
            error.detail.forEach(detail => {
              toast.error(`${error.field}: ${detail}`);
            });
          } else if (error.detail && Array.isArray(error.detail)) {
            // Show error details without field name
            error.detail.forEach(detail => {
              toast.error(detail);
            });
          } else if (error.detail) {
            // Show single error detail
            toast.error(error.detail);
          }
        });
        return;
      }
      if (status === 401) {
        toast.error('Unauthorized');
        window.location.href = '/auth/login';
      }
    } else {
      // network error/timeout
      toast.error('خطا در ارتباط با سرور');
    }

    // very important: reject the error to catch in try/catch
    return Promise.reject(error);
  }
);

export default apiClient;
