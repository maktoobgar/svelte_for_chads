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
	return useQuery<T, string, T[] | null>(
		'GetList' + name,
		() =>
			axios
				.get(url, { headers: axiosHeaders })
				.then((res) => {
					sendOk(res);
					if (t_constructor) {
						return res.data.map((v: any) => new t_constructor(v));
					}
					return res.data;
				})
				.catch((reason: AxiosError<ErrorResponse>) => {
					sendError(reason.response);
					throw returnMessage(reason.response);
				}),
		{ enabled: enabled }
	);
}
