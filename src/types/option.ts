export default class Option {
	id!: number;
	value!: string;
	content!: string;

	constructor(id: number, content: string, value: string) {
		this.id = id;
		this.content = content;
		this.value = value;
	}

	public toString() {
		return this.content;
	}
}
