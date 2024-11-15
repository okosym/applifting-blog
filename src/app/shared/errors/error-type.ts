// enums alternative: https://www.youtube.com/watch?v=jjMbPt_H3RQ
export const ErrorType = {
    ValidationError: "ValidationError",
    AuthError: "AuthError",
    ApplicationError: "ApplicationError",
    Exception: "Exception",
} as const;

export type ErrorType = keyof typeof ErrorType;