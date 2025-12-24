// Redux / Saga imports
import { take, call, fork, cancelled } from 'redux-saga/effects';

// Action types
import {
    CREATE_CHAT_GROUP,
    RECENT_CHAT_LIST,
    GET_CONVERSATION_MESSAGES,
    UPDATE_READ_STATUS,
    GET_CHAT_TOKEN,
    DELETE_CHAT_GROUP,
    FLAG_MESSAGE,
    DELETE_CHAT,
    DELETE_MESSAGE,
} from './actionTypes';
// API calls
import {
    callRequest,
    DELETE_CHAT_GROUP as DELETE_CHAT_GROUP_URL,
    GET_CHAT_TOKEN as GET_CHAT_TOKEN_URL,
    UPDATE_READ_STATUS as UPDATE_READ_STATUS_URL,
    GET_CONVERSATION_MESSAGES as GET_CONVERSATION_MESSAGES_URL,
    CREATE_CHAT_GROUP as CREATE_CHAT_GROUP_URL,
    RECENT_CHAT_LIST as RECENT_CHAT_LIST_URL,
    FLAG_MESSAGE as FLAG_MESSAGE_URL,
    DELETE_CHAT as DELETE_CHAT_URL,
    DELETE_MESSAGE as DELETE_MESSAGE_URL,
} from '../config/Webservice';
// Utilities
import ApiSauce from 'apisauce';
import Util from '../util';
import { showToastMsg } from '../components/Alert';
import { APIConstants } from '../constants/APIConstants';
import { TOAST_MESSAGES } from '../constants/StringConstants';
import { RequestTypes } from '../types';

interface SagaConfig {
    actionType: RequestTypes;
    apiConfig: object;
    buildParams?: (payload: Record<string, unknown>) => string;
    customHeaders?: Record<string, string>;
    customErrorHandler?: (err: Error) => void;
}

// Updated createApiSaga to ensure proper cancellation
function createApiSaga(config: SagaConfig) {
    const {
        actionType,
        apiConfig,
        buildParams,
        customHeaders = {},
        customErrorHandler,
    } = config;

    return function* () {
        try {
            while (true) {
                const { payload = {}, responseCallback } = yield take(
                    actionType.REQUEST
                );

                try {
                    const parameters = buildParams ? buildParams(payload) : '';

                    const response = yield call(
                        callRequest,
                        apiConfig,
                        payload,
                        parameters,
                        customHeaders,
                        ApiSauce
                    );

                    if (response) {
                        if (responseCallback) responseCallback(response, null);
                    } else {
                        showToastMsg('Something went wrong');
                    }
                } catch (err) {
                    if (responseCallback) responseCallback(null, err);

                    if (customErrorHandler) {
                        customErrorHandler(err);
                    } else {
                        showToastMsg(Util.getErrorText(err.message));
                    }
                }
            }
        } finally {
            if (yield cancelled()) {
                console.log('Saga cancelled:', config.actionType);
            }
        }
    };
}

const sagaConfigs: SagaConfig[] = [
    {
        actionType: RECENT_CHAT_LIST,
        apiConfig: RECENT_CHAT_LIST_URL,
    },
    {
        actionType: GET_CONVERSATION_MESSAGES,
        apiConfig: GET_CONVERSATION_MESSAGES_URL,
        buildParams: (payload) =>
            `${APIConstants.GET_CONVERSATION_MESSAGES}?page=${payload.page}&convId=${payload.convId}`,
    },
    {
        actionType: GET_CHAT_TOKEN,
        apiConfig: GET_CHAT_TOKEN_URL,
    },
    {
        actionType: UPDATE_READ_STATUS,
        apiConfig: UPDATE_READ_STATUS_URL,
        buildParams: (payload) =>
            `${APIConstants.UPDATE_READ_STATUS}/${payload.conversationId}`,
    },
    {
        actionType: DELETE_CHAT_GROUP,
        apiConfig: DELETE_CHAT_GROUP_URL,
        buildParams: (payload) =>
            `${APIConstants.CREATE_CHAT_GROUP.substring(1)}?conversationId=${
                payload.conversationId
            }`,
    },
    {
        actionType: FLAG_MESSAGE,
        apiConfig: FLAG_MESSAGE_URL,
    },
    {
        actionType: DELETE_CHAT,
        apiConfig: DELETE_CHAT_URL,
        buildParams: (payload) =>
            `${APIConstants.DELETE_CHAT}/${payload.conversationId}/me`,
    },
    {
        actionType: DELETE_MESSAGE,
        apiConfig: DELETE_MESSAGE_URL,
        buildParams: (payload) =>
            `${APIConstants.DELETE_MESSAGE}msgId=${payload.msgId}&for-all=${payload.forAll}`,
    },
];

const createChatConfig: SagaConfig = {
    actionType: CREATE_CHAT_GROUP,
    apiConfig: CREATE_CHAT_GROUP_URL,
    customHeaders: { 'Content-Type': 'multipart/form-data' },
    customErrorHandler: (err) => {
        const errorMessage = Util.getErrorText(err.message);
        showToastMsg(
            errorMessage.includes('banned')
                ? TOAST_MESSAGES.PERMISSION_UNDER18_USER
                : errorMessage
        );
    },
};

const recentChatList = createApiSaga(sagaConfigs[0]);
const getConversationsMessages = createApiSaga(sagaConfigs[1]);
const getChatToken = createApiSaga(sagaConfigs[2]);
const updateMessageReadStatus = createApiSaga(sagaConfigs[3]);
const deleteChatGroup = createApiSaga(sagaConfigs[4]);
const flagMessage = createApiSaga(sagaConfigs[5]);
const deleteChat = createApiSaga(sagaConfigs[6]);
const deleteMessages = createApiSaga(sagaConfigs[7]);
const createChat = createApiSaga(createChatConfig);

export default function* root() {
    yield fork(recentChatList);
    yield fork(createChat);
    yield fork(getConversationsMessages);
    yield fork(updateMessageReadStatus);
    yield fork(getChatToken);
    yield fork(deleteChatGroup);
    yield fork(flagMessage);
    yield fork(deleteChat);
    yield fork(deleteMessages);
}
