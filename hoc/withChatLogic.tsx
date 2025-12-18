import React, { useEffect, useMemo, useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { IMessage } from 'react-native-gifted-chat';

import { useWebSocket } from '../hooks/useChatWebSocket';
import { usePaginatedScroll } from '../hooks/usePaginatedScroll';
import { useMessageLongPress } from '../hooks/useMessageLongPress';

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

interface WithChatLogicProps {
    WrappedComponent: React.ComponentType<ChatProps>;
}

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

        const conversationID: string = route.params.conversationId;
        const participantList = route.params.participantList;
        const isBlocked: boolean = route.params.isBlocked;

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

        const { sendMessage, sendGif } = useWebSocket(
            getChatTokenRequest,
            conversationID,
            handleNewMessage
        );

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

        const handleReportModal = (message: IMessage) => {
            setShowReportModal(true);
            setSelectedMessage(message);
        };

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

        const getMessages = () => {
            if (loading || allDataLoaded) return;

            setLoading(true);
            const payload: GetMessagesPayload = {
                convId: conversationID,
                page,
            };

            getConversationMessagesRequest(payload, (res: IMessage[]) => {
                setLoading(false);
                const updatedResponse = util.tranFormChatResponse(res);

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

        useEffect(() => {
            getMessages();
        }, [page]);

        useEffect(() => {
            const payload = { conversationId: conversationID };
            updateMessageReadStatus(payload, () => {});
        }, []);

        const onLongPress = useMessageLongPress({
            userId: user.userInfo.userId,
            setSelectedMessage,
            deleteMessage,
            handleReportModal,
            setShowReportModal,
        });

        const { listViewProps } = usePaginatedScroll({
            loading,
            allDataLoaded,
            setPage,
            setLoading,
        });

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
