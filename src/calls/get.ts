import { useQuery } from '@sveltestack/svelte-query';
import axios, { returnMessage, sendError, sendOk, constHeaders } from './axios';
import { AxiosError } from 'axios';
import ErrorResponse from '@/types/responses/error_response';

export default function <T>(
	url: string,
	name: string,
	t_constructor: (new (data: any) => T) | null,
	enabled: boolean = true
) {
	const axiosHeaders = constHeaders();
	return useQuery<T, string, T | null>(
		'Get' + name,
		() =>
			axios
				.get<T>(url, { headers: axiosHeaders })
				.then((res) => {
					sendOk(res);
					if (t_constructor) return new t_constructor(res.data);
					return res.data;
				})
				.catch((reason: AxiosError<ErrorResponse>) => {
					sendError(reason.response);
					throw returnMessage(reason.response);
				}),
		{ enabled: enabled }
	);
}
