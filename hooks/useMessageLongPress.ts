/**
 * useMessageLongPress Hook
 *
 * Custom hook to handle long press actions on chat messages.
 * Provides different options based on whether the message belongs to
 * the current user or another user.
 *
 * @module hooks/useMessageLongPress
 */

import { Platform, Keyboard, Alert } from 'react-native';
import {
    CHAT_MORE_FOR_OWN_MESSAGES,
    CHAT_MORE_FOR_OTHER_MESSAGES,
} from '../constants/';
import { IMessage } from 'react-native-gifted-chat';
import { useCallback } from 'react';
import { CHAT_LIST, COMMON } from '../constants/StringConstants';
import { ActionSheetContext } from 'react-native-action-sheet';

/**
 * Hook parameters interface
 */
interface UseMessageLongPressParams {
    userId: string;
    setSelectedMessage: (msg: IMessage) => void;
    deleteMessage: (msg: IMessage, forEveryone: boolean) => void;
    handleReportModal: (msg: IMessage) => void;
    setShowReportModal: (val: boolean) => void;
}

/**
 * Custom hook for handling message long press interactions
 *
 * @param params - Hook configuration parameters
 * @param params.userId - Current user's ID for ownership check
 * @param params.setSelectedMessage - Callback to set the selected message
 * @param params.deleteMessage - Callback to delete a message
 * @param params.handleReportModal - Callback to show report modal
 * @param params.setShowReportModal - Callback to toggle report modal visibility
 * @returns onLongPress callback function
 */
export const useMessageLongPress = ({
    userId,
    setSelectedMessage,
    deleteMessage,
    handleReportModal,
    setShowReportModal,
}: UseMessageLongPressParams) => {
    /**
     * Handles long press event on a message
     * Shows action sheet with context-appropriate options
     */
    const onLongPress = useCallback(
        (context: ActionSheetContext, message: IMessage) => {
            // Dismiss keyboard on Android for better UX
            if (Platform.OS === 'android') Keyboard.dismiss();

            // Determine if message belongs to current user
            const isOwnMessage = userId === message.user._id;

            // Show different options based on message ownership
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
                                            text: COMMON.YES,
                                            onPress: () =>
                                                handleReportModal(message),
                                            style: 'default',
                                        },
                                        {
                                            text: COMMON.NO,
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
