// React imports
import React from 'react';

// React Native imports
import { View } from 'react-native';

// Library imports
import { Time, IMessage, TimeProps } from 'react-native-gifted-chat';

// Custom imports
import RED_FLAG from '../assets/icons/RedFlag'; // Update path as needed
import { Colors } from '../constants'; // Adjust the path if required
import { styles } from './styles';

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
