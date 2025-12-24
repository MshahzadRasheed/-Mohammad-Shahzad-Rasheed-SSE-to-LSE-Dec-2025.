import { StyleSheet } from 'react-native';
import { Colors } from '../../../theme';
import { Fonts } from '../../../theme';

export const styles = StyleSheet.create({
    leftTimeStyle: {
        textAlign: 'left',
        color: Colors.white,
        fontSize: Fonts.size.xxSmall,
    },
    rightTimeStyle: {
        color: Colors.toggleColors.activeColor,
        fontSize: Fonts.size.xxSmall,
    },
    flag: {
        marginTop: 5,
        height: 20,
        width: 50,
    },
});
