import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../../theme';
import { Fonts } from '../../../theme';

export const styles = StyleSheet.create({
    underlineText: { textDecorationLine: 'underline', color: Colors.blue },
    bannedText: {
        textAlign: 'center',
        color: Colors.black,
        paddingBottom: Metrics.baseMargin,
        marginHorizontal: Metrics.ratio(10),
    },
    inputContainer: {
        paddingBottom: Metrics.ratio(5),
        marginBottom: Metrics.doubleBaseMargin,
        fontSize: Fonts.size.large,
        width: Metrics.screenWidth * 0.65,
        maxHeight: Metrics.ratio(100),
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10.84,
        elevation: 5,
        borderRadius: Metrics.ratio(75),
        borderColor: 'transparent',

        alignSelf: 'center',
    },
});
