import { useMutation } from '@sveltestack/svelte-query';
import axios, { sendError, sendOk, constHeaders, LL } from './axios';
import { AxiosError } from 'axios';
import ErrorResponse, { ErrorType } from '@/types/responses/error_response';
import { success } from '@utils/notifier';
import { numFaToLatin } from '@utils/general';

function post_put_patch_delete<T>(
	name: string,
	address: string,
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
) {
	const axiosHeaders = constHeaders();

	return useMutation<
		T | null,
		ErrorType,
		{
			data?: any;
			address?: string;
			headers?: Record<string, string>;
			default_message?: boolean;
			params?: Array<any>;
			patchInPost?: boolean;
			putInPost?: boolean;
		}
	>(name, (input) => {
		if (
			typeof input.data === 'object' &&
			!!input.data &&
			'numberFields' in input.data &&
			input.data['numberFields'] &&
			typeof input.data['numberFields'] === 'object'
		) {
			for (let key of input.data['numberFields']) {
				input.data[key] = numFaToLatin(input.data[key]);
			}
		}
		if (!!input.headers && Object.keys(input.headers).length > 0)
			for (const key in input.headers) axiosHeaders.set(key, input.headers[key]);
		if (method === 'POST' && input.patchInPost && input.data instanceof FormData)
			input.data.append('_method', 'patch');
		else if (method === 'POST' && input.patchInPost) input.data._method = 'patch';
		if (method === 'POST' && input.putInPost && input.data instanceof FormData)
			input.data.append('_method', 'put');
		else if (method === 'POST' && input.putInPost) input.data._method = 'put';
		if (input.address) address = input.address;
		return method === 'GET'
			? axios
					.get<T>(address, { headers: axiosHeaders })
					.then((res) => {
						sendOk(res);
						return res.data;
					})
					.catch((reason: AxiosError<ErrorResponse>) => {
						throw sendError(reason.response);
					})
			: method === 'POST'
				? axios
						.post<T>(address, input.data, { headers: axiosHeaders })
						.then((res) => {
							if (input.default_message && !!input.params && input.params.length > 0)
								success(LL.Messages.Created({ item: input.params[0] }));
							else if ((input.default_message && input.patchInPost) || input.putInPost)
								success(LL.Messages.Updated());
							else sendOk(res);
							return res.data;
						})
						.catch((reason: AxiosError<ErrorResponse>) => {
							throw sendError(reason.response);
						})
				: method === 'PUT'
					? axios
							.put<T>(address, input.data, { headers: axiosHeaders })
							.then((res) => {
								if (input.default_message) success(LL.Messages.Updated());
								else sendOk(res);
								return res.data;
							})
							.catch((reason: AxiosError<ErrorResponse>) => {
								throw sendError(reason.response);
							})
					: method === 'PATCH'
						? axios
								.patch<T>(address, input.data, { headers: axiosHeaders })
								.then((res) => {
									if (input.default_message) success(LL.Messages.Updated());
									else sendOk(res);
									return res.data;
								})
								.catch((reason: AxiosError<ErrorResponse>) => {
									throw sendError(reason.response);
								})
						: axios
								.delete(address, { headers: axiosHeaders })
								.then((res) => {
									if (input.default_message) success(LL.Messages.Deleted());
									else sendOk(res);
									return res.data;
								})
								.catch((reason: AxiosError<ErrorResponse>) => {
									throw sendError(reason.response);
								});
	});
}

function get<T>(name: string, address: string) {
	return post_put_patch_delete<T>(name, address, 'GET');
}

function post<T>(name: string, address: string) {
	return post_put_patch_delete<T>(name, address, 'POST');
}

function put<T>(name: string, address: string) {
	return post_put_patch_delete<T>(name, address, 'PUT');
}

function patch<T>(name: string, address: string) {
	return post_put_patch_delete<T>(name, address, 'PATCH');
}

function _delete(name: string, address: string) {
	return post_put_patch_delete(name, address, 'DELETE');
}

export default { get, post, put, patch, delete: _delete };
