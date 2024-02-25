import axios, { AxiosHeaders, type AxiosResponse } from 'axios';
import { PUBLIC_FAKE_API } from '$env/static/public';
import backend from '@/const/backend';
import ErrorResponse, { type ErrorType } from '@/types/responses/error_response';
import { success, error } from '@/utils/notifier';
import OkResponse from '@/types/responses/ok_response';
import { accessTokenKey, languageKey } from '@/const/keys';

export default axios.create({
	baseURL: backend,
	timeout: 10000
});

export const returnMessage = (response: AxiosResponse<unknown, any> | undefined) => {
	return (response && (response?.data as ErrorResponse).message) || '';
};

export const sendError = (
	response: AxiosResponse<unknown, any> | undefined,
	message?: string
): ErrorType => {
	const data = new ErrorResponse(response?.data);

	if (data && data.message) {
		response?.status !== 401 && error(data.message);
	} else if (data && !data.errors) {
		response?.status !== 401 && error(message || '');
	} else if (data && data.errors) {
		response?.status !== 401 && error(message || '');
	}

	if (data.errors) return data.errors;
	return null;
};

export const sendOk = (response: AxiosResponse<unknown, any> | undefined) => {
	const data = response?.data as OkResponse;

	if (data && data.message) success(data.message);
};

export function constHeaders(passedAccessToken: string = '') {
	if (PUBLIC_FAKE_API) {
		return new AxiosHeaders({});
	}
	const accessToken = localStorage.getItem(accessTokenKey) || '';
	const language = localStorage.getItem(languageKey) || '';
	const headers = new AxiosHeaders({
		'Accept-Language': language,
		Authorization: passedAccessToken ? passedAccessToken : accessToken
	});
	return headers;
}

export function handleErrors() {
	let errors: ErrorType = {};

	const removeError = (key: string) => {
		if (errors) {
			delete errors[key];
			errors = { ...errors };
		}
	};

	return errors;
}
