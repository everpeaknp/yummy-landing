/**
 * API Client Configuration
 * Base URL and fetch wrapper for Django backend
 */

// Use direct backend URL for all requests
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  data: T
  status: number
  error?: string
}

/**
 * API Error class for handling fetch errors
 */
export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

/**
 * Base fetch wrapper with error handling
 */
export async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // Add cache-busting timestamp to prevent Next.js from aggressively caching local Django data
  const separator = endpoint.includes('?') ? '&' : '?'
  const url = `${API_BASE_URL}${endpoint}${separator}_t=${Date.now()}`

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, { ...config, cache: 'no-store' })

    if (!response.ok) {
      throw new ApiError(`API request failed: ${response.statusText}`, response.status)
    }

    const data = await response.json()
    return data as T
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(error instanceof Error ? error.message : 'Unknown error occurred', 500)
  }
}

/**
 * GET request helper
 */
export function get<T>(endpoint: string, options?: RequestInit): Promise<T> {
  return apiClient<T>(endpoint, { ...options, method: 'GET' })
}

/**
 * POST request helper
 */
export function post<T>(endpoint: string, body: unknown, options?: RequestInit): Promise<T> {
  return apiClient<T>(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export { API_BASE_URL }
