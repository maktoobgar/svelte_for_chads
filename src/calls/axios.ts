import axios, { AxiosHeaders, type AxiosResponse } from 'axios';
import backend from '@/const/backend';
import ErrorResponse, { type ErrorType, GetErrorType } from '@/types/responses/error_response';
import { success, error } from '@/utils/notifier';
import OkResponse from '@/types/responses/ok_response';
import { accessTokenKey, languageKey } from '@/const/keys';
import ll from '@i18n/i18n-svelte';
import { TranslationFunctions } from '@i18n/i18n-types';

export let LL: TranslationFunctions;
ll.subscribe((v) => (LL = v));

export default axios.create({
	baseURL: backend,
	timeout: 10000
});

export const returnMessage = (response: AxiosResponse<ErrorResponse, any> | undefined) => {
	return response && response.data.message ? response.data.message : '';
};

export const sendError = (
	response: AxiosResponse<ErrorResponse, any> | undefined,
	message?: string
): ErrorType => {
	const errors = response?.data ? GetErrorType(response.data) : {};

	if (response?.data && response.data.message) {
		error(response?.data.message);
	}

	if (message) error(message);
	else if (response?.status === 422) error(LL.Errors.BadRequestBody());

	return errors;
};

// Returns true if sent a message
export const sendOk = (response: AxiosResponse<unknown, any> | undefined) => {
	const data = response?.data as OkResponse;

	if (data && data.message) {
		success(data.message);
		return true;
	}
	return false;
};

export function constHeaders(passedAccessToken: string = '') {
	const accessToken = localStorage.getItem(accessTokenKey) || '';
	const language = localStorage.getItem(languageKey) || '';
	const headers = new AxiosHeaders({
		'Accept-Language': language,
		Authorization: 'Bearer ' + (passedAccessToken ? passedAccessToken : accessToken)
	});
	return headers;
}
