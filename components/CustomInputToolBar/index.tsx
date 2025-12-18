import React from 'react';
import { InputToolbar } from 'react-native-gifted-chat';
import { Text } from 'react-native';
import { CHAT_LIST, TOAST_MESSAGES } from '../constants';
import { CHAT_BLOCK_MAPPING } from '../../constants';
import { AppStyles } from '../styles/AppStyles';
import { Colors } from '../styles/Colors';

export const CustomInputToolbar = ({
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

const BannedTextMessage = ({ onClickAppeal, styles }) => (
    <Text textAlign='left' style={styles.bannedText} size='xxSmall'>
        {TOAST_MESSAGES.BLOCK_CHAT_MESSAGE}
        <Text
            onPress={onClickAppeal}
            textAlign='center'
            style={styles.underlineText}
        >
            {'\n'}
            {CHAT_LIST.CLICK_HERE}
        </Text>
    </Text>
);

const Under18Message = ({ onClickAppeal, styles }) => (
    <Text textAlign='left' style={styles.bannedText} size='xxSmall'>
        {TOAST_MESSAGES.BLOCK_UNDER_18_MESSAGE}
        <Text
            onPress={onClickAppeal}
            textAlign='center'
            style={styles.underlineText}
        >
            {'\n'}
            {CHAT_LIST.CLICK_HERE}
        </Text>
    </Text>
);

const BlockedUserMessage = () => (
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

const GroupChatWarningMessage = () => (
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
