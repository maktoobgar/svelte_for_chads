export default class User {
	id!: number;
	name!: string;
	username!: string;
	description!: string;
	profile!: string;
	created_at: Date;
	updated_at: Date;

	constructor(obj: any) {
		Object.assign(this, obj);
		this.created_at = new Date(obj.created_at);
		this.updated_at = new Date(obj.updated_at);
	}

	public toString(): string {
		return this.username;
	}
}
