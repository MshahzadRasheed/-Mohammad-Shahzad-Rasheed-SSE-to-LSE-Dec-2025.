// @flow
import { Image } from 'react-native';

import { gifMapping } from '../constants';
import { decode } from 'html-entities';
import { CHAT_LIST } from './constants/StringConstants';
import { IMessage } from 'react-native-gifted-chat';
import { UserInfo, UserState } from './types';
import { GIF_MAPPING, IMAGE_TYPE } from './constants';

class Util {
    tranFormChatResponse(response: IMessage[]) {
        const decodeContent = (text: string): string => {
            const urlDecode = (text: string): string => {
                try {
                    return decodeURIComponent(text);
                } catch (error) {
                    console.error('Error decoding URI component:', error);
                    return text;
                }
            };

            const htmlDecode = (text: string): string => {
                return decode(text);
            };
            const urlDecoded = urlDecode(text);
            return htmlDecode(urlDecoded);
        };

        return response.map((message) => ({
            _id: message.id,
            text: message.content
                ? decodeContent(message.content || '').replace(
                      /[^\x20-\x7E‘’”]/g,
                      ''
                  )
                : '',
            createdAt: message.createdAt,
            avatar: message.user.avatarUrl,
            isFlagged: message.isFlagged,
            user: {
                _id: message.user.id,
                name: message.user.displayName,
                avatar: message.user.avatarUrl,
                email: message.user.email,
            },
            image:
                message.attachmentType === 'GIF' &&
                gifMapping[message.attachmentUrl]
                    ? Image.resolveAssetSource(
                          gifMapping[message.attachmentUrl]
                      ).uri
                    : null,
        }));
    }
    decodeAndSanitizeContent = (text: string): string => {
        const urlDecode = (text: string): string => {
            try {
                return decodeURIComponent(text);
            } catch (error) {
                console.error('Error decoding URI component:', error);
                return text;
            }
        };

        const htmlDecode = (text: string): string => {
            return decode(text);
        };
        const urlDecoded = urlDecode(text);
        return htmlDecode(urlDecoded);
    };
    getUpdatedMessageListAfterDelete = (
        messages: IMessage[],
        msg: IMessage
    ): IMessage[] => {
        const index = messages.findIndex((m) => m._id === msg._id);
        if (index === -1) return messages;

        const updatedMessages = [...messages];
        updatedMessages[index] = {
            ...updatedMessages[index],
            text: CHAT_LIST.MESSAGE_DELETED,
            image: msg.image ? null : updatedMessages[index].image,
        };

        return updatedMessages;
    };
    getGifImageUri = (attachmentType: string, url: string): string | null => {
        return attachmentType === IMAGE_TYPE.GIF && GIF_MAPPING[url]
            ? Image.resolveAssetSource(GIF_MAPPING[url]).uri
            : null;
    };

    cleanDecodedText = (message: string): string => {
        return this.decodeAndSanitizeContent(message || '').replace(
            /[^\x20-\x7E‘’”]/g,
            ''
        );
    };

    formatIncomingMessage = (
        receivedMessage: IMessage,
        user: UserState,
        participantList: {
            id: string;
            displayName: string;
            avatarUrl: string;
        }[]
    ): IMessage => {
        const matchedUser = participantList.find(
            (p) => p.id === receivedMessage.fromUserId
        ) || {
            id: user.userInfo.userId,
            displayName: user.userInfo.userName,
            avatarUrl: user.userInfo.avatarUrl,
        };

        return {
            _id: receivedMessage.messageId,
            text: this.cleanDecodedText(receivedMessage.message),
            createdAt: new Date(),
            isFlagged: null,
            user: {
                _id: matchedUser.id,
                name: matchedUser.displayName,
                avatar: matchedUser.avatarUrl,
            },
            image: this.getGifImageUri(
                receivedMessage.attachmentType,
                receivedMessage.attachmentUrl
            ),
        };
    };

    getErrorText(error: string[]) {
        if (error instanceof Array) {
            if (error.length > 0) return error[0];
        } else {
            return error;
        }
        return '';
    }
}

export default new Util();
