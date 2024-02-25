import { useMutation } from '@sveltestack/svelte-query';
import axios, { sendError, sendOk, constHeaders } from './axios';
import { AxiosError } from 'axios';
import { type ErrorType } from '@/types/responses/error_response';

export default function <T>(name: string, address: string) {
	const axiosHeaders = constHeaders();
	return useMutation<any, ErrorType, T>(name, (data) =>
		axios
			.delete(address, { headers: axiosHeaders })
			.then((res) => {
				sendOk(res);
				return null;
			})
			.catch((reason: AxiosError) => {
				throw sendError(reason.response);
			})
	);
}
