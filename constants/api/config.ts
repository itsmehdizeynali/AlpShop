export const API_CONFIG = {
  // Base URL for API requests
  BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",

  // Default headers for API requests
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
  },

  // Timeout for API requests (in milliseconds)
  TIMEOUT: 60000, // 60 seconds maximum timeout

  // Maximum number of retries for failed requests
  MAX_RETRIES: 3,

  // Retry delay between attempts (in milliseconds)
  RETRY_DELAY: 1000,

  // File upload configuration
  UPLOAD: {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_FILE_TYPES: [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
  },
};
