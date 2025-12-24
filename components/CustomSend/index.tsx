// React imports
import React from 'react';

// React Native imports
import { Send } from 'react-native-gifted-chat';
import { IMessage } from 'react-native-gifted-chat/lib/types';

// Custom imports
import SEND_BUTTON from 'assets/icons/send.svg';
import styles from './styles';

interface CustomSendProps {
    props: IMessage;
}

export const CustomSend: React.FC<CustomSendProps> = ({ props }) => {
    return (
        <Send {...props} containerStyle={styles.sendIcon}>
            <SEND_BUTTON height={17} width={17} />
        </Send>
    );
};
