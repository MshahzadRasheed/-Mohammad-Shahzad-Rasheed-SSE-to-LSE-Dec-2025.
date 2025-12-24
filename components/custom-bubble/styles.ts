import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../../theme';

export default StyleSheet.create({
    textLeftStyle: {
        maxWidth: Metrics.screenWidth * 0.6,
        backgroundColor: Colors.black,
        color: Colors.white,
    },
    textRightStyle: {
        color: Colors.toggleColors.activeColor,
        marginHorizontal: Metrics.baseMargin,
    },
    combineTextStyle: {
        overflow: 'hidden',
        paddingHorizontal: Metrics.ratio(0),
    },
    chatBubbleRightStyle: {
        marginBottom: Metrics.ratio(10),
        backgroundColor: Colors.white,
        borderWidth: Metrics.ratio(0),
        borderColor: 'transparent',
        borderTopLeftRadius: Metrics.ratio(10),
        borderTopRightRadius: Metrics.ratio(6),
        borderBottomRightRadius: Metrics.ratio(6),
        borderBottomLeftRadius: Metrics.ratio(10),
        minWidth: Metrics.ratio(100),
    },
    chatBubbleLeftStyle: {
        overflow: 'hidden',
        marginBottom: Metrics.ratio(10),
        backgroundColor: Colors.black,
        borderWidth: Metrics.ratio(0),
        borderColor: 'transparent',
        borderTopLeftRadius: Metrics.ratio(6),
        borderTopRightRadius: Metrics.ratio(10),
        borderBottomRightRadius: Metrics.ratio(10),
        borderBottomLeftRadius: Metrics.ratio(6),
        minWidth: Metrics.ratio(200),
    },
    iconContainer: {
        position: 'relative',
    },
});
