export default class OkResponse {
	message!: string;

	constructor(obj: any) {
		Object.assign(this, obj);
	}

	public toString(): string {
		return this.message;
	}
}
