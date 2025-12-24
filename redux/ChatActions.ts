/**
 * Chat Redux Actions
 *
 * Action creators for chat-related Redux operations.
 * Follows Redux Saga pattern with REQUEST/SUCCESS/FAILURE action types.
 *
 * @module redux/ChatActions
 */

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

/** Standard Redux action interface */
interface Action {
    type: string;
    payload?: object;
    response?: object;
    responseCallback?: object;
}

/**
 * Creates action to request conversation messages
 *
 * @param payload - Contains page number and conversation ID
 * @param responseCallback - Callback function for handling response
 * @returns Redux action object
 *
 * @example
 * dispatch(getConversationMessagesRequest(
 *   { page: 1, convId: 'abc123' },
 *   (messages) => console.log(messages)
 * ));
 */
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

/**
 * Creates action to update message read status
 *
 * @param payload - Contains conversation ID to mark as read
 * @param responseCallback - Callback with updated read status
 * @returns Redux action object
 */
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

/**
 * Creates action to request chat authentication token
 *
 * @param responseCallback - Callback with chat token
 * @returns Redux action object
 */
export function getChatTokenRequest(responseCallback: {
    chToken: string;
}): Action {
    return {
        responseCallback,
        type: GET_CHAT_TOKEN.REQUEST,
    };
}

/**
 * Creates action to delete a chat group
 *
 * @param payload - Contains conversation ID to delete
 * @param responseCallback - Callback with deletion result
 * @returns Redux action object
 */
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

/**
 * Creates action to delete a specific message
 *
 * @param payload - Contains message/conversation ID to delete
 * @param responseCallback - Callback with deletion result
 * @returns Redux action object
 */
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

/**
 * Creates action to delete an entire chat conversation
 *
 * @param payload - Contains conversation ID to delete
 * @param responseCallback - Callback with deletion result
 * @returns Redux action object
 */
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
