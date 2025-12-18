import React from 'react';
import { StyleSheet } from 'react-native';
import { Send } from 'react-native-gifted-chat';
import { IMessage } from 'react-native-gifted-chat/lib/types';
import SEND_BUTTON from 'assets/icons/send.svg';
import styles from './styles';

interface CustomSendProps {
    props: IMessage;
}

const CustomSend = ({ props }: CustomSendProps) => {
    return (
        <Send {...props} containerStyle={styles.sendIcon}>
            <SEND_BUTTON height={17} width={17} />
        </Send>
    );
};

export default CustomSend;
