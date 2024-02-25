import { PUBLIC_BACKEND } from '$env/static/public';

const backend = PUBLIC_BACKEND ? PUBLIC_BACKEND : 'http://127.0.0.1:3000';

export default backend;
