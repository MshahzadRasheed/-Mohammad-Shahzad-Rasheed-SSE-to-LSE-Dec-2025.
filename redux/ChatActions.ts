import {
    GetMessagesPayload,
    DeleteChatPayload,
    ReadStatusPayload,
    DeleteChatResponse,
    ConversationMessageResponse,
    ReadStatusUpdateResponse,
} from '../types';
import {
    GET_CONVERSATION_MESSAGES,
    UPDATE_READ_STATUS,
    GET_CHAT_TOKEN,
    DELETE_CHAT_GROUP,
    DELETE_CHAT,
    DELETE_MESSAGE,
} from './ActionTypes';

interface Action {
    type: string;
    payload?: object;
    response?: object;
    responseCallback?: object;
}

export function getConversationMessagesRequest(
    payload: GetMessagesPayload,
    responseCallback: ConversationMessageResponse
): Action {
    return {
        payload,
        responseCallback,
        type: GET_CONVERSATION_MESSAGES.REQUEST,
    };
}

export function updateMessageReadStatus(
    payload: ReadStatusPayload,
    responseCallback: ReadStatusUpdateResponse
): Action {
    return {
        payload,
        responseCallback,
        type: UPDATE_READ_STATUS.REQUEST,
    };
}

export function getChatTokenRequest(responseCallback: {
    chToken: string;
}): Action {
    return {
        responseCallback,
        type: GET_CHAT_TOKEN.REQUEST,
    };
}

export function deleteChatGroupRequest(
    payload: DeleteChatPayload,
    responseCallback: DeleteChatResponse
): Action {
    return {
        payload,
        responseCallback,
        type: DELETE_CHAT_GROUP.REQUEST,
    };
}

export function deleteMessageRequest(
    payload: DeleteChatPayload,
    responseCallback: DeleteChatResponse
): Action {
    return {
        payload,
        responseCallback,
        type: DELETE_MESSAGE.REQUEST,
    };
}

export function deleteChatRequest(
    payload: DeleteChatPayload,
    responseCallback: DeleteChatResponse
): Action {
    return {
        payload,
        responseCallback,
        type: DELETE_CHAT.REQUEST,
    };
}
