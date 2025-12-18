import { take, call, fork } from 'redux-saga/effects';
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
} from './ActionTypes';
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
import ApiSauce from 'ser';
import Util from '../util';
import { showToastMsg } from '../components/Alert';
import { APIConstants } from '../constants/APIConstants';
import { TOAST_MESSAGES } from '../constants/StringConstants';

function alert(message, type = 'error') {
    showToastMsg(message);
}

function* recentChatList() {
    while (true) {
        const { responseCallback } = yield take(RECENT_CHAT_LIST.REQUEST);
        try {
            const response = yield call(
                callRequest,
                RECENT_CHAT_LIST_URL,
                {},
                '',
                {},
                ApiSauce
            );
            if (response) {
                if (responseCallback) responseCallback(response, null);
            } else {
                alert('Something went wrong');
            }
        } catch (err) {
            if (responseCallback) responseCallback(null, err);
        }
    }
}

function* createChat() {
    while (true) {
        const { payload, responseCallback } = yield take(
            CREATE_CHAT_GROUP.REQUEST
        );
        try {
            const response = yield call(
                callRequest,
                CREATE_CHAT_GROUP_URL,
                payload,
                '',
                { 'Content-Type': 'multipart/form-data' },
                ApiSauce
            );
            if (response) {
                if (responseCallback) responseCallback(response, null);
            } else {
                alert('Something went wrong');
            }
        } catch (err) {
            if (responseCallback) responseCallback(null, err);
            alert(
                Util.getErrorText(err.message).includes('banned')
                    ? TOAST_MESSAGES.PERMISSION_UNDER18_USER
                    : Util.getErrorText(err.message)
            );
        }
    }
}

function* getConversationsMessages() {
    while (true) {
        const { payload, responseCallback } = yield take(
            GET_CONVERSATION_MESSAGES.REQUEST
        );
        const parameters = `${APIConstants.GET_CONVERSATION_MESSAGES}?page=${payload.page}&convId=${payload.convId}`;
        try {
            const response = yield call(
                callRequest,
                GET_CONVERSATION_MESSAGES_URL,
                {},
                parameters,
                {},
                ApiSauce
            );
            if (response) {
                if (responseCallback) responseCallback(response, null);
            } else {
                alert('Something went wrong');
            }
        } catch (err) {
            if (responseCallback) responseCallback(null, err);
            alert(Util.getErrorText(err.message));
        }
    }
}

function* updateMessageReadStatus() {
    while (true) {
        const { payload, responseCallback } = yield take(
            UPDATE_READ_STATUS.REQUEST
        );
        const parameters = `${APIConstants.UPDATE_READ_STATUS}/${payload.conversationId}`;

        try {
            const response = yield call(
                callRequest,
                UPDATE_READ_STATUS_URL,
                {},
                parameters,
                {},
                ApiSauce
            );
            if (response) {
                if (responseCallback) responseCallback(response, null);
            } else {
                alert('Something went wrong');
            }
        } catch (err) {
            if (responseCallback) responseCallback(null, err);
            alert(Util.getErrorText(err.message));
        }
    }
}

function* getChatToken() {
    while (true) {
        const { responseCallback } = yield take(GET_CHAT_TOKEN.REQUEST);
        try {
            const response = yield call(
                callRequest,
                GET_CHAT_TOKEN_URL,
                {},
                '',
                {},
                ApiSauce
            );
            if (response) {
                if (responseCallback) responseCallback(response, null);
            } else {
                alert('Something went wrong');
            }
        } catch (err) {
            if (responseCallback) responseCallback(null, err);
            alert(Util.getErrorText(err.message));
        }
    }
}

function* deleteChatGroup() {
    while (true) {
        const { payload, responseCallback } = yield take(
            DELETE_CHAT_GROUP.REQUEST
        );
        const parameters = `${APIConstants.CREATE_CHAT_GROUP.substring(
            1
        )}?conversationId=${payload.conversationId}`;

        try {
            const response = yield call(
                callRequest,
                DELETE_CHAT_GROUP_URL,
                {},
                parameters,
                {},
                ApiSauce
            );

            if (response) {
                if (responseCallback) responseCallback(response, null);
            } else {
                alert('Something went wrong');
            }
        } catch (err) {
            if (responseCallback) responseCallback(null, err);
            alert(Util.getErrorText(err.message));
        }
    }
}

function* flagMessage() {
    while (true) {
        const { payload, responseCallback } = yield take(FLAG_MESSAGE.REQUEST);

        try {
            const response = yield call(
                callRequest,
                FLAG_MESSAGE_URL,
                payload,
                '',
                {},
                ApiSauce
            );
            if (response) {
                if (responseCallback) responseCallback(response, null);
            } else {
                alert('Something went wrong');
            }
        } catch (err) {
            if (responseCallback) responseCallback(null, err);
            alert(Util.getErrorText(err.message));
        }
    }
}

function* deleteChat() {
    while (true) {
        const { payload, responseCallback } = yield take(DELETE_CHAT.REQUEST);
        const parameters = `${APIConstants.DELETE_CHAT}/${payload.conversationId}/me`;

        try {
            const response = yield call(
                callRequest,
                DELETE_CHAT_URL,
                {},
                parameters,
                {},
                ApiSauce
            );
            if (response) {
                if (responseCallback) responseCallback(response, null);
            } else {
                alert('Something went wrong');
            }
        } catch (err) {
            if (responseCallback) responseCallback(null, err);
            alert(Util.getErrorText(err.message));
        }
    }
}

function* deleteMessages() {
    while (true) {
        const { payload, responseCallback } = yield take(
            DELETE_MESSAGE.REQUEST
        );
        const parameters = `${APIConstants.DELETE_MESSAGE}msgId=${payload.msgId}&for-all=${payload.forAll}`;

        try {
            const response = yield call(
                callRequest,
                DELETE_MESSAGE_URL,
                {},
                parameters,
                {},
                ApiSauce
            );

            if (response) {
                if (responseCallback) responseCallback(response, null);
            } else {
                alert('Something went wrong');
            }
        } catch (err) {
            if (responseCallback) responseCallback(null, err);
            alert(Util.getErrorText(err.message));
        }
    }
}

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
