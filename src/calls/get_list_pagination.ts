import { useQuery } from '@sveltestack/svelte-query';
import axios, { returnMessage, sendError, sendOk, constHeaders } from './axios';
import { AxiosError } from 'axios';
import type ListResponse from '@/types/responses/list_response';
import ErrorResponse from '@/types/responses/error_response';

export default function <T>(
	url: string,
	name: string,
	t_constructor: (new (data: any) => T) | null,
	enabled: boolean = true
) {
	const axiosHeaders = constHeaders();
	return useQuery<T, string, ListResponse<T> | null>(
		'GetList' + name,
		() =>
			axios
				.get(url, { headers: axiosHeaders })
				.then((res) => {
					sendOk(res);
					if (t_constructor) {
						const data = res.data.data.map((v: any) => new t_constructor(v));
						res.data.data = data;
						return res.data;
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
