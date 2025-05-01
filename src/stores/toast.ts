import type ToastPosition from '@/types/toast/toast_position';
import { writable } from 'svelte/store';

const toastInit = 'top';
const toast = writable<ToastPosition>(toastInit);

export default toast;
