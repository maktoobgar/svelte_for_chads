export type ErrorType = Record<string, string[]> | string | null;

export function GetErrorType(errors: ErrorResponse): ErrorType {
	return !!errors.error ? errors.error : {};
}

class ErrorResponse {
	error!: ErrorType;
	message!: string;
}

export default ErrorResponse;
