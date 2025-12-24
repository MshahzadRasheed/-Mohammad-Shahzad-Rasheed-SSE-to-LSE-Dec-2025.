// React / React Native core imports
import React from 'react';
import { View, Pressable, Image } from 'react-native';

// Navigation / State / Context imports
// (No imports in this category for this file)

// Third-party library imports
import OutsidePressHandler from 'react-native-outside-press';

// Utilities / Helpers / API imports
import { GIF_IMAGES, IMAGE_TYPE } from '@/constants';

// Shared components / UI elements
// (No imports in this category for this file)

// Styles / Themes / Constants
import { styles } from './styles';

// Assets / Images / Icons
import { CHAT_ATTACHMENT } from '@/constants/AssetSVGConstants';

interface GifSelectorProps {
    showGif: boolean;
    setShowGif: (value: boolean) => void;
    sendGif: (url: string, type: string) => void;
}

export const GifSelector: React.FC<GifSelectorProps> = ({
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
