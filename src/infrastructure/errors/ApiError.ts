/**
 * API Error
 * Represents errors from external API calls
 */

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly endpoint?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static fromResponse(response: Response, endpoint: string): ApiError {
    return new ApiError(
      `API request failed: ${response.status} ${response.statusText}`,
      response.status,
      endpoint,
    );
  }

  static fromException(error: unknown, endpoint: string): ApiError {
    if (error instanceof Error) {
      return new ApiError(
        `Network error: ${error.message}`,
        undefined,
        endpoint,
      );
    }
    return new ApiError('Unknown API error', undefined, endpoint);
  }
}
