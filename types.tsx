export type LoginPayload = {
    email: string;
    password: string;
};

export type DeleteChatPayload = {
    conversationId?: string;
};

export type DeleteChatResponse = {
    statusCode: string;
    timestamp: string;
    message: string;
};

export type DeleteMessagePayload = {
    msgId?: string | number;
    forAll: boolean;
};

export type GetMessagesPayload = {
    page: number;
    convId: string;
};

export type BlockEntityPayload = {
    follower?: string;
    status: boolean;
};

export type EventScrollPayload = {
    height: number;
    width: number;
};

type PotentialViolation = {
    policy: string;
};

export type ReportContentPayload = {
    id: string;
    type: string;
    potential_violations: PotentialViolation[];
    imprintId?: string;
    userId?: string;
    isGlobal?: boolean;
};

export type TransparencyPayload = {
    content_id: string;
    complex_type: string;
};

export interface RootState {
    subscription: string;
    user: UserState;
    followers: FollowerState;
    generalReducer: GeneralState;
}

export interface UserState {
    data: UserData;
    accessToken: '';
    userInfo: UserInfo;
    isAppliedVoucher: boolean;
}

export interface GeneralState {
    isRefreshPage: boolean;
}

export interface FollowerState {
    data: Follower[];
    followRequestData: Follower[];
}

export interface UserData {
    isEmailVerified: boolean;
    tokens: UserTokens;
    userId: string;
    id: string;
}

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
    systemActionForUserReport: systemAction;
    systemActionForImprint: systemAction;
    systemActionForChat: systemAction;
}
interface systemAction {
    id: string;
    complexType: string;
    contentId: string;
}

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

export interface UserScores {
    laughter: number;
    life: number;
    love: number;
    purpose: number;
    respect: number;
    safety: number;
}

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

export interface UserTokens {
    accessToken: string;
    refreshToken: string;
}

export const ContentTypeMapping = {
    IMPRINT: 'post',
    CONVERSATION_MESSAGE: 'chat',
    USER_REPORT: 'profile',
};
export const ChatBlockMapping = {
    BAN_CONVERSATION: 'BAN_CONVERSATION',
    BAN_CONVERSATION_U18: 'BAN_CONVERSATION_U18',
};

export type EventScrollType = { height: number; width: number };

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

export interface FOLLOWERS {
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
interface Decision {
    action: string;
    actionType: string;
    violations: string[];
}

interface ReadBy {
    readAt: string;
    userId: string;
}

interface User {
    avatarUrl: string;
    displayName: string;
    email: string;
    id: string;
    userName: string;
}

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
export interface ReadStatusPayload {
    conversationId: string;
}

export interface ReadStatusUpdateResponse {
    updatedAt: string;
    unreadCount: number;
}

export interface TransparencyResponse {
    redirectUrl: string;
}
type DeleteMessageResponse = {
    message: string;
};

export type ReportContentResponse = {
    success: boolean;
    message?: string;
    errorCode?: string;
};

export interface ChatProps {
    user: UserState;
    getConversationMessagesRequest: (
        payload: GetMessagesPayload,
        callback: (res: ConversationMessageResponse) => void
    ) => void;

    getChatTokenRequest: (callback: (res: { token: string }) => void) => void;
    updateMessageReadStatus: (
        payload: ReadStatusPayload,
        callback: (res: { unreadMessageCount: number }) => void
    ) => void;

    deleteMessageRequest: (
        payload: DeleteMessagePayload,
        callback: (res: DeleteMessageResponse) => void
    ) => void;
    reportContentRequest: (
        payload: ReportContentPayload,
        callback: (res: ReportContentResponse) => void
    ) => void;
    getTransparencyDataRequest: (
        payload: TransparencyPayload,
        responseCallback: TransparencyResponse
    ) => void;

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
