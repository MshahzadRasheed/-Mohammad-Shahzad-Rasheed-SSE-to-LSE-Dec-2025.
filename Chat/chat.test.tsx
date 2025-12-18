import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Chat from '../Chat';
import withChatLogic from '../hoc/withChatLogic';

const mockStore = configureStore([]);

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

const defaultRouteParams = {
    conversationId: 'conv123',
    participantList: [],
    isBlocked: false,
    title: 'Test Chat',
    canMessage: true,
};

const createRoute = (overrides = {}) => ({
    params: { ...defaultRouteParams, ...overrides },
});

describe('Chat Component with HOC', () => {
    let store: ReturnType<typeof mockStore>;
    let WrappedChat: React.FC<any>;

    beforeEach(() => {
        store = createMockStore();
        WrappedChat = withChatLogic(Chat);
    });

    it('renders the Chat component correctly', () => {
        const { getByText } = render(
            <Provider store={store}>
                <WrappedChat
                    route={createRoute()}
                    navigation={{ goBack: jest.fn() }}
                />
            </Provider>
        );

        expect(getByText('Test Chat')).toBeTruthy();
    });

    it('calls the sendMessage function when a message is sent', () => {
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

        const input = getByPlaceholderText('Type a message...');
        fireEvent.changeText(input, 'Hello, world!');

        const sendButton = getByText('Send');
        fireEvent.press(sendButton);

        expect(sendMessageMock).toHaveBeenCalledWith('Hello, world!');
    });

    it('displays the ReportModal when showReportModal is true', () => {
        const { getByText } = render(
            <Provider store={store}>
                <WrappedChat
                    route={createRoute()}
                    navigation={{ goBack: jest.fn() }}
                    showReportModal={true}
                    setShowReportModal={jest.fn()}
                />
            </Provider>
        );

        expect(getByText('Report')).toBeTruthy();
    });

    it('displays the ViolationModal when showViolation is true', () => {
        const { getByText } = render(
            <Provider store={store}>
                <WrappedChat
                    route={createRoute()}
                    navigation={{ goBack: jest.fn() }}
                    showViolation={true}
                    setShowViolation={jest.fn()}
                />
            </Provider>
        );

        expect(getByText('Violation')).toBeTruthy();
    });

    it('navigates back when the back button is pressed', () => {
        const goBackMock = jest.fn();

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

        expect(goBackMock).toHaveBeenCalled();
    });
});

describe('Chat Component Direct', () => {
    let store: ReturnType<typeof mockStore>;

    beforeEach(() => {
        store = createMockStore();
    });

    it('renders the CustomInputToolbar correctly', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Chat
                    route={createRoute()}
                    navigation={{ goBack: jest.fn() }}
                />
            </Provider>
        );

        expect(getByTestId('custom-input-toolbar')).toBeTruthy();
    });

    it('renders the GifSelector when showGif is true', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Chat
                    route={createRoute()}
                    navigation={{ goBack: jest.fn() }}
                    showGif={true}
                    setShowGif={jest.fn()}
                />
            </Provider>
        );

        expect(getByTestId('gif-selector')).toBeTruthy();
    });

    it('does not render the GifSelector when showGif is false', () => {
        const { queryByTestId } = render(
            <Provider store={store}>
                <Chat
                    route={createRoute()}
                    navigation={{ goBack: jest.fn() }}
                    showGif={false}
                    setShowGif={jest.fn()}
                />
            </Provider>
        );

        expect(queryByTestId('gif-selector')).toBeNull();
    });

    it('handles long press on a message', () => {
        const onLongPressMock = jest.fn();

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

        expect(onLongPressMock).toHaveBeenCalled();
    });
});
