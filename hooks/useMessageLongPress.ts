import { Platform, Keyboard, Alert } from 'react-native';
import {
    CHAT_MORE_FOR_OWN_MESSAGES,
    CHAT_MORE_FOR_OTHER_MESSAGES,
} from '../constants/'; // adjust path
import { IMessage } from 'react-native-gifted-chat';
import { useCallback } from 'react';
import { CHAT_LIST } from '../constants/StringConstants';
import { ActionSheetContext } from 'react-native-action-sheet';

export const useMessageLongPress = ({
    userId,
    setSelectedMessage,
    deleteMessage,
    handleReportModal,
    setShowReportModal,
}: {
    userId: string;
    setSelectedMessage: (msg: IMessage) => void;
    deleteMessage: (msg: IMessage, forEveryone: boolean) => void;
    handleReportModal: (msg: IMessage) => void;
    setShowReportModal: (val: boolean) => void;
}) => {
    const onLongPress = useCallback(
        (context: ActionSheetContext, message: IMessage) => {
            if (Platform.OS === 'android') Keyboard.dismiss();

            const isOwnMessage = userId === message.user._id;
            const options = isOwnMessage
                ? CHAT_MORE_FOR_OWN_MESSAGES
                : CHAT_MORE_FOR_OTHER_MESSAGES;

            const cancelButtonIndex = options.length - 1;

            context.actionSheet().showActionSheetWithOptions(
                {
                    options,
                    cancelButtonIndex,
                },
                (buttonIndex: number) => {
                    const selectedOption = options[buttonIndex];

                    switch (selectedOption) {
                        case CHAT_LIST.REPORT_MESSAGE:
                            setSelectedMessage(message);
                            setTimeout(() => {
                                Alert.alert(
                                    CHAT_LIST.REPORT_HEADING,
                                    CHAT_LIST.REPORT_HEADING_DETAIL,
                                    [
                                        {
                                            text: 'Yes',
                                            onPress: () =>
                                                handleReportModal(message),
                                            style: 'default',
                                        },
                                        {
                                            text: 'No',
                                            style: 'cancel',
                                        },
                                    ]
                                );
                            }, 500);
                            break;

                        case CHAT_LIST.DELETE:
                        case CHAT_LIST.DELETE_FOR_ME:
                            setSelectedMessage(message);
                            deleteMessage(message, false);
                            break;

                        case CHAT_LIST.DELETE_FOR_EVERY_ONE:
                            deleteMessage(message, true);
                            break;

                        default:
                            setShowReportModal(false);
                            break;
                    }
                }
            );
        },
        [
            userId,
            setSelectedMessage,
            deleteMessage,
            handleReportModal,
            setShowReportModal,
        ]
    );

    return onLongPress;
};
