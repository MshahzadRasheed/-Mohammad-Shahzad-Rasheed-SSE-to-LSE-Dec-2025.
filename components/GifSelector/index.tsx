import React from 'react';
import { View, Pressable, Image } from 'react-native';
import OutsidePressHandler from 'react-native-outside-press';
import { GIF_IMAGES, IMAGE_TYPE } from '../../constants';
import { CHAT_ATTACHMENT } from '../../constants/AssetSVGConstants';
import styles from './styles';

interface RenderActionsProps {
    showGif: boolean;
    setShowGif: (value: boolean) => void;
    sendGif: (url: string, type: string) => void;
}

const RenderActions: React.FC<RenderActionsProps> = ({
    showGif,
    setShowGif,
    sendGif,
}) => {
    return (
        <OutsidePressHandler
            onOutsidePress={() => setShowGif(false)}
            style={styles.gifContainer}
        >
            <Pressable onPress={() => setShowGif(!showGif)}>
                {showGif && (
                    <View style={styles.gifTransparentBox}>
                        {GIF_IMAGES.map((item, index) => (
                            <Pressable
                                key={index}
                                onPress={() => {
                                    sendGif(item.attachmentUrl, IMAGE_TYPE.GIF);
                                    setShowGif(false);
                                }}
                            >
                                <Image
                                    source={item.imagePath}
                                    style={styles.gif}
                                    resizeMode='contain'
                                />
                            </Pressable>
                        ))}
                    </View>
                )}
                <CHAT_ATTACHMENT height={40} width={40} />
            </Pressable>
        </OutsidePressHandler>
    );
};

export default RenderActions;
