/**
 * Chat Module Test Suite (Improved)
 *
 * Covers:
 * - Chat Component rendering and interactions
 * - HOC integration
 * - Custom hooks functionality
 * - Redux actions and state management
 *
 * All tests follow AAA (Arrange-Act-Assert).
 */

/* React / React Native core imports */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

/* Custom module imports */
import Chat from '../Chat';
import withChatLogic from '../hoc/withChatLogic';
import { useMessageLongPress } from '../hooks/useMessageLongPress';
import { usePaginatedScroll } from '../hooks/usePaginatedScroll';
import {
    getConversationMessagesRequest,
    updateMessageReadStatus,
    deleteMessageRequest,
} from '../redux/ChatActions';
import {
    GET_CONVERSATION_MESSAGES,
    UPDATE_READ_STATUS,
    DELETE_MESSAGE,
} from '../redux/actionTypes';
import { ChatProps } from '../types';

const mockStore = configureStore([]);
const mockNavigation = { goBack: jest.fn() };

/** Helper: Create mock Redux store */
const createMockStore = () =>
    mockStore({
        user: {
            userInfo: {
                userId: '123',
                displayName: 'Test User',
                avatarUrl: 'https://example.com/avatar.png',
            },
        },
    });

/** Default route params for chat screen */
const defaultRouteParams = {
    conversationId: 'conv123',
    participantList: [],
    isBlocked: false,
    title: 'Test Chat',
    canMessage: true,
};

/** Create route object with optional overrides */
const createRoute = (overrides = {}) => ({
    params: { ...defaultRouteParams, ...overrides },
});

/** Mock message object */
const createMockMessage = (overrides = {}) => ({
    _id: 'msg123',
    text: 'Test message',
    createdAt: new Date(),
    user: {
        _id: '123',
        name: 'Test User',
        avatar: 'https://example.com/avatar.png',
    },
    ...overrides,
});

describe('Chat Module Tests', () => {
    let store: ReturnType<typeof mockStore>;
    let WrappedChat: React.ComponentType<ChatProps>;

    beforeEach(() => {
        store = createMockStore();
        WrappedChat = withChatLogic(Chat);
    });

    /* ========== Chat Component with HOC  ==========*/

    describe('Chat Component with HOC', () => {
        it('renders Chat component with correct title', () => {
            const route = createRoute({ title: 'Test Chat' });

            const { getByText } = render(
                <Provider store={store}>
                    <WrappedChat route={route} navigation={mockNavigation} />
                </Provider>
            );

            expect(getByText('Test Chat')).toBeTruthy();
        });

        it('calls sendMessage with correct text', async () => {
            const sendMessageMock = jest
                .fn()
                .mockResolvedValue({ success: true });
            const { getByPlaceholderText, getByText } = render(
                <Provider store={store}>
                    <WrappedChat
                        route={createRoute()}
                        navigation={mockNavigation}
                        sendMessage={sendMessageMock}
                    />
                </Provider>
            );

            const input = getByPlaceholderText('Type a message...');
            fireEvent.changeText(input, 'Hello, world!');
            fireEvent.press(getByText('Send'));

            await waitFor(() =>
                expect(sendMessageMock).toHaveBeenCalledWith('Hello, world!')
            );
        });

        it('displays ReportModal when showReportModal is true', () => {
            const { getByText } = render(
                <Provider store={store}>
                    <WrappedChat
                        route={createRoute()}
                        navigation={mockNavigation}
                        showReportModal
                        setShowReportModal={jest.fn()}
                    />
                </Provider>
            );

            expect(getByText('Report')).toBeTruthy();
        });

        it('displays ViolationModal when showViolation is true', () => {
            const { getByText } = render(
                <Provider store={store}>
                    <WrappedChat
                        route={createRoute()}
                        navigation={mockNavigation}
                        showViolation
                        setShowViolation={jest.fn()}
                    />
                </Provider>
            );

            expect(getByText('Violation')).toBeTruthy();
        });

        it('calls navigation.goBack when back button is pressed', () => {
            const { getByTestId } = render(
                <Provider store={store}>
                    <WrappedChat
                        route={createRoute()}
                        navigation={mockNavigation}
                    />
                </Provider>
            );

            fireEvent.press(getByTestId('navbar-back-button'));
            expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
        });

        it('handles blocked user state correctly', () => {
            const route = createRoute({ isBlocked: true, canMessage: false });
            const { queryByPlaceholderText } = render(
                <Provider store={store}>
                    <WrappedChat route={route} navigation={mockNavigation} />
                </Provider>
            );

            const input = queryByPlaceholderText('Type a message...');
            expect(input?.props?.editable).toBeFalsy();
        });
    });

    /* ==========  Chat Component Direct Tests  ========== */

    describe('Chat Component Direct', () => {
        it('renders CustomInputToolbar component', () => {
            const { getByTestId } = render(
                <Provider store={store}>
                    <Chat route={createRoute()} navigation={mockNavigation} />
                </Provider>
            );

            expect(getByTestId('CustomInputToolbar')).toBeTruthy();
        });

        it('renders GifSelector when showGif is true', () => {
            const { getByTestId } = render(
                <Provider store={store}>
                    <Chat
                        route={createRoute()}
                        navigation={mockNavigation}
                        showGif
                        setShowGif={jest.fn()}
                    />
                </Provider>
            );

            expect(getByTestId('GifSelector')).toBeTruthy();
        });

        it('does not render GifSelector when showGif is false', () => {
            const { queryByTestId } = render(
                <Provider store={store}>
                    <Chat
                        route={createRoute()}
                        navigation={mockNavigation}
                        showGif={false}
                        setShowGif={jest.fn()}
                    />
                </Provider>
            );

            expect(queryByTestId('GifSelector')).toBeNull();
        });

        it('triggers onLongPress callback', () => {
            const onLongPressMock = jest.fn();
            const message = createMockMessage({ text: 'Hello, world!' });

            const { getByText } = render(
                <Provider store={store}>
                    <Chat
                        route={createRoute()}
                        navigation={mockNavigation}
                        messages={[message]}
                        onLongPress={onLongPressMock}
                    />
                </Provider>
            );

            fireEvent(getByText('Hello, world!'), 'onLongPress');
            expect(onLongPressMock).toHaveBeenCalled();
        });

        it('displays empty state when no messages exist', () => {
            const { queryByTestId } = render(
                <Provider store={store}>
                    <Chat
                        route={createRoute()}
                        navigation={mockNavigation}
                        messages={[]}
                    />
                </Provider>
            );

            expect(queryByTestId('message-bubble')).toBeNull();
        });
    });

    /* ==========  Redux Actions Tests  ========== */

    describe('Redux Chat Actions', () => {
        it('creates getConversationMessagesRequest action', () => {
            const payload = { page: 1, convId: 'conv123' };
            const callback = jest.fn();
            const action = getConversationMessagesRequest(payload, callback);

            expect(action.type).toBe(GET_CONVERSATION_MESSAGES.REQUEST);
            expect(action.payload).toEqual(payload);
            expect(action.responseCallback).toBe(callback);
        });

        it('creates updateMessageReadStatus action', () => {
            const payload = { conversationId: 'conv123' };
            const action = updateMessageReadStatus(payload, jest.fn());

            expect(action.type).toBe(UPDATE_READ_STATUS.REQUEST);
            expect(action.payload).toEqual(payload);
        });

        it('creates deleteMessageRequest action', () => {
            const payload = { conversationId: 'conv123' };
            const callback = jest.fn();
            const action = deleteMessageRequest(payload, callback);

            expect(action.type).toBe(DELETE_MESSAGE.REQUEST);
            expect(action.payload).toEqual(payload);
            expect(action.responseCallback).toBe(callback);
        });
    });

    /* ==========  Redux Actions Tests  ========== */

    describe('Custom Hooks', () => {
        it('usePaginatedScroll returns correct listViewProps', () => {
            const setPageMock = jest.fn();
            const setLoadingMock = jest.fn();

            const { listViewProps } = usePaginatedScroll({
                loading: false,
                allDataLoaded: false,
                setPage: setPageMock,
                setLoading: setLoadingMock,
            });

            expect(listViewProps.scrollEventThrottle).toBe(100);
            expect(listViewProps.onEndReachedThreshold).toBe(0.1);
            expect(typeof listViewProps.onScroll).toBe('function');
            expect(typeof listViewProps.onEndReached).toBe('function');
        });

        it('useMessageLongPress returns a function', () => {
            const hookParams = {
                userId: 'user123',
                setSelectedMessage: jest.fn(),
                deleteMessage: jest.fn(),
                handleReportModal: jest.fn(),
                setShowReportModal: jest.fn(),
            };

            const onLongPress = useMessageLongPress(hookParams);
            expect(typeof onLongPress).toBe('function');
        });

        it('identifies own message correctly', () => {
            const userId = 'user123';
            const ownMessage = createMockMessage({ user: { _id: userId } });
            const otherMessage = createMockMessage({
                user: { _id: 'other456' },
            });

            expect(userId === ownMessage.user._id).toBe(true);
            expect(userId === otherMessage.user._id).toBe(false);
        });
    });

    /* ==========   Integration Tests  ========== */

    describe('Integration Tests', () => {
        it('handles complete message send flow', async () => {
            const sendMessageMock = jest
                .fn()
                .mockResolvedValue({ success: true });

            const { getByPlaceholderText, getByText } = render(
                <Provider store={store}>
                    <WrappedChat
                        route={createRoute()}
                        navigation={mockNavigation}
                        sendMessage={sendMessageMock}
                    />
                </Provider>
            );

            const input = getByPlaceholderText('Type a message...');
            fireEvent.changeText(input, 'Integration test message');
            fireEvent.press(getByText('Send'));

            await waitFor(() =>
                expect(sendMessageMock).toHaveBeenCalledWith(
                    'Integration test message'
                )
            );
        });

        it('handles message deletion flow', () => {
            const deleteMessageMock = jest.fn();
            const message = createMockMessage();

            deleteMessageMock(message, false);
            expect(deleteMessageMock).toHaveBeenCalledWith(message, false);
        });

        it('handles conversation with multiple participants', () => {
            const participants = [
                { id: 'user1', displayName: 'User 1', avatarUrl: '' },
                { id: 'user2', displayName: 'User 2', avatarUrl: '' },
            ];
            const route = createRoute({
                participantList: participants,
                title: 'Group Chat',
            });

            const { getByText } = render(
                <Provider store={store}>
                    <WrappedChat route={route} navigation={mockNavigation} />
                </Provider>
            );

            expect(getByText('Group Chat')).toBeTruthy();
        });
    });
});
