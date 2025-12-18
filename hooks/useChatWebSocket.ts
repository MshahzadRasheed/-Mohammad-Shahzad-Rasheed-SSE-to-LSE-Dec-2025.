import { useCallback, useEffect, useState } from 'react';

import { showToastMsg } from '../components/Alert';
import { CHAT_LIST } from '../constants/StringConstants';
import { IMessage } from 'react-native-gifted-chat';

interface IWebSocket {
    handleNewMessage: (message: IMessage) => void;
    sendGif: (attachmentUrl: string, attachmentType: string) => void;
    sendMessage: (message: IMessage) => void;
}

export const useWebSocket = (
    getChatTokenRequest: (callback: (chatToken: string) => void) => void,
    conversationID: string,
    handleNewMessage: (message: IMessage) => void
): IWebSocket => {
    const [messengerSocket, setMessengerSocket] = useState<WebSocket | null>(
        null
    );

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
            const receivedMessage = JSON.parse(JSON.parse(event.data));
            handleNewMessage(receivedMessage);
        };
    }, []);

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
