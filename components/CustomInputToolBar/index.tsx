import React from 'react';
import {
    InputToolbar,
    InputToolbarProps,
    IMessage,
} from 'react-native-gifted-chat';
import { Text, ViewStyle, TextStyle } from 'react-native';
import { CHAT_LIST, TOAST_MESSAGES } from '../constants';
import { CHAT_BLOCK_MAPPING } from '../../constants';
import { AppStyles } from '../styles/AppStyles';
import { Colors } from '../styles/Colors';
import { UserState, Follower } from '../../types';

interface ChatRoute {
    params: {
        canMessage?: boolean;
        conversationId: string;
        participantList: Follower[];
        isBlocked: boolean;
    };
}

interface CustomInputToolbarStyles {
    inputContainer: ViewStyle;
    bannedText: TextStyle;
    underlineText: TextStyle;
}

interface CustomInputToolbarProps {
    props: InputToolbarProps<IMessage>;
    user: UserState;
    route: ChatRoute;
    isBlocked: boolean;
    participantList: Follower[];
    onClickAppeal: () => void;
    styles: CustomInputToolbarStyles;
}

interface MessageComponentProps {
    onClickAppeal?: () => void;
    styles?: CustomInputToolbarStyles;
}

export const CustomInputToolbar: React.FC<CustomInputToolbarProps> = ({
    props,
    user,
    route,
    isBlocked,
    participantList,
    onClickAppeal,
    styles,
}) => {
    const canMessage = route.params?.canMessage;
    const actionType = user.userInfo?.systemActionForChat?.actionType;
    const isBanned = actionType === CHAT_BLOCK_MAPPING.BAN_CONVERSATION;

    if (isBanned)
        return (
            <BannedTextMessage onClickAppeal={onClickAppeal} styles={styles} />
        );

    if (!canMessage)
        return <Under18Message onClickAppeal={onClickAppeal} styles={styles} />;

    if (isBlocked && participantList.length === 1)
        return <BlockedUserMessage />;

    return (
        <>
            {isBlocked && participantList.length > 1 && (
                <GroupChatWarningMessage />
            )}
            <InputToolbar
                {...props}
                containerStyle={styles.inputContainer}
                placeholderTextColor={Colors.text.placeHolderTextColor}
            />
        </>
    );
};

const BannedTextMessage: React.FC<MessageComponentProps> = ({
    onClickAppeal,
    styles,
}) => (
    <Text textAlign='left' style={styles?.bannedText} size='xxSmall'>
        {TOAST_MESSAGES.BLOCK_CHAT_MESSAGE}
        <Text
            onPress={onClickAppeal}
            textAlign='center'
            style={styles?.underlineText}
        >
            {'\n'}
            {CHAT_LIST.CLICK_HERE}
        </Text>
    </Text>
);

const Under18Message: React.FC<MessageComponentProps> = ({
    onClickAppeal,
    styles,
}) => (
    <Text textAlign='left' style={styles?.bannedText} size='xxSmall'>
        {TOAST_MESSAGES.BLOCK_UNDER_18_MESSAGE}
        <Text
            onPress={onClickAppeal}
            textAlign='center'
            style={styles?.underlineText}
        >
            {'\n'}
            {CHAT_LIST.CLICK_HERE}
        </Text>
    </Text>
);

const BlockedUserMessage: React.FC = () => (
    <Text
        style={AppStyles.mBottom20}
        color={Colors.black}
        type='medium'
        textAlign='center'
        size='xxSmall'
    >
        {CHAT_LIST.BLOCK_CHAT_ERROR}
    </Text>
);

const GroupChatWarningMessage: React.FC = () => (
    <Text
        color={Colors.black}
        type='medium'
        textAlign='center'
        size='xxSmall'
        style={AppStyles.marginVerticalBase}
    >
        {CHAT_LIST.GROUP_CHAT_WARNING}
    </Text>
);
