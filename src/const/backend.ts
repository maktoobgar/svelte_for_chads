import { PUBLIC_BACKEND } from '$env/static/public';

const backend = PUBLIC_BACKEND ? PUBLIC_BACKEND : '/api';

export default backend;
