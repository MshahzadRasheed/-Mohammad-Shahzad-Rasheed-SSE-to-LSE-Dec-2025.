import React from 'react';
import { View, FlatListProps } from 'react-native';
import {
    GiftedChat,
    IMessage,
    SendProps,
    BubbleProps,
    TimeProps,
    InputToolbarProps,
} from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import {
    CustomNavbar,
    ReportModal,
    ViolationModal,
    CustomInputToolbar,
    CustomBubble,
    CustomTime,
    CustomSend,
    GifSelector,
} from '../components';
import {
    ChatProps,
    ReportContentPayload,
    RootState,
    ReportContentResponse,
    ActionSheetContext,
    Follower,
} from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { hasNotch } from 'react-native-device-info';
import styles from './styles';
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
            <View
                style={
                    hasNotch() ? styles.statusBar : styles.statusBarWithoutNotch
                }
            />
            <CustomNavbar
                leftBtnPress={() => props.navigation.goBack()}
                title={chatTitle}
                hasMultiRight={true}
                style={styles.navBarColor}
            />
            {renderModal()}
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
