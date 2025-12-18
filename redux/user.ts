import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
    USER_INFO,
    USER_LOGOUT,
    USER_SIGN_IN,
    SET_SYSTEM_ACTION,
} from '../redux/ActionTypes';
import { LoginPayload, UserData } from '../types';

const initialState = Immutable({
    data: {},
    access_token: '',
    userInfo: {},
    isAppliedVoucher: false,
});

export default (
    state = initialState,
    action: {
        type?: string;
        responseCallback: UserData;
        payload?: LoginPayload;
        response: UserData;
    }
) => {
    switch (action.type) {
        case USER_SIGN_IN.SUCCESS: {
            const { response } = action;
            return Immutable.merge(state, {
                data: response,
                access_token: response.tokens.accessToken,
            });
        }
        case USER_INFO.SUCCESS: {
            const { response } = action;
            let updatedResponse = response;
            updatedResponse.userId = response.id;
            return Immutable.merge(state, {
                userInfo: updatedResponse,
            });
        }

        case SET_SYSTEM_ACTION: {
            return Immutable.merge(state, {
                userInfo: {
                    ...state.user,
                    setSystemActionForImprint: null,
                    setSystemActionForChat: null,
                    systemActionForUserReport: null,
                },
            });
        }

        case USER_LOGOUT.SUCCESS: {
            return initialState;
        }

        default:
            return state;
    }
};
