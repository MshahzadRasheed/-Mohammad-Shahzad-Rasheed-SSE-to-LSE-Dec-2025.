// React / React Native core imports
import React from 'react';
import { View, FlatListProps } from 'react-native';

// Navigation / State / Context imports
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';

// Third-party library imports
import {
    GiftedChat,
    IMessage,
    SendProps,
    BubbleProps,
    TimeProps,
    InputToolbarProps,
} from 'react-native-gifted-chat';
import { hasNotch } from 'react-native-device-info';

// Utilities / Helpers / API imports
import {
    ChatProps,
    ReportContentPayload,
    RootState,
    ReportContentResponse,
    ActionSheetContext,
    Follower,
} from '../types';

// Shared components / UI elements
import {
    CustomNavbar, // Navigation bar at the top of the screen
    ReportModal, // Modal for reporting inappropriate content
    ViolationModal, // Modal for displaying violation details
    CustomInputToolbar, // Custom input toolbar for chat messages
    CustomBubble, // Custom chat bubble for displaying messages
    CustomTime, // Custom time display for messages
    CustomSend, // Custom send button for sending messages
    GifSelector, // Component for selecting and sending GIFs
} from '../components';

// Styles / Themes / Constants
import styles from './styles';

// Higher-order components
import withChatLogic from '../hoc/withChatLogic';

interface HocChatProps {
    reportContentRequest: (
        payload: ReportContentPayload,
        callback: (res: ReportContentResponse) => void
    ) => void;
    navigation: StackNavigationProp<unknown, unknown>;
    messages: IMessage[];
    setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
    sendMessage: (text: string) => void;
    sendGif: (gifUrl: string) => void;
    onLongPress: (context: ActionSheetContext, message: IMessage) => void;
    showGif: boolean;
    setShowGif: React.Dispatch<React.SetStateAction<boolean>>;
    showReportModal: boolean;
    setShowReportModal: React.Dispatch<React.SetStateAction<boolean>>;
    showViolation: boolean;
    setShowViolation: React.Dispatch<React.SetStateAction<boolean>>;
    selectedMessage: IMessage | null;
    ageGroup: string;
    setAgeGroup: React.Dispatch<React.SetStateAction<string>>;
    reportType: string;
    setReportType: React.Dispatch<React.SetStateAction<string>>;
    onClickAppeal: () => void;
    participantList: Follower[];
    isBlocked: boolean;
    listViewProps: Partial<FlatListProps<IMessage>>;
    chatTitle: string;
    user: {
        userInfo: {
            userId: string;
            displayName: string;
            avatarUrl: string;
        };
    };
    route: {
        params: {
            conversationId: string;
            participantList: Follower[];
            isBlocked: boolean;
            title: string;
            canMessage: boolean;
        };
    };
}

const Chat: React.FC<ChatProps> = (props: HocChatProps) => {
    const {
        messages,
        sendMessage,
        sendGif,
        onLongPress,
        showGif,
        setShowGif,
        showReportModal,
        setShowReportModal,
        showViolation,
        setShowViolation,
        selectedMessage,
        ageGroup,
        setAgeGroup,
        reportType,
        setReportType,
        onClickAppeal,
        participantList,
        isBlocked,
        listViewProps,
        chatTitle,
        user,
        route,
    } = props;

    // Function to render modals for reporting and violations
    const renderModal = () => (
        <>
            {showReportModal && (
                <ReportModal
                    reportType={reportType}
                    crossClicked={() => setShowReportModal(false)}
                    handleSubmitClick={(age: string, type: string) => {
                        setAgeGroup(age);
                        setReportType(type);
                        setShowReportModal(false);
                        setShowViolation(true);
                    }}
                />
            )}
            {showViolation && selectedMessage && (
                <ViolationModal
                    crossClicked={() => setShowViolation(false)}
                    message={selectedMessage}
                    serverRequest={props.reportContentRequest}
                    ageGroup={ageGroup}
                />
            )}
        </>
    );

    return (
        <View style={styles.container}>
            {/* Status bar for devices with and without a notch */}
            <View
                style={
                    hasNotch() ? styles.statusBar : styles.statusBarWithoutNotch
                }
            />

            {/* Custom navigation bar at the top */}
            <CustomNavbar
                leftBtnPress={() => props.navigation.goBack()}
                title={chatTitle}
                hasMultiRight={true}
                style={styles.navBarColor}
            />

            {/* Render modals for reporting and violations */}
            {renderModal()}

            {/* Main chat interface using GiftedChat */}
            <GiftedChat
                keyboardShouldPersistTaps='never'
                textInputProps={styles.textInputProps}
                listViewProps={listViewProps}
                messages={messages}
                onSend={(messages: IMessage[]) => sendMessage(messages[0].text)}
                user={{
                    _id: user.userInfo.userId,
                    name: user.userInfo.displayName,
                    avatar: user.userInfo.avatarUrl,
                }}
                inverted
                renderSend={(props: SendProps<IMessage>) => CustomSend(props)}
                renderInputToolbar={(props: InputToolbarProps<IMessage>) => (
                    <CustomInputToolbar
                        props={props}
                        user={user}
                        route={route}
                        isBlocked={isBlocked}
                        participantList={participantList}
                        onClickAppeal={onClickAppeal}
                        styles={styles}
                    />
                )}
                showAvatarForEveryMessage
                alwaysShowSend
                renderUsernameOnMessage={false}
                renderBubble={(props: BubbleProps<IMessage>) =>
                    CustomBubble(props)
                }
                showUserAvatar
                renderTime={(props: TimeProps<IMessage>) => CustomTime(props)}
                maxComposerHeight={100}
                onLongPress={(context: ActionSheetContext, message: IMessage) =>
                    onLongPress(context, message)
                }
                extraData={messages}
                lightboxProps={{ disabled: true }}
                renderActions={() => (
                    <GifSelector
                        showGif={showGif}
                        setShowGif={setShowGif}
                        sendGif={sendGif}
                    />
                )}
            />
        </View>
    );
};

const mapStateToProps = (state: RootState) => ({
    user: state.user,
});

export default connect(mapStateToProps)(withChatLogic(Chat));
