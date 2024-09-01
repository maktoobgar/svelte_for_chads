import { writable } from 'svelte/store';

interface Editor {
	imgSrc: string;
	enable: boolean;
	onCancel?: () => void;
	onCrop?: (blob: Blob | null, url: string) => void;
}

let editor: Editor | undefined = undefined;
const editorWritable = writable<Editor>({
	imgSrc: '',
	enable: false
});
editorWritable.subscribe((v) => (editor = v));

export default editorWritable;
