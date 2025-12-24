/**
 * withChatLogic Higher-Order Component
 *
 * Enhances chat components with comprehensive chat functionality including:
 * - WebSocket message handling
 * - Pagination for message history
 * - Message actions (send, delete, report)
 * - Long-press interactions
 *
 * @module hoc/withChatLogic
 */

// React / React Native core imports

import React, { useEffect, useMemo, useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { IMessage } from 'react-native-gifted-chat';

// Hooks

import { useWebSocket } from '../hooks/useChatWebSocket';
import { usePaginatedScroll } from '../hooks/usePaginatedScroll';
import { useMessageLongPress } from '../hooks/useMessageLongPress';
// Utilities / Helpers / API imports
import util from '../util.tsx';
import {
    DeleteMessagePayload,
    GetMessagesPayload,
    ReportEnums,
    TransparencyPayload,
    TransparencyResponse,
    ChatProps,
    ChatStackParamList,
} from '../types';
import Routes from '../constants/RouteConstants.ts';
import { CHAT_MESSAGES } from '../constants/index.ts';

/**
 * Props interface for the wrapped component
 */
interface WithChatLogicProps {
    WrappedComponent: React.ComponentType<ChatProps>;
}

/**
 * Higher-order component that provides chat logic to wrapped components
 * @param WrappedComponent - Component to enhance with chat functionality
 * @returns Enhanced component with chat capabilities
 */
const withChatLogic = (
    WrappedComponent: React.ComponentType<WithChatLogicProps>
) => {
    const HOC: React.FC<ChatProps> = ({
        getConversationMessagesRequest,
        updateMessageReadStatus,
        getChatTokenRequest,
        deleteMessageRequest,

        getTransparencyDataRequest,
        route,
        user,
    }) => {
        const navigation = useNavigation<NavigationProp<ChatStackParamList>>();

        const [messages, setMessages] = useState<IMessage[]>([]);
        const [page, setPage] = useState<number>(1);
        const [loading, setLoading] = useState<boolean>(false);
        const [allDataLoaded, setAllDataLoaded] = useState<boolean>(false);
        const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(
            null
        );
        const [showReportModal, setShowReportModal] = useState<boolean>(false);
        const [showViolation, setShowViolation] = useState<boolean>(false);
        const [ageGroup, setAgeGroup] = useState<string>('');
        const [reportType, setReportType] = useState<ReportEnums>(
            ReportEnums.CHAT
        );
        const [showGif, setShowGif] = useState<boolean>(false);

        // Extract route parameters
        const conversationID: string = route.params.conversationId;
        const participantList = route.params.participantList;
        const isBlocked: boolean = route.params.isBlocked;

        /**
         * Handles incoming WebSocket messages
         * Formats and adds new messages to the message list
         */
        const handleNewMessage = (receivedMessage: IMessage) => {
            const formatted = util.formatIncomingMessage(
                receivedMessage,
                user,
                participantList
            );
            setMessages((prevMessages: IMessage[]) => [
                formatted,
                ...prevMessages,
            ]);
        };

        // Initialize WebSocket connection
        const { sendMessage, sendGif } = useWebSocket(
            getChatTokenRequest,
            conversationID,
            handleNewMessage
        );

        /**
         * Deletes a message from the conversation
         * @param msg - Message to delete
         * @param forEveryone - If true, deletes for all participants; otherwise only for current user
         */
        const deleteMessage = (msg: IMessage, forAll: boolean) => {
            const payload: DeleteMessagePayload = {
                msgId: msg._id,
                forAll,
            };

            deleteMessageRequest(payload, (res: boolean) => {
                if (res) {
                    const updatedList = util.getUpdatedMessageListAfterDelete(
                        messages,
                        msg
                    );
                    setMessages(updatedList);
                }
            });
        };

        /**
         * Opens the report modal for a specific message
         * @param message - Message to report
         */
        const handleReportModal = (message: IMessage) => {
            setShowReportModal(true);
            setSelectedMessage(message);
        };

        /**
         * Handles appeal action for moderation violations
         * Navigates to report screen with transparency data
         */
        const onClickAppeal = () => {
            const payload: TransparencyPayload = {
                complex_type: CHAT_MESSAGES.CONVERSATION_MESSAGE,
                content_id:
                    user.userInfo?.systemActionForChat?.violationContentId,
            };

            getTransparencyDataRequest(payload, (res: TransparencyResponse) => {
                if (res) {
                    navigation.navigate(Routes.REPORT_SCREEN, {
                        url: res.redirectUrl,
                        title: '',
                    });
                }
            });
        };

        /**
         * Fetches paginated message history
         * Prevents duplicate requests and handles end of data
         */
        const getMessages = () => {
            if (loading || allDataLoaded) return;

            setLoading(true);
            const payload: GetMessagesPayload = {
                convId: conversationID,
                page,
            };

            getConversationMessagesRequest(payload, (res: IMessage[]) => {
                setLoading(false);
                const updatedResponse = util.transformChatResponse(res);

                if (updatedResponse.length === 0) {
                    setAllDataLoaded(true);
                } else {
                    setMessages((prev: IMessage[]) => [
                        ...prev,
                        ...updatedResponse,
                    ]);
                }
            });
        };

        // Fetch messages when page changes
        useEffect(() => {
            getMessages();
        }, [page]);

        // Mark messages as read on mount
        useEffect(() => {
            const payload = { conversationId: conversationID };
            updateMessageReadStatus(payload, () => {});
        }, []);

        // Initialize long-press handler
        const onLongPress = useMessageLongPress({
            userId: user.userInfo.userId,
            setSelectedMessage,
            deleteMessage,
            handleReportModal,
            setShowReportModal,
        });

        // Initialize paginated scroll behavior
        const { listViewProps } = usePaginatedScroll({
            loading,
            allDataLoaded,
            setPage,
            setLoading,
        });

        /**
         * Computes chat title from participant list
         * Memoized to prevent unnecessary recalculations
         */
        const chatTitle = useMemo(() => {
            return (
                route.params.title ??
                participantList
                    .slice(0, 2)
                    .map(({ userName }) => userName || '')
                    .filter(Boolean)
                    .join(', ')
            );
        }, [route.params.title, participantList]);

        return (
            <WrappedComponent
                messages={messages}
                setMessages={setMessages}
                sendMessage={sendMessage}
                sendGif={sendGif}
                onLongPress={onLongPress}
                showGif={showGif}
                setShowGif={setShowGif}
                showReportModal={showReportModal}
                setShowReportModal={setShowReportModal}
                showViolation={showViolation}
                setShowViolation={setShowViolation}
                selectedMessage={selectedMessage}
                ageGroup={ageGroup}
                setAgeGroup={setAgeGroup}
                reportType={reportType}
                setReportType={setReportType}
                onClickAppeal={onClickAppeal}
                participantList={participantList}
                isBlocked={isBlocked}
                listViewProps={listViewProps}
                chatTitle={chatTitle}
                user={user}
                route={route}
            />
        );
    };

    return HOC;
};

export default withChatLogic;
