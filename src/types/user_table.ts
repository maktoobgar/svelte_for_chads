import type User from './user';
import type Content from './table/content';
import type Item from './table/item';

export default class UserTable implements Item {
	id: number;
	data: { [key: string]: Content };

	constructor(obj: User) {
		this.id = obj.id;
		this.data = {};
		this.data['profile'] = {
			content: [obj.name, obj.username],
			extra: { src: obj.profile }
		};
		this.data['description'] = {
			content: obj.description
		};
		this.data['created_at'] = {
			content: obj.created_at
		};
		this.data['updated_at'] = {
			content: obj.updated_at
		};
	}

	public toString(): string {
		return this.data['username'].content;
	}
}
