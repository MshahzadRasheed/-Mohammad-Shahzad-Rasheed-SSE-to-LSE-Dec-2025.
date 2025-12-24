// React / React Native core imports
import React from 'react';

// Navigation / State / Context imports
// (No imports in this category for this file)

// Third-party library imports
import { Send } from 'react-native-gifted-chat';
import { IMessage } from 'react-native-gifted-chat/lib/types';

// Utilities / Helpers / API imports
// (No imports in this category for this file)

// Shared components / UI elements
// (No imports in this category for this file)

// Styles / Themes / Constants
import styles from './styles';

// Assets / Images / Icons
import SEND_BUTTON from '@/assets/icons/send.svg';

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
