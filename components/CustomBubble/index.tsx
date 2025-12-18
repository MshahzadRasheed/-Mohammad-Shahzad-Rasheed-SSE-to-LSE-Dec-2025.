import React from 'react';
import { View } from 'react-native';
import { Bubble, BubbleProps, IMessage } from 'react-native-gifted-chat';
import RED_FLAG from '../assets/icons/RedFlag';
import { CHAT_LIST } from '../../constants/StringConstants';
import { BUBBLE_POSITIONS } from '../../constants';
import styles from './styles';

interface CustomBubbleProps {
    props: BubbleProps<IMessage>;
}

export const CustomBubble: React.FC<CustomBubbleProps> = ({ props }) => {
    const isLeft = props.position === BUBBLE_POSITIONS.LEFT;
    const currentMessage = props.currentMessage;

    const renderCustomView = () => {
        if (isLeft) {
            return (
                <View style={styles.iconContainer}>
                    <RED_FLAG height={15} width={15} />
                </View>
            );
        }
        return null;
    };

    return (
        <Bubble
            {...props}
            renderCustomView={renderCustomView}
            textStyle={{
                left: styles.textLeftStyle,
                right: styles.textRightStyle,
            }}
            customTextStyle={[
                styles.combineTextStyle,
                currentMessage?.text === CHAT_LIST.MESSAGE_DELETED &&
                    styles.deleted,
            ]}
            wrapperStyle={{
                right: [
                    styles.chatBubbleRightStyle,
                    currentMessage?.image !== null && styles.transparentBubble,
                ],
                left: [
                    styles.chatBubbleLeftStyle,
                    currentMessage?.image !== null && styles.transparentBubble,
                ],
            }}
        />
    );
};
