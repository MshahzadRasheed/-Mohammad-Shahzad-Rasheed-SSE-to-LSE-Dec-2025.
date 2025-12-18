import _ from 'lodash';
import Util from '../util';
import { APIConstants } from '../constants/APIConstants';
import { Environment } from './environment';

/**
 * Base URL for API requests - loaded from environment configuration
 * @see .env.sigma for Sigma/QA environment
 * @see .env.live for Production environment
 */
export const BASE_URL = Environment.apiBaseUrl;

/**
 * RUDI AI Chat Service URL - loaded from environment configuration
 */
export const RUDI_API_URL = Environment.rudiApiUrl;

export const API_TIMEOUT = 3000000;

export const API_LOG = true;

export const ERROR_SOMETHING_WENT_WRONG = {
    message: 'Something went wrong, Please try again later',
    error: 'Something went wrong, Please try again later',
};
export const ERROR_NETWORK_NOT_AVAILABLE = {
    message: 'Please connect to the working Internet',
    error: 'Please connect to the working Internet',
};

export const ERROR_CANCEL_ERROR = {
    message: 'cancel Error',
    error: 'Something went wrong, Please try again later',
};

export const ERROR_TOKEN_EXPIRE = {
    message: 'Session Expired, Please login again!',
    error: 'Session Expired, Please login again!',
};

export const REQUEST_TYPE = {
    GET: 'get',
    POST: 'post',
    DELETE: 'delete',
    PUT: 'put',
    PATCH: 'patch',
};

// API USER ROUTES

export const USER_FOLLOWERS = {
    route: APIConstants.USER_FOLLOWERS,
    access_token_required: true,
    type: REQUEST_TYPE.GET,
};

export const GET_CONVERSATION_MESSAGES = {
    route: '',
    access_token_required: true,
    type: REQUEST_TYPE.GET,
};

export const RECENT_CHAT_LIST = {
    route: APIConstants.RECENT_CHAT_LIST,
    access_token_required: true,
    type: REQUEST_TYPE.GET,
};

export const CREATE_CHAT_GROUP = {
    route: APIConstants.CREATE_CHAT_GROUP,
    access_token_required: true,
    type: REQUEST_TYPE.POST,
};

export const DELETE_CHAT_GROUP = {
    route: '',
    access_token_required: true,
    type: REQUEST_TYPE.DELETE,
};

export const LEAVE_CONVERSATION = {
    route: '',
    access_token_required: true,
    type: REQUEST_TYPE.PATCH,
};

export const GET_CHAT_TOKEN = {
    route: APIConstants.GET_CHAT_TOKEN,
    access_token_required: true,
    type: REQUEST_TYPE.GET,
};

export const FLAG_MESSAGE = {
    route: APIConstants.FLAG_MESSAGE,
    access_token_required: true,
    type: REQUEST_TYPE.PUT,
};

export const FLAG_CONVERSATION = {
    route: APIConstants.FLAG_CONVERSATION,
    access_token_required: true,
    type: REQUEST_TYPE.PUT,
};

export const DELETE_CHAT = {
    route: '',
    access_token_required: true,
    type: REQUEST_TYPE.DELETE,
};

export const DELETE_MESSAGE = {
    route: '',
    access_token_required: true,
    type: REQUEST_TYPE.DELETE,
};
export const UPDATE_READ_STATUS = {
    route: '',
    access_token_required: true,
    type: REQUEST_TYPE.PUT,
};

export const callRequest = function (
    url: { route: string; access_token_required: boolean; type: string },
    data: Record<string, unknown>,
    parameter: string | null,
    header: Record<string, string> = {},
    ApiSauce: {
        post: (
            url: string,
            data: unknown,
            headers: unknown,
            baseUrl: string
        ) => unknown;
        get: (
            url: string,
            data: unknown,
            headers: unknown,
            baseUrl: string
        ) => unknown;
        put: (
            url: string,
            data: unknown,
            headers: unknown,
            baseUrl: string
        ) => unknown;
        delete: (
            url: string,
            data: unknown,
            headers: unknown,
            baseUrl: string
        ) => unknown;
        patch: (
            url: string,
            data: unknown,
            headers: unknown,
            baseUrl: string
        ) => unknown;
    },
    baseUrl: string = BASE_URL
) {
    let _header: Record<string, string> = { Origin: baseUrl };
    if (url.access_token_required) {
        const _access_token = Util.getCurrentUserAccessToken();
        if (_access_token) {
            _header.Authorization = `Bearer ${_access_token}`;
        }
    }

    // Merge custom headers passed via arguments
    _header = { ..._header, ...header };

    const _url =
        parameter && !_.isEmpty(parameter)
            ? `${url.route}/${parameter}`
            : url.route;

    if (url.type === REQUEST_TYPE.POST) {
        return ApiSauce.post(_url, data, _header, baseUrl);
    } else if (url.type === REQUEST_TYPE.GET) {
        return ApiSauce.get(_url, data, _header, baseUrl);
    } else if (url.type === REQUEST_TYPE.PUT) {
        return ApiSauce.put(_url, data, _header, baseUrl);
    } else if (url.type === REQUEST_TYPE.DELETE) {
        return ApiSauce.delete(_url, data, _header, baseUrl);
    } else if (url.type === REQUEST_TYPE.PATCH) {
        return ApiSauce.patch(_url, data, _header, baseUrl);
    }
};
