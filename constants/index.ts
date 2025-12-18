import moment from 'moment';
import React from 'react';
import { ImageSourcePropType } from 'react-native';

import {
    LAUGHTER_GLOBAL,
    LAUGHTER_PERSONAL,
    LAUGHTER_STONE,
    LIFE,
    LIFE_GLOBAL,
    LIFE_PERSONAL,
    LIFE_STONE,
    LOVE_GLOBAL,
    LOVE_PERSONAL,
    LOVE_STONE,
    PURPOSE_GLOBAL,
    PURPOSE_PERSONAL,
    PURPOSE_STONE,
    RESPECT_GLOBAL,
    RESPECT_PERSONAL,
    RESPECT_STONE,
    SAFETY,
    SAFETY_GLOBAL,
    SAFETY_PERSONAL,
    SAFETY_STONE,
    LOVE,
    RESPECT,
    LAUGHTER,
    PURPOSE,
} from './AssetSVGConstants';
import { Colors } from '../theme';

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;
// export const TIME_ZONE = (-1 * new Date().getTimezoneOffset()) / 60;
export const APP_URL = '';
export const APP_DOMAIN = '';
export const QUERY_LIMIT = 10;
export const SAGA_ALERT_TIMEOUT = 500;
export const POST_VIEW_TIMEOUT = 2000;
export const IMAGE_QUALITY = 1;
export const IMAGE_MAX_WIDTH = 720;
export const IMAGE_MAX_HEIGHT = 480;
export const IMAGE_COMPRESS_MAX_WIDTH = 720;
export const IMAGE_COMPRESS_MAX_HEIGHT = 480;
export const VERSES_OF_THE_DAY_LIMIT = 10;
export const IMAGE_COMPRESS_FORMAT = 'JPEG';
export const ANDROID_NOTI_CHANNEL = 'VeteranAppChanel';

export const DISCARD_WARNING: String = 'Are You sure to discard';

// date time formats
export const DATE_FORMAT1 = 'dddd, DD MMMM, YYYY';
export const DATE_FORMAT2 = 'YYYY MMMM DD';
export const DATE_FORMAT3 = 'YYYY-MM-DD';
export const TIME_FORMAT1 = 'hh:mm A';
export const TIME_FORMAT2 = 'HH:mm ';

export const DATE_FORMAT_TIME1 = 'Do | MMM | HH';
export const DATE_FORMAT4 = 'dddd, DD MMMM YYYY';
export const DATE_FORMAT5 = 'MMM DD, YYYY';
export const DATE_FORMAT6 = 'MMM-DD';
export const DATE_FORMAT_7 = 'MMM DD, YYYY, hh:mm A';
export const TOAST_LIMIT = 2000;
export const BUBBLE_POSITIONS = {
    LEFT: 'left',
    RIGHT: 'right',
};
export const COMPOSER_HEIGHT = 80;
export const TOAST_POSITION = {
    top: 'top',
    bottom: 'bottom',
};
export const LATITUDE_DELTA = 0.0922;
export const LONGITUDE_DELTA = 0.0421;
export const IMAGE_TYPE = {
    GIF: 'GIF',
    JPG: 'jpg',
};

export const PLACEHOLDER_IMAGE =
    'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';
// Message types
export const MESSAGE_TYPES = {
    INFO: 'info',
    ERROR: 'error',
    SUCCESS: 'success',
};
export const ABOUT_IMPRINT_PAGE = 'https://delta.imprint.live/about-imprint';

// File Types
export const FILE_TYPES = { VIDEO: 'video', IMAGE: 'image', AUDIO: 'audi' };

export const MENTIONS_REGEX =
    /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.(xn--)?[a-z0-9-]{2,20}\b([-a-zA-Z0-9@:%_\+\[\],.~#?&\/=]*[-a-zA-Z0-9@:%_\+\]~#?&\/=])*/gi;

export const IMPRINT_MEDIA_TYPES_MAP = {
    document: 'Document',
    video: 'Video',
    image: 'Image',
    text: 'Document',
    map: 'Map',
    audio: 'Audio',
};

export const CHAT_MORE_FOR_OWN_MESSAGES = [
    'Delete for me',
    'Delete for everyone',
    'Cancel',
];

export const CHAT_MORE_FOR_OTHER_MESSAGES = [
    'Delete',
    'Report message',
    'Cancel',
];
export const svgComponents: { [key: string]: React.ElementType } = {
    life: LIFE,
    safety: SAFETY,
    love: LOVE,
    respect: RESPECT,
    purpose: PURPOSE,
    laughter: LAUGHTER,
};

export const GIF_IMAGES = [
    {
        id: 1,
        name: 'dino',
        attachmentUrl: '/GIFs/dino.gif',
        imagePath: require('../assets/gif/dino.gif'),
    },
    {
        id: 2,
        name: 'leaves',
        attachmentUrl: '/GIFs/leaves.gif',
        imagePath: require('../assets/gif/leaves.gif'),
    },
    {
        id: 3,
        name: 'tiger',
        attachmentUrl: '/GIFs/tiger.gif',
        imagePath: require('../assets/gif/tiger.gif'),
    },
];

export const GIF_MAPPING: Record<string, ImageSourcePropType> = {
    '/GIFs/dino.gif': require('../assets/gif/dino.gif'),
    '/GIFs/leaves.gif': require('../assets/gif/leaves.gif'),
    '/GIFs/tiger.gif': require('../assets/gif/tiger.gif'),
};

export const BADGE_MAPPING: Record<string, string> = {
    VALUE_BADGE_ASSIGNED_LAUGHTER: 'Laughter',
    VALUE_BADGE_ASSIGNED_SAFETY: 'Safety',
    VALUE_BADGE_ASSIGNED_PURPOSE: 'Purpose',
    VALUE_BADGE_ASSIGNED_RESPECT: 'Respect',
    VALUE_BADGE_ASSIGNED_SAD: 'Sadness',
    VALUE_BADGE_ASSIGNED_LOVE: 'Love',
    VALUE_BADGE_ASSIGNED_LIFE: 'Life',
};
export const BADGE_TYPES = [
    'VALUE_BADGE_ASSIGNED_LAUGHTER',
    'VALUE_BADGE_ASSIGNED_SAFETY',
    'VALUE_BADGE_ASSIGNED_PURPOSE',
    'VALUE_BADGE_ASSIGNED_RESPECT',
    'VALUE_BADGE_ASSIGNED_SAD',
    'VALUE_BADGE_ASSIGNED_LOVE',
    'VALUE_BADGE_ASSIGNED_LIFE',
];

export const CHAT_BLOCK_MAPPING = {
    BAN_CONVERSATION: 'BAN_CONVERSATION',
    BAN_CONVERSATION_U18: 'BAN_CONVERSATION_U18',
};
