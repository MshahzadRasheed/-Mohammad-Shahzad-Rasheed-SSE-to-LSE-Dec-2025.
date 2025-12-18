const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const CANCEL = 'CANCEL';
const FAILURE = 'FAILURE';

function createRequestTypes(base: string) {
    const res: { [key: string]: string } = {};
    [REQUEST, SUCCESS, FAILURE, CANCEL].forEach((type) => {
        res[type] = `${base}_${type}`;
    });
    return res;
}

//Auth Actions Types
export const GOOGLE_SIGN_IN = createRequestTypes('GOOGLE_SIGN_IN');
export const USER_SIGN_IN = createRequestTypes('USER_SIGN_IN');
export const USER_INFO = createRequestTypes('USER_INFO');
export const FOLLOW_FRIENDS = createRequestTypes('FOLLOW_FRIENDS');
export const USER_SIGNUP = createRequestTypes('USER_SIGNUP');
export const VERIFY_USERNAME = createRequestTypes('VERIFY_USERNAME');
export const SETUP_PROFILE = createRequestTypes('SETUP_PROFILE');
export const USER_FRIENDS_SUGGESTION = createRequestTypes(
    'USER_FRIENDS_SUGGESTION'
);

export const SEND_OTP = createRequestTypes('SEND_OTP');
export const VALIDATE_OTP = createRequestTypes('VALIDATE_OTP');
export const RESET_PASSWORD = createRequestTypes('RESET_PASSWORD');

export const SEARCH_USER = createRequestTypes('SEARCH_USER');

// USER_FOLLOWERS
export const USER_FOLLOWERS = createRequestTypes('USER_FOLLOWERS');
//GET FOLLOW REQUEST
export const GET_FRIEND_REQUEST_SENDER = createRequestTypes(
    'GET_FRIEND_REQUEST_SENDER'
);
export const UN_FOLLOW = createRequestTypes('UN_FOLLOW');
// hide Imprint
export const BLOCK_IMPRINT = createRequestTypes('BLOCK_IMPRINT');
// Block User
export const BLOCK_USER = createRequestTypes('BLOCK_USER');

export const BLOCK_MESSAGE = createRequestTypes('BLOCK_MESSAGE');

export const RESPONSE_TO_FOLLOWERS = createRequestTypes(
    'RESPONSE_TO_FOLLOWERS'
);

export const MEDIA_CHECK_IN_VIEW = createRequestTypes('MEDIA_CHECK_IN_VIEW');
export const TAG_MEDIA = createRequestTypes('TAG_MEDIA');
export const RESPOND_TO_TAG = createRequestTypes('RESPOND_TO_TAG');

//Post Actions Types
export const USER_POST_IMPRINT = createRequestTypes('USER_POST_IMPRINT');
export const USER_UPDATE_IMPRINT = createRequestTypes('USER_UPDATE_IMPRINT');

export const GLOBAL_TIMELINE = createRequestTypes('GLOBAL_TIMELINE');

export const RESET_TIMELINE = createRequestTypes('RESET_TIMELINE');

export const UPDATE_TIME_LINE = 'UPDATE_TIME_LINE';

export const PERSONAL_TIMELINE = createRequestTypes('PERSONAL_TIMELINE');

export const USER_TIMELINE = createRequestTypes('USER_TIMELINE');

export const POST_REACTION = createRequestTypes('POST_REACTION');
export const DELETE_IMPRINT = createRequestTypes('DELETE_IMPRINT');

export const USER_LOGOUT = createRequestTypes('USER_LOGOUT');

export const IMPRINT_VERIFICATION_REQUEST = createRequestTypes(
    'IMPRINT_VERIFICATION_REQUEST'
);

export const EDIT_IMAGE = createRequestTypes('EDIT_IMAGE');

export const IMPRINT_SHOUT_OUT = createRequestTypes('IMPRINT_SHOUT_OUT');

export const COMPLETE_PROFiLE = createRequestTypes('COMPLETE_PROFiLE');

export const UPDATED_PROFILE_OVERVIEW = createRequestTypes(
    'UPDATED_PROFILE_OVERVIEW'
);

export const UPDATE_PROFILE_ABOUT = createRequestTypes('UPDATE_ABOUT');

export const GET_INSTITUTE = createRequestTypes('GET_INSTITUTE');

export const EMPTY_INSTITUTE = createRequestTypes('EMPTY_INSTITUTE');

export const UPDATE_EDUCATION = createRequestTypes('UPDATE_EDUCATION');

export const DELETE_EDUCATION = createRequestTypes('DELETE_EDUCATION');

export const ADD_EDUCATION = createRequestTypes('ADD_EDUCATION');

export const ADD_EMPLOYMENT = createRequestTypes('ADD_EMPLOYMENT');

export const DELETE_EMPLOYMENT = createRequestTypes('DELETE_EMPLOYMENT');

export const UPDATE_EMPLOYMENT = createRequestTypes('UPDATE_EMPLOYMENT');

export const ADD_FAMILY = createRequestTypes('ADD_FAMILY');

export const DELETE_FAMILY = createRequestTypes('DELETE_FAMILY');

export const UPDATE_FAMILY = createRequestTypes('UPDATE_FAMILY');

export const USER_SEARCH = createRequestTypes('USER_SEARCH');

export const EMPTY_USERS = createRequestTypes('EMPTY_USERS');

export const GET_RELATION_ENUMS = createRequestTypes('GET_RELATION_ENUMS');

export const GET_USER_TIMELINE = createRequestTypes('GET_USER_TIMELINE');

export const GET_OTHER_USER_DETAILS = createRequestTypes(
    'GET_OTHER_USER_DETAILS'
);

export const GET_FILTERED_TIMELINE = createRequestTypes(
    'GET_FILTERED_TIMELINE'
);

export const IMPRINT_BOOKMARK = createRequestTypes('IMPRINT_BOOKMARK');

export const NETWORK_INFO = 'NETWORK_INFO';

export const EMPTY = createRequestTypes('EMPTY');

export const EDUCATION_DATA = createRequestTypes('EDUCATION_DATA');

//ALL CHAT ACTIONS

export const RECENT_CHAT_LIST = createRequestTypes('RECENT_CHAT_LIST');

export const CREATE_CHAT_GROUP = createRequestTypes('CREATE_CHAT_GROUP');

export const GET_CONVERSATION_MESSAGES = createRequestTypes(
    'GET_CONVERSATION_MESSAGES'
);

export const GET_PUB_SUB_TOKEN = createRequestTypes('GET_PUB_SUB_TOKEN');

export const GET_CHAT_TOKEN = createRequestTypes('GET_CHAT_TOKEN');

export const UPDATE_READ_STATUS = createRequestTypes('UPDATE_READ_STATUS');

export const DELETE_CHAT_GROUP = createRequestTypes('DELETE_CHAT_GROUP');

export const DELETE_CHAT = createRequestTypes('DELETE_CHAT');

export const DELETE_MESSAGE = createRequestTypes('DELETE_MESSAGE');

export const LEAVE_CONVERSATION = createRequestTypes('LEAVE_CONVERSATION');
export const FLAG_MESSAGE = createRequestTypes('FLAG_MESSAGE');

export const FLAG_CONVERSATION = createRequestTypes('FLAG_CONVERSATION');

// Action for Refresh  Page ;

export const REFRESH_PAGE = 'REFRESH_PAGE';
export const GET_VALUE_ANALYTICS = createRequestTypes('GET_VALUE_ANALYTICS');

export const GET_VALUE_PORTFOLIO = createRequestTypes('GET_VALUE_PORTFOLIO');

export const GET_TIME_OPTIONS = createRequestTypes('GET_TIME_OPTIONS');

export const UPDATE_CONTACT = createRequestTypes('UPDATE_CONTACT');

export const GET_NOTIFICATIONS = createRequestTypes('GET_NOTIFICATIONS');

export const READ_NOTIFICATION = createRequestTypes('READ_NOTIFICATION');

export const GET_IMPRINT_BY_ID = createRequestTypes('GET_IMPRINT_BY_ID');

export const GET_TRANSPARENCY_DATA = createRequestTypes(
    'GET_TRANSPARENCY_DATA'
);
export const APPEAL_DECISION = createRequestTypes('APPEAL_DECISION');

export const UPDATE_VERIFICATION = createRequestTypes('UPDATE_VERIFICATION');

export const REQUEST_FOLLOW = createRequestTypes('REQUEST_FOLLOW');

export const GET_RUDI_MESSAGE = createRequestTypes('GET_RUDI_MESSAGE');

export const GET_RUDI_FILE = createRequestTypes('GET_RUDI_FILE');

export const SEND_RUDI_MESSAGE = createRequestTypes('SEND_RUDI_MESSAGE');

export const UPLOAD_RUDI_FILE = createRequestTypes('UPLOAD_RUDI_FILE');

export const DELETE_RUDI_FILE = createRequestTypes('DELETE_RUDI_FILE');

export const GET_NEXT_OF_KIN = createRequestTypes('GET_NEXT_OF_KIN');

export const DELETE_NEXT_OF_KIN = createRequestTypes('DELETE_NEXT_OF_KIN');

export const ADD_NEXT_OF_KIN = createRequestTypes('ADD_NEXT_OF_KIN');

export const REMIND_NEXT_OF_KIN = createRequestTypes('REMIND_NEXT_OF_KIN');

// Profile Quiz Actions

export const PROFILE_QUIZ = createRequestTypes('PROFILE_QUIZ');
export const SUBMIT_PROFILE_QUIZ = createRequestTypes('SUBMIT_PROFILE_QUIZ');

export const MODERATION_PROFILE = createRequestTypes('MODERATION_PROFILE');

export const MODERATION_PROFILE_PHOTO = createRequestTypes(
    'MODERATION_PROFILE_PHOTO'
);

//Subscription Actions
export const GET_PLANS = createRequestTypes('GET_PLANS');
export const PURCHASE_SUBSCRIPTIONS = createRequestTypes(
    'PURCHASE_SUBSCRIPTIONS'
);
export const BILLING_PORTAL = createRequestTypes('BILLING_PORTAL');

export const VALID_COUPON = createRequestTypes('VALID_COUPON');

//ENTERTAINMENTS_ACTIONS

export const GET_ENTERTAINMENTS_CONTENT = createRequestTypes(
    'GET_ENTERTAINMENTS_CONTENT'
);

export const SHARE_IMPRINT = createRequestTypes('SHARE_IMPRINT');

export const QUIZ_PREVIEW_LIST = createRequestTypes('QUIZ_PREVIEW_LIST');
export const QUIZ_UPDATE_ITEM = 'QUIZ_UPDATE_ITEM';
export const UPDATE_REWARD_ITEM = 'UPDATE_REWARD_ITEM';

export const ENTERTAINMENT_QUIZ = createRequestTypes('ENTERTAINMENT_QUIZ');
export const ENTERTAINMENT_QUIZ_ATTEMPT = createRequestTypes(
    'ENTERTAINMENT_QUIZ_ATTEMPT'
);
// News Actions

export const GET_NEWS = createRequestTypes('GET_NEWS');

export const APPLY_VOUCHER = 'APPLY_VOUCHER';

//Search Actions

export const FREE_TEXT_SEARCH_USERS = createRequestTypes(
    'FREE_TEXT_SEARCH_USERS'
);

export const FREE_TEXT_SEARCH_IMPRINTS = createRequestTypes(
    'FREE_TEXT_SEARCH_IMPRINTS'
);

export const VIOLATION_POLICIES = createRequestTypes('VIOLATION_POLICIES');
export const REPORT_CONTENT = createRequestTypes('REPORT_CONTENT');
export const UPDATE_REDFLAG_STATUS = 'UPDATE_REDFLAG_STATUS';

export const SET_SYSTEM_ACTION = 'SET_SYSTEM_ACTION';
