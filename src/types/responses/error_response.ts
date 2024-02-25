export type ErrorType = Record<string, string[]> | null;

export default class ErrorResponse {
	message!: string;
	code!: number;
	errors!: ErrorType;

	constructor(obj: any) {
		Object.assign(this, obj);
	}

	public toString(): string {
		return this.message;
	}
}
