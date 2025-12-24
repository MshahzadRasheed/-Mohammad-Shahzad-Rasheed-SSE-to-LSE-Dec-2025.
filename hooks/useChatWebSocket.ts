/**
 * useChatWebSocket Hook
 *
 * Custom hook for managing WebSocket connections in chat functionality.
 * Handles real-time message sending/receiving via WebSocket protocol.
 *
 * @module hooks/useChatWebSocket
 */

// React / React Native core imports
import { useCallback, useEffect, useState } from 'react';

// Utilities / Helpers / API imports
import { showToastMsg } from '../components/Alert';
import { CHAT_LIST } from '../constants/StringConstants';
import { IMessage } from 'react-native-gifted-chat';

/**
 * WebSocket hook return interface
 */
interface IWebSocket {
    handleNewMessage: (message: IMessage) => void;
    sendGif: (attachmentUrl: string, attachmentType: string) => void;
    sendMessage: (message: IMessage) => void;
}

/**
 * Custom hook for WebSocket chat functionality
 *
 * @param getChatTokenRequest - Function to request chat authentication token
 * @param conversationID - Unique identifier for the conversation
 * @param handleNewMessage - Callback to handle incoming messages
 * @returns Object with sendMessage, sendGif, and handleNewMessage functions
 *
 * @example
 * const { sendMessage, sendGif } = useWebSocket(
 *   getChatToken,
 *   'conv-123',
 *   (msg) => console.log('New message:', msg)
 * );
 */
export const useWebSocket = (
    getChatTokenRequest: (callback: (chatToken: string) => void) => void,
    conversationID: string,
    handleNewMessage: (message: IMessage) => void
): IWebSocket => {
    const [messengerSocket, setMessengerSocket] = useState<WebSocket | null>(
        null
    );

    /**
     * Initialize WebSocket connection on mount and cleanup on unmount
     */
    useEffect(() => {
        getChatTokenRequest((chToken: string) => {
            if (chToken) {
                setupWebSocket(chToken);
            }
        });
        return () => {
            if (messengerSocket) {
                messengerSocket.onclose = (e) => {
                    setMessengerSocket(null);
                };
            }
        };
    }, []);

    /**
     * Sets up WebSocket connection with event handlers
     * @param chToken - Chat authentication token for WebSocket connection
     */
    const setupWebSocket = useCallback((chToken: string) => {
        const socket = new WebSocket(chToken);

        socket.onerror = (e) => {
            showToastMsg(CHAT_LIST.CHAT_SEVER_ERROR);
        };
        socket.onopen = () => {
            setMessengerSocket(socket);
        };
        socket.onclose = (e) => {
            setMessengerSocket(null);
        };

        socket.onmessage = (event) => {
            try {
                const receivedMessage = JSON.parse(JSON.parse(event.data));
                handleNewMessage(receivedMessage);
            } catch (error) {
                console.error('Failed to parse WebSocket message:', error);
            }
        };
    }, []);

    /**
     * Sends a text message through WebSocket
     * @param message - Text message content to send
     */
    const sendMessage = (message: string) => {
        if (messengerSocket && messengerSocket.readyState === WebSocket.OPEN) {
            messengerSocket.send(
                JSON.stringify({
                    attachmentUrl: null,
                    attachmentType: null,
                    message,
                    conversationID,
                })
            );
        }
    };

    /**
     * Sends a GIF attachment through WebSocket
     * @param attachmentUrl - URL of the GIF to send
     * @param attachmentType - Type of attachment (e.g., 'GIF')
     */
    const sendGif = (attachmentUrl: string, attachmentType: string) => {
        if (messengerSocket && messengerSocket.readyState === WebSocket.OPEN) {
            messengerSocket.send(
                JSON.stringify({
                    attachmentUrl,
                    attachmentType,
                    conversationID,
                })
            );
        }
    };

    return { sendMessage, sendGif, handleNewMessage };
};
