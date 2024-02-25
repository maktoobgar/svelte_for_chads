import { useMutation } from '@sveltestack/svelte-query';
import axios, { sendError, sendOk, constHeaders } from './axios';
import { AxiosError } from 'axios';
import { type ErrorType } from '@/types/responses/error_response';

function post_put_patch<T>(name: string, address: string, method: 'POST' | 'PUT' | 'PATCH') {
	const axiosHeaders = constHeaders();

	return useMutation<any, ErrorType, T>(name, (data) =>
		method === 'POST'
			? axios
					.post(address, data, { headers: axiosHeaders })
					.then((res) => {
						sendOk(res);
						return null;
					})
					.catch((reason: AxiosError) => {
						throw sendError(reason.response);
					})
			: method === 'PUT'
				? axios
						.put(address, data, { headers: axiosHeaders })
						.then((res) => {
							sendOk(res);
							return null;
						})
						.catch((reason: AxiosError) => {
							throw sendError(reason.response);
						})
				: axios
						.patch(address, data, { headers: axiosHeaders })
						.then((res) => {
							sendOk(res);
							return null;
						})
						.catch((reason: AxiosError) => {
							throw sendError(reason.response);
						})
	);
}

function post<T>(name: string, address: string) {
	return post_put_patch(name, address, 'POST');
}

function put<T>(name: string, address: string) {
	return post_put_patch(name, address, 'PUT');
}

function patch<T>(name: string, address: string) {
	return post_put_patch(name, address, 'PATCH');
}

export default { post, put, patch };
