import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.home,
    },
    statusBar: {
        backgroundColor: Colors.background.home,
        height: getStatusBarHeight() + 30,
    },
    statusBarWithoutNotch: {
        backgroundColor: Colors.background.home,
        height: Metrics.ratio(30),
    },
    textInputProps: {
        fontSize: Fonts.size.xSmall,
        color: Colors.text.placeHolderTextColor,
        maxHeight: Metrics.ratio(80),
        marginLeft: Metrics.ratio(25),
        marginRight: Metrics.ratio(25),
        textAlign: 'left',
    },
    navBarColor: { backgroundColor: Colors.background.home },
    sendIcon: {
        backgroundColor: Colors.white,
        height: Metrics.ratio(40),
        width: Metrics.ratio(40),
        borderRadius: Metrics.ratio(25),
        marginHorizontal: Metrics.ratio(12),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        left: Metrics.screenWidth * 0.65,
    },

    deleted: {
        fontStyle: 'italic',
    },

    transparentBubble: {
        backgroundColor: 'transparent',
    },
});
