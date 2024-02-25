interface Extra {
	color?: 'green' | 'red' | 'primary' | 'secondary' | 'cyan';
	src?: string;
}

export default interface Content {
	content: any;
	extra?: Extra;
}
