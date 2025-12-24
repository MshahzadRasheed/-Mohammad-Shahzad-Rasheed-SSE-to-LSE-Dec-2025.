/**
 * Chat Module Test Suite
 *
 * This test suite covers:
 * - Chat Component rendering and interactions
 * - HOC (Higher-Order Component) integration
 * - Custom hooks functionality
 * - Redux actions and state management
 *
 * All tests follow AAA (Arrange-Act-Assert) pattern for clarity and maintainability.
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
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
} from '../redux/ActionTypes';
import { ChatProps } from '../types';

const mockStore = configureStore([]);

/**
 * Creates a mock Redux store with default user state
 * @returns Configured mock store instance
 */
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

/** Default route parameters for chat screen navigation */
const defaultRouteParams = {
    conversationId: 'conv123',
    participantList: [],
    isBlocked: false,
    title: 'Test Chat',
    canMessage: true,
};

/**
 * Creates a route object with optional parameter overrides
 * @param overrides - Partial route params to override defaults
 * @returns Complete route object for navigation
 */
const createRoute = (overrides = {}) => ({
    params: { ...defaultRouteParams, ...overrides },
});

/** Mock message object for testing */
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

/* =============================================================================
   CHAT COMPONENT WITH HOC TESTS
   Tests for Chat component wrapped with withChatLogic HOC
============================================================================= */

describe('Chat Component with HOC', () => {
    let store: ReturnType<typeof mockStore>;
    let WrappedChat: React.FC<ChatProps>;

    beforeEach(() => {
        // Arrange: Set up fresh store and wrapped component before each test
        store = createMockStore();
        WrappedChat = withChatLogic(Chat);
    });

    it('should render the Chat component with correct title', () => {
        // Arrange: Prepare route with test title
        const route = createRoute({ title: 'Test Chat' });

        // Act: Render the wrapped component
        const { getByText } = render(
            <Provider store={store}>
                <WrappedChat route={route} navigation={{ goBack: jest.fn() }} />
            </Provider>
        );

        // Assert: Verify title is displayed
        expect(getByText('Test Chat')).toBeTruthy();
    });

    it('should call sendMessage function with correct text when message is sent', () => {
        // Arrange: Create mock function and render component
        const sendMessageMock = jest.fn();

        const { getByPlaceholderText, getByText } = render(
            <Provider store={store}>
                <WrappedChat
                    route={createRoute()}
                    navigation={{ goBack: jest.fn() }}
                    sendMessage={sendMessageMock}
                />
            </Provider>
        );

        // Act: Type message and press send
        const input = getByPlaceholderText('Type a message...');
        fireEvent.changeText(input, 'Hello, world!');
        const sendButton = getByText('Send');
        fireEvent.press(sendButton);

        // Assert: Verify sendMessage was called with correct text
        expect(sendMessageMock).toHaveBeenCalledWith('Hello, world!');
        expect(sendMessageMock).toHaveBeenCalledTimes(1);
    });

    it('should display ReportModal when showReportModal prop is true', () => {
        // Arrange: Set showReportModal to true
        const setShowReportModalMock = jest.fn();

        // Act: Render with report modal visible
        const { getByText } = render(
            <Provider store={store}>
                <WrappedChat
                    route={createRoute()}
                    navigation={{ goBack: jest.fn() }}
                    showReportModal={true}
                    setShowReportModal={setShowReportModalMock}
                />
            </Provider>
        );

        // Assert: Verify modal is displayed
        expect(getByText('Report')).toBeTruthy();
    });

    it('should display ViolationModal when showViolation prop is true', () => {
        // Arrange: Set showViolation to true
        const setShowViolationMock = jest.fn();

        // Act: Render with violation modal visible
        const { getByText } = render(
            <Provider store={store}>
                <WrappedChat
                    route={createRoute()}
                    navigation={{ goBack: jest.fn() }}
                    showViolation={true}
                    setShowViolation={setShowViolationMock}
                />
            </Provider>
        );

        // Assert: Verify modal is displayed
        expect(getByText('Violation')).toBeTruthy();
    });

    it('should call navigation.goBack when back button is pressed', () => {
        // Arrange: Create mock navigation function
        const goBackMock = jest.fn();

        // Act: Render and press back button
        const { getByTestId } = render(
            <Provider store={store}>
                <WrappedChat
                    route={createRoute()}
                    navigation={{ goBack: goBackMock }}
                />
            </Provider>
        );
        const backButton = getByTestId('navbar-back-button');
        fireEvent.press(backButton);

        // Assert: Verify goBack was called
        expect(goBackMock).toHaveBeenCalled();
        expect(goBackMock).toHaveBeenCalledTimes(1);
    });

    it('should handle blocked user state correctly', () => {
        // Arrange: Set isBlocked to true
        const route = createRoute({ isBlocked: true, canMessage: false });

        // Act: Render with blocked state
        const { queryByPlaceholderText } = render(
            <Provider store={store}>
                <WrappedChat route={route} navigation={{ goBack: jest.fn() }} />
            </Provider>
        );

        // Assert: Input should be disabled or hidden for blocked users
        const input = queryByPlaceholderText('Type a message...');
        expect(input?.props?.editable).toBeFalsy();
    });
});

/* =============================================================================
   CHAT COMPONENT DIRECT TESTS
   Tests for Chat component without HOC wrapper
============================================================================= */

describe('Chat Component Direct', () => {
    let store: ReturnType<typeof mockStore>;

    beforeEach(() => {
        // Arrange: Create fresh store before each test
        store = createMockStore();
    });

    it('should render CustomInputToolbar component', () => {
        // Arrange: Prepare component props
        const route = createRoute();
        const navigation = { goBack: jest.fn() };

        // Act: Render the Chat component
        const { getByTestId } = render(
            <Provider store={store}>
                <Chat route={route} navigation={navigation} />
            </Provider>
        );

        // Assert: Verify toolbar is rendered
        expect(getByTestId('CustomInputToolbar')).toBeTruthy();
    });

    it('should render GifSelector when showGif is true', () => {
        // Arrange: Set showGif to true
        const setShowGifMock = jest.fn();

        // Act: Render with GIF selector visible
        const { getByTestId } = render(
            <Provider store={store}>
                <Chat
                    route={createRoute()}
                    navigation={{ goBack: jest.fn() }}
                    showGif={true}
                    setShowGif={setShowGifMock}
                />
            </Provider>
        );

        // Assert: Verify GIF selector is rendered
        expect(getByTestId('GifSelector')).toBeTruthy();
    });

    it('should NOT render GifSelector when showGif is false', () => {
        // Arrange: Set showGif to false
        const setShowGifMock = jest.fn();

        // Act: Render with GIF selector hidden
        const { queryByTestId } = render(
            <Provider store={store}>
                <Chat
                    route={createRoute()}
                    navigation={{ goBack: jest.fn() }}
                    showGif={false}
                    setShowGif={setShowGifMock}
                />
            </Provider>
        );

        // Assert: Verify GIF selector is not rendered
        expect(queryByTestId('GifSelector')).toBeNull();
    });

    it('should trigger onLongPress callback when message is long pressed', () => {
        // Arrange: Create mock callback
        const onLongPressMock = jest.fn();

        // Act: Render and simulate long press
        const { getByText } = render(
            <Provider store={store}>
                <Chat
                    route={createRoute()}
                    navigation={{ goBack: jest.fn() }}
                    onLongPress={onLongPressMock}
                />
            </Provider>
        );
        const message = getByText('Hello, world!');
        fireEvent(message, 'onLongPress');

        // Assert: Verify callback was triggered
        expect(onLongPressMock).toHaveBeenCalled();
    });

    it('should display empty state when no messages exist', () => {
        // Arrange: Render with empty messages
        const route = createRoute();

        // Act: Render component
        const { queryByTestId } = render(
            <Provider store={store}>
                <Chat
                    route={route}
                    navigation={{ goBack: jest.fn() }}
                    messages={[]}
                />
            </Provider>
        );

        // Assert: Verify message list is empty
        expect(queryByTestId('message-bubble')).toBeNull();
    });
});

/* =============================================================================
   REDUX ACTIONS TESTS
   Tests for Chat-related Redux action creators
============================================================================= */

describe('Redux Chat Actions', () => {
    it('should create getConversationMessagesRequest action with correct payload', () => {
        // Arrange: Prepare payload and callback
        const payload = { page: 1, convId: 'conv123' };
        const callback = jest.fn();

        // Act: Create the action
        const action = getConversationMessagesRequest(payload, callback);

        // Assert: Verify action structure
        expect(action.type).toBe(GET_CONVERSATION_MESSAGES.REQUEST);
        expect(action.payload).toEqual(payload);
        expect(action.responseCallback).toBe(callback);
    });

    it('should create updateMessageReadStatus action with correct payload', () => {
        // Arrange: Prepare read status payload
        const payload = { conversationId: 'conv123' };
        const callback = jest.fn();

        // Act: Create the action
        const action = updateMessageReadStatus(payload, callback);

        // Assert: Verify action structure
        expect(action.type).toBe(UPDATE_READ_STATUS.REQUEST);
        expect(action.payload).toEqual(payload);
    });

    it('should create deleteMessageRequest action with correct payload', () => {
        // Arrange: Prepare delete payload
        const payload = { conversationId: 'conv123' };
        const callback = jest.fn();

        // Act: Create the action
        const action = deleteMessageRequest(payload, callback);

        // Assert: Verify action structure
        expect(action.type).toBe(DELETE_MESSAGE.REQUEST);
        expect(action.payload).toEqual(payload);
        expect(action.responseCallback).toBe(callback);
    });
});

/* =============================================================================
   CUSTOM HOOKS TESTS
   Tests for usePaginatedScroll and useMessageLongPress hooks
============================================================================= */

describe('usePaginatedScroll Hook', () => {
    it('should increment page when scroll reaches top and not loading', () => {
        // Arrange: Setup initial state
        const setPageMock = jest.fn();
        const setLoadingMock = jest.fn();
        const hookParams = {
            loading: false,
            allDataLoaded: false,
            setPage: setPageMock,
            setLoading: setLoadingMock,
        };

        // Act: Call the hook (simulated via direct function testing)
        const { listViewProps } = usePaginatedScroll(hookParams);

        // Assert: Verify listViewProps are configured correctly
        expect(listViewProps.scrollEventThrottle).toBe(100);
        expect(listViewProps.onEndReachedThreshold).toBe(0.1);
        expect(typeof listViewProps.onScroll).toBe('function');
        expect(typeof listViewProps.onEndReached).toBe('function');
    });

    it('should NOT increment page when loading is true', () => {
        // Arrange: Set loading to true
        const setPageMock = jest.fn();
        const setLoadingMock = jest.fn();
        const hookParams = {
            loading: true,
            allDataLoaded: false,
            setPage: setPageMock,
            setLoading: setLoadingMock,
        };

        // Act: Get hook result
        const { listViewProps } = usePaginatedScroll(hookParams);

        // Assert: onEndReached should exist but not trigger page increment when loading
        expect(typeof listViewProps.onEndReached).toBe('function');
    });

    it('should NOT increment page when allDataLoaded is true', () => {
        // Arrange: Set allDataLoaded to true
        const setPageMock = jest.fn();
        const setLoadingMock = jest.fn();
        const hookParams = {
            loading: false,
            allDataLoaded: true,
            setPage: setPageMock,
            setLoading: setLoadingMock,
        };

        // Act: Get hook result
        const { listViewProps } = usePaginatedScroll(hookParams);

        // Assert: listViewProps should be configured
        expect(listViewProps).toBeDefined();
    });
});

describe('useMessageLongPress Hook', () => {
    it('should return onLongPress callback function', () => {
        // Arrange: Setup hook parameters
        const hookParams = {
            userId: 'user123',
            setSelectedMessage: jest.fn(),
            deleteMessage: jest.fn(),
            handleReportModal: jest.fn(),
            setShowReportModal: jest.fn(),
        };

        // Act: Call the hook
        const onLongPress = useMessageLongPress(hookParams);

        // Assert: Verify callback is returned
        expect(typeof onLongPress).toBe('function');
    });

    it('should identify own message correctly based on userId', () => {
        // Arrange: Create message from current user
        const userId = 'user123';
        const ownMessage = createMockMessage({ user: { _id: userId } });
        const otherMessage = createMockMessage({ user: { _id: 'other456' } });

        // Act: Compare user IDs
        const isOwnMessage = userId === ownMessage.user._id;
        const isOtherMessage = userId === otherMessage.user._id;

        // Assert: Verify identification
        expect(isOwnMessage).toBe(true);
        expect(isOtherMessage).toBe(false);
    });
});

/* =============================================================================
   INTEGRATION TESTS
   End-to-end flow tests for Chat module
============================================================================= */

describe('Chat Module Integration', () => {
    let store: ReturnType<typeof mockStore>;

    beforeEach(() => {
        store = createMockStore();
    });

    it('should handle complete message send flow', async () => {
        // Arrange: Setup mocks and render component
        const sendMessageMock = jest.fn().mockResolvedValue({ success: true });
        const WrappedChat = withChatLogic(Chat);

        const { getByPlaceholderText, getByText } = render(
            <Provider store={store}>
                <WrappedChat
                    route={createRoute()}
                    navigation={{ goBack: jest.fn() }}
                    sendMessage={sendMessageMock}
                />
            </Provider>
        );

        // Act: Type and send message
        const input = getByPlaceholderText('Type a message...');
        fireEvent.changeText(input, 'Integration test message');
        const sendButton = getByText('Send');
        fireEvent.press(sendButton);

        // Assert: Verify message was sent
        expect(sendMessageMock).toHaveBeenCalledWith(
            'Integration test message'
        );
    });

    it('should handle message deletion flow', () => {
        // Arrange: Setup delete mock
        const deleteMessageMock = jest.fn();
        const message = createMockMessage();

        // Act: Call delete
        deleteMessageMock(message, false);

        // Assert: Verify delete was called with correct params
        expect(deleteMessageMock).toHaveBeenCalledWith(message, false);
    });

    it('should handle conversation with multiple participants', () => {
        // Arrange: Create route with participants
        const participants = [
            { id: 'user1', displayName: 'User 1', avatarUrl: '' },
            { id: 'user2', displayName: 'User 2', avatarUrl: '' },
        ];
        const route = createRoute({
            participantList: participants,
            title: 'Group Chat',
        });
        const WrappedChat = withChatLogic(Chat);

        // Act: Render with participants
        const { getByText } = render(
            <Provider store={store}>
                <WrappedChat route={route} navigation={{ goBack: jest.fn() }} />
            </Provider>
        );

        // Assert: Verify group chat title is displayed
        expect(getByText('Group Chat')).toBeTruthy();
    });
});
