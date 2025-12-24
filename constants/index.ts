/**
 * Application Constants
 *
 * Central repository for all application-wide constants including
 * validation rules, UI configurations, date formats, and type mappings.
 *
 * @module constants
 */

import React from 'react';
import { ImageSourcePropType } from 'react-native';

import {
    LIFE,
    SAFETY,
    LOVE,
    RESPECT,
    LAUGHTER,
    PURPOSE,
} from './AssetSVGConstants';

// ============================================================================
// VALIDATION & CONFIGURATION CONSTANTS
// ============================================================================

/** Minimum password length for user authentication */
export const PASSWORD_MIN_LENGTH = 6;

/** API timeout duration (ms) */

export const API_TIMEOUT = 10000;

/** Maximum password length for user authentication */
export const PASSWORD_MAX_LENGTH = 20;

/** Application base URL */
export const APP_URL = '';

/** Application domain */
export const APP_DOMAIN = '';

/** Default query limit for paginated requests */
export const QUERY_LIMIT = 10;

/** Timeout for saga alert messages (ms) */
export const SAGA_ALERT_TIMEOUT = 500;

/** Timeout for post view tracking (ms) */
export const POST_VIEW_TIMEOUT = 2000;

/** Image quality setting (0-1) */
export const IMAGE_QUALITY = 1;

/** Maximum image width for uploads (px) */
export const IMAGE_MAX_WIDTH = 720;

/** Maximum image height for uploads (px) */
export const IMAGE_MAX_HEIGHT = 480;

/** Maximum width for image compression (px) */
export const IMAGE_COMPRESS_MAX_WIDTH = 720;

/** Maximum height for image compression (px) */
export const IMAGE_COMPRESS_MAX_HEIGHT = 480;

/** Limit for verses of the day */
export const VERSES_OF_THE_DAY_LIMIT = 10;

/** Image compression format */
export const IMAGE_COMPRESS_FORMAT = 'JPEG';

/** Android notification channel name */
export const ANDROID_NOTI_CHANNEL = 'VeteranAppChanel';

/** Warning message for discard actions */
export const DISCARD_WARNING: String = 'Are You sure to discard';

// ============================================================================
// DATE & TIME FORMAT CONSTANTS
// ============================================================================

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

// ============================================================================
// UI CONFIGURATION CONSTANTS
// ============================================================================

/** Toast message display duration (ms) */
export const TOAST_LIMIT = 2000;

/** Chat bubble position options */
export const BUBBLE_POSITIONS = {
    LEFT: 'left',
    RIGHT: 'right',
};

/** Chat composer height (px) */
export const COMPOSER_HEIGHT = 80;

/** Toast position options */
export const TOAST_POSITION = {
    top: 'top',
    bottom: 'bottom',
};

/** Map latitude delta for zoom level */
export const LATITUDE_DELTA = 0.0922;

/** Map longitude delta for zoom level */
export const LONGITUDE_DELTA = 0.0421;

// ============================================================================
// MEDIA & FILE TYPE CONSTANTS
// ============================================================================

/** Image type identifiers */
export const IMAGE_TYPE = {
    GIF: 'GIF',
    JPG: 'jpg',
};

/** Default placeholder image URL */
export const PLACEHOLDER_IMAGE =
    'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';

/** Message type identifiers for alerts */
export const MESSAGE_TYPES = {
    INFO: 'info',
    ERROR: 'error',
    SUCCESS: 'success',
};

/** About page URL */
export const ABOUT_IMPRINT_PAGE = 'https://delta.imprint.live/about-imprint';

/** File type identifiers for media uploads */
export const FILE_TYPES = { VIDEO: 'video', IMAGE: 'image', AUDIO: 'audio' };

/** Regex pattern for detecting URLs and mentions in text */
export const MENTIONS_REGEX =
    /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.(xn--)?[a-z0-9-]{2,20}\b([-a-zA-Z0-9@:%_\+\[\],.~#?&\/=]*[-a-zA-Z0-9@:%_\+\]~#?&\/=])*/gi;

/** Media type display name mapping */
export const IMPRINT_MEDIA_TYPES_MAP = {
    document: 'Document',
    video: 'Video',
    image: 'Image',
    text: 'Document',
    map: 'Map',
    audio: 'Audio',
};

// ============================================================================
// CHAT ACTION CONSTANTS
// ============================================================================

/** Action options for user's own messages */
export const CHAT_MORE_FOR_OWN_MESSAGES = [
    'Delete for me',
    'Delete for everyone',
    'Cancel',
];

/** Action options for other users' messages */
export const CHAT_MORE_FOR_OTHER_MESSAGES = [
    'Delete',
    'Report message',
    'Cancel',
];
// ============================================================================
// SVG & BADGE COMPONENTS
// ============================================================================

/** SVG component mapping for value badges */
export const svgComponents: { [key: string]: React.ElementType } = {
    life: LIFE,
    safety: SAFETY,
    love: LOVE,
    respect: RESPECT,
    purpose: PURPOSE,
    laughter: LAUGHTER,
};

// ============================================================================
// GIF CONFIGURATION
// ============================================================================

/** Available GIF images for chat */
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

/** GIF URL to local asset mapping for chat */
export const GIF_MAPPING: Record<string, ImageSourcePropType> = {
    '/GIFs/dino.gif': require('../assets/gif/dino.gif'),
    '/GIFs/leaves.gif': require('../assets/gif/leaves.gif'),
    '/GIFs/tiger.gif': require('../assets/gif/tiger.gif'),
};

// ============================================================================
// BADGE & VALUE MAPPINGS
// ============================================================================

/** Badge type to display name mapping */
export const BADGE_MAPPING: Record<string, string> = {
    VALUE_BADGE_ASSIGNED_LAUGHTER: 'Laughter',
    VALUE_BADGE_ASSIGNED_SAFETY: 'Safety',
    VALUE_BADGE_ASSIGNED_PURPOSE: 'Purpose',
    VALUE_BADGE_ASSIGNED_RESPECT: 'Respect',
    VALUE_BADGE_ASSIGNED_SAD: 'Sadness',
    VALUE_BADGE_ASSIGNED_LOVE: 'Love',
    VALUE_BADGE_ASSIGNED_LIFE: 'Life',
};

/** Array of all available badge types */
export const BADGE_TYPES = [
    'VALUE_BADGE_ASSIGNED_LAUGHTER',
    'VALUE_BADGE_ASSIGNED_SAFETY',
    'VALUE_BADGE_ASSIGNED_PURPOSE',
    'VALUE_BADGE_ASSIGNED_RESPECT',
    'VALUE_BADGE_ASSIGNED_SAD',
    'VALUE_BADGE_ASSIGNED_LOVE',
    'VALUE_BADGE_ASSIGNED_LIFE',
];

// ============================================================================
// CHAT BLOCKING & MODERATION
// ============================================================================

/** Chat conversation blocking reasons */
export const CHAT_BLOCK_MAPPING = {
    BAN_CONVERSATION: 'BAN_CONVERSATION',
    BAN_CONVERSATION_U18: 'BAN_CONVERSATION_U18',
};

/** Chat message type identifiers */
export enum CHAT_MESSAGES {
    CONVERSATION_MESSAGE = 'conversation_message',
}

// Replaced magic numbers with named constants
export const DEBOUNCE_DELAY = 300; // ms
export const SCROLL_OFFSET = 20; // px
