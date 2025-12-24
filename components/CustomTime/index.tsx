// React / React Native core imports
import React from 'react';
import { View } from 'react-native';

// Navigation / State / Context imports
// (No imports in this category for this file)

// Third-party library imports
import { Time, IMessage, TimeProps } from 'react-native-gifted-chat';

// Utilities / Helpers / API imports
// (No imports in this category for this file)

// Shared components / UI elements
// (No imports in this category for this file)

// Styles / Themes / Constants
import { Colors } from '@/constants';
import { styles } from './styles';

// Assets / Images / Icons
import RED_FLAG from '@/assets/icons/RedFlag';

interface CustomTimeProps {
    props: (props: TimeProps<IMessage>) => React.ReactNode;
    messages: IMessage[];
    userId: string;
}

export const CustomTime: React.FC<CustomTimeProps> = ({
    props,
    messages,
    userId,
}) => {
    const currentMessage = props.currentMessage;

    const currentMessageIndex = messages.findIndex(
        (message: IMessage) => message._id === currentMessage._id
    );

    const showFlag =
        currentMessageIndex !== -1 &&
        messages[currentMessageIndex].isFlagged !== null &&
        currentMessage.user?._id !== userId;

    return (
        <>
            <Time
                {...props}
                timeTextStyle={{
                    left: [
                        styles.leftTimeStyle,
                        currentMessage?.image !== null && {
                            color: Colors.black,
                        },
                    ],
                    right: [
                        styles.rightTimeStyle,
                        currentMessage?.image !== null && {
                            color: Colors.black,
                        },
                    ],
                }}
            />
            {showFlag && (
                <View style={styles.flag}>
                    <RED_FLAG height={15} width={15} />
                </View>
            )}
        </>
    );
};
