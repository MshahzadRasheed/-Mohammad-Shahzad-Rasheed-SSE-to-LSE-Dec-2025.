/**
 * TypeScript Type Definitions
 *
 * Centralized type definitions for the Chat module and related features.
 * Includes types for API payloads, responses, Redux state, and components.
 *
 * @module types
 */

// =============================================================================
// API PAYLOAD TYPES
// =============================================================================

/** Payload for user login request */
export type LoginPayload = {
    email: string;
    password: string;
};

/** Payload for deleting a chat conversation */
export type DeleteChatPayload = {
    conversationId?: string;
};

/** Response from chat deletion API */
export type DeleteChatResponse = {
    statusCode: string;
    timestamp: string;
    message: string;
};

/** Payload for deleting a specific message */
export type DeleteMessagePayload = {
    msgId?: string | number;
    /** If true, deletes for all participants */
    forAll: boolean;
};

/** Payload for fetching paginated messages */
export type GetMessagesPayload = {
    page: number;
    convId: string;
};

/** Payload for blocking/unblocking a user */
export type BlockEntityPayload = {
    follower?: string;
    status: boolean;
};

/** Scroll event dimensions payload */
export type EventScrollPayload = {
    height: number;
    width: number;
};

/** Violation policy for content reporting */
type PotentialViolation = {
    policy: string;
};

/** Payload for reporting content violations */
export type ReportContentPayload = {
    id: string;
    type: string;
    potential_violations: PotentialViolation[];
    imprintId?: string;
    userId?: string;
    isGlobal?: boolean;
};

/** Payload for fetching transparency data */
export type TransparencyPayload = {
    content_id: string;
    complex_type: string;
};

// =============================================================================
// REDUX STATE TYPES
// =============================================================================

/** Root Redux state interface */
export interface RootState {
    subscription: string;
    user: UserState;
    followers: FollowerState;
    generalReducer: GeneralState;
}

/** User slice of Redux state */
export interface UserState {
    data: UserData;
    accessToken: '';
    userInfo: UserInfo;
    isAppliedVoucher: boolean;
}

/** General app state slice */
export interface GeneralState {
    isRefreshPage: boolean;
}

/** Followers state slice */
export interface FollowerState {
    data: Follower[];
    followRequestData: Follower[];
}

// =============================================================================
// USER DATA TYPES
// =============================================================================

/** Core user data from authentication */
export interface UserData {
    isEmailVerified: boolean;
    tokens: UserTokens;
    userId: string;
    id: string;
}

/** Extended user information from profile */
export interface UserInfo {
    isFollower?: boolean;
    followerRequestSent?: boolean;
    ageBucket: string;
    avatarUrl: string;
    bio: string;
    createdAt: string;
    displayName: string;
    email: string;
    id: string;
    isEmailVerified: boolean;
    isOnboarded: boolean;
    kinApprovalStatus: string;
    profile: UserProfile;
    onboardingQuizStatus: string;
    scores: UserScores;
    stripeCustomerId: string;
    subscriptionId: string;
    subscriptionStatus: string;
    userId: string;
    userName: string;
    discountApplied: { availedBHDiscount: boolean };
    /** System action status for user reports */
    systemActionForUserReport: systemAction;
    /** System action status for imprints */
    systemActionForImprint: systemAction;
    /** System action status for chat */
    systemActionForChat: systemAction;
}

/** System moderation action interface */
interface systemAction {
    id: string;
    complexType: string;
    contentId: string;
}

/** User profile details */
export interface UserProfile {
    about: string;
    countryCode: string;
    createdAt: string;
    dob: string;
    gender: string;
    id: string;
    phone: string;
    updatedAt: string;
    userId: string;
    whatIStandFor: string;
    whatIValue: string[];
}

/** User engagement/wellness scores */
export interface UserScores {
    laughter: number;
    life: number;
    love: number;
    purpose: number;
    respect: number;
    safety: number;
}

/** Follower/Following user information */
export interface Follower {
    fromUser?: string;
    avatarUrl: string;
    displayName: string;
    email: string;
    id: string;
    userName: string;
    blockedImprints: boolean;
    blockedMessages: boolean;
    isUserBlocked: boolean;
}

/** Authentication token pair */
export interface UserTokens {
    accessToken: string;
    refreshToken: string;
}

// =============================================================================
// CONSTANTS AND ENUMS
// =============================================================================

/** Maps internal content types to API content types */
export const ContentTypeMapping = {
    IMPRINT: 'post',
    CONVERSATION_MESSAGE: 'chat',
    USER_REPORT: 'profile',
};

/** Scroll event dimension type */
export type EventScrollType = { height: number; width: number };

/** Content reporting type enumeration */
export enum ReportEnums {
    CHAT = 'chat',
    PROFILE = 'profile',
    POST = 'post',
    UNDER18 = 'under18',
    ALL = 'all',
    IMPRINT = 'imprint',
    NEGATIVE = 'negative',
    POSITIVE = 'positive',
    MESSAGE = 'Message',
}

// =============================================================================
// MESSAGE AND CONVERSATION TYPES
// =============================================================================

/** Content moderation decision */
interface Decision {
    action: string;
    actionType: string;
    violations: string[];
}

/** Message read receipt information */
interface ReadBy {
    readAt: string;
    userId: string;
}

/** Basic user information for messages */
interface User {
    avatarUrl: string;
    displayName: string;
    email: string;
    id: string;
    userName: string;
}

/** Full conversation message response from API */
export interface ConversationMessageResponse {
    attachmentType: string | null;
    attachmentUrl: string | null;
    content: string;
    conversationId: string;
    createdAt: string;
    decision: Decision;
    deletedFor: string[];
    fromUserId: string;
    id: string;
    isDeleted: boolean;
    isDeletedForEveryone: boolean;
    isFlagged: boolean | null;
    readBy: ReadBy[];
    updatedAt: string;
    user: User;
}

/** Payload for updating read status */
export interface ReadStatusPayload {
    conversationId: string;
}

/** Response from read status update API */
export interface ReadStatusUpdateResponse {
    updatedAt: string;
    unreadCount: number;
}

/** Response containing transparency redirect URL */
export interface TransparencyResponse {
    redirectUrl: string;
}

/** Response from message deletion API */
type DeleteMessageResponse = {
    message: string;
};

/** Response from content report API */
export type ReportContentResponse = {
    success: boolean;
    message?: string;
    errorCode?: string;
};

// =============================================================================
// COMPONENT PROPS TYPES
// =============================================================================

/**
 * Props interface for Chat component
 * Includes Redux-connected actions and navigation route params
 */
export interface ChatProps {
    /** Current user state from Redux */
    user: UserState;

    /** Action to fetch conversation messages */
    getConversationMessagesRequest: (
        payload: GetMessagesPayload,
        callback: (res: ConversationMessageResponse) => void
    ) => void;

    /** Action to get WebSocket chat token */
    getChatTokenRequest: (callback: (res: { token: string }) => void) => void;

    /** Action to update message read status */
    updateMessageReadStatus: (
        payload: ReadStatusPayload,
        callback: (res: { unreadMessageCount: number }) => void
    ) => void;

    /** Action to delete a message */
    deleteMessageRequest: (
        payload: DeleteMessagePayload,
        callback: (res: DeleteMessageResponse) => void
    ) => void;

    /** Action to report content violation */
    reportContentRequest: (
        payload: ReportContentPayload,
        callback: (res: ReportContentResponse) => void
    ) => void;

    /** Action to fetch transparency data */
    getTransparencyDataRequest: (
        payload: TransparencyPayload,
        responseCallback: TransparencyResponse
    ) => void;

    /** Navigation route with chat params */
    route: {
        params: {
            conversationId: string;
            participantList: Follower[];
            isBlocked: boolean;
            title: string;
            canMessage: boolean;
        };
    };
}

// =============================================================================
// NAVIGATION TYPES
// =============================================================================

/** Type definitions for Chat navigation stack */
export type ChatStackParamList = {
    Chat: {
        conversationId: string;
        participantList: Follower[];
        isBlocked: boolean;
        title?: string;
    };
    ReportScreen: {
        url: string;
        title: string;
    };
};

/** Action sheet context type for message actions */
export type ActionSheetContext = {
    actionSheet: () => {
        showActionSheetWithOptions: (
            options: {
                options: string[];
                cancelButtonIndex?: number;
                destructiveButtonIndex?: number;
                title?: string;
                message?: string;
            },
            callback: (buttonIndex: number) => void
        ) => void;
    };
};

/** Redux Saga request action types */
export interface RequestTypes {
    REQUEST: string;
    SUCCESS: string;
    FAILURE: string;
    CANCEL: string;
}
