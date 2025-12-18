import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../../theme';
import { Fonts } from '../../../theme';

export const styles = StyleSheet.create({
    gifContainer: {
        position: 'absolute',
        left: Metrics.ratio(-65),
        marginHorizontal: Metrics.baseMargin,
    },
    gifTransparentBox: {
        marginBottom: Metrics.ratio(20),
        backgroundColor: 'transparent',
        borderRadius: Metrics.ratio(10),
        flexDirection: 'row',
    },
    gif: {
        borderRadius: Metrics.ratio(40),
        backgroundColor: Colors.white,
        width: Metrics.ratio(80),
        height: Metrics.ratio(80),
        alignSelf: 'center',
        marginHorizontal: Metrics.smallMargin,
    },
});
