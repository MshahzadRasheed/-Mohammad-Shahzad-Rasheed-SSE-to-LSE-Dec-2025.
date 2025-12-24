================================================================================
                            imPrintAI - Social Media Application
================================================================================

PROJECT OVERVIEW
--------------------------------------------------------------------------------
imPrintAI is a React Native social media application featuring real-time 
messaging, social timeline feeds, user authentication, and profile management.

TECH STACK
--------------------------------------------------------------------------------
- React Native (TypeScript)
- Redux + Redux Saga (State Management)
- WebSocket (Real-time Communication)
- React Navigation (Navigation Stack)
- GiftedChat (Chat UI)

================================================================================
                              PROJECT STRUCTURE
================================================================================

/
├── AppEntry.tsx           # Main app entry point with providers setup
├── RootNavigator.tsx      # Root navigation configuration
├── Chat/
│   ├── index.tsx          # Main Chat screen component
│   ├── styles.tsx         # Chat screen styles
│   └── chat.test.tsx      # Chat module test cases (AAA pattern)
├── components/
│   ├── CustomBubble/      # Custom chat bubble component
│   ├── CustomInputToolBar/# Custom input toolbar for chat
│   ├── CustomSend/        # Custom send button component
│   ├── CustomTime/        # Custom time display component
│   └── GifSelector/       # GIF picker component
├── config/
│   ├── environment.ts     # Environment configuration (dev/sigma/live)
│   └── Webservice.ts      # API service configuration
├── constants/
│   ├── APIConstants.ts    # API endpoint definitions
│   ├── StringConstants.ts # String literals and messages
│   ├── RouteConstants.ts  # Navigation route names
│   └── RegexConstants.ts  # Regex patterns for validation
├── hooks/
│   ├── useChatWebSocket.ts    # WebSocket connection management
│   ├── useMessageLongPress.ts # Message long-press actions
│   └── usePaginatedScroll.ts  # Infinite scroll pagination
├── hoc/
│   └── withChatLogic.tsx  # Higher-order component for chat logic
├── redux/
│   ├── ActionTypes.ts     # Redux action type constants
│   ├── ChatActions.ts     # Chat-related action creators
│   ├── chat.ts            # Chat reducer and sagas
│   └── user.ts            # User reducer
└── types.tsx              # TypeScript type definitions

================================================================================
                              SETUP INSTRUCTIONS
================================================================================

1. PREREQUISITES
   - Node.js (v16+)
   - React Native CLI
   - Xcode (iOS) / Android Studio (Android)
   - CocoaPods (iOS)

2. INSTALLATION
   $ npm install
   $ cd ios && pod install && cd ..

3. ENVIRONMENT SETUP
   Create .env file with:
   - API_BASE_URL=<backend_url>
   - WEBSOCKET_URL=<websocket_url>
   - ENVIRONMENT=development|sigma|live

4. RUN APPLICATION
   $ npx react-native run-ios     # iOS
   $ npx react-native run-android # Android

5. RUN TESTS
   $ npm test
   $ npm test -- --coverage

================================================================================
                              KEY FEATURES
================================================================================

1. AUTHENTICATION
   - Email/Password login
   - Google Sign-In
   - OTP verification
   - Password reset

2. CHAT MODULE
   - Real-time WebSocket messaging
   - GIF support
   - Message pagination
   - Long-press actions (delete/report)
   - Read status updates

3. TIMELINE
   - Global feed
   - Personal feed
   - User profile timeline
   - Post reactions

4. SOCIAL FEATURES
   - Follow/Unfollow users
   - Friend suggestions
   - User profiles
   - Notifications

================================================================================
                              API ENDPOINTS
================================================================================

Authentication:
  POST /api/v2/auth/login          - User login
  POST /api/v2/auth/signup         - User registration
  POST /api/v2/auth/otp            - Send OTP
  POST /api/v2/auth/otp/verify     - Verify OTP
  POST /api/v2/auth/google-login   - Google authentication

User:
  GET  /api/v2/user/info           - Get user information
  POST /api/v2/user/onboarding     - Complete profile setup
  GET  /api/v2/user/suggestion/list - Friend suggestions

Timeline:
  GET  api/v2/timeline/global-tribe/   - Global timeline
  GET  api/v2/timeline/personal-tribe/ - Personal timeline
  GET  api/v2/timeline/user-profile/   - User profile timeline

Chat:
  GET  /api/v2/chat/recent         - Recent chat list
  POST /api/v2/chat/group          - Create chat group
  GET  /api/v2/chat/messages       - Get conversation messages

================================================================================
                              TESTING STRATEGY
================================================================================

Tests follow the AAA (Arrange-Act-Assert) pattern:

  ARRANGE: Set up test data, mocks, and initial state
  ACT:     Execute the function/component being tested
  ASSERT:  Verify the expected outcomes

Example:
  describe('useMessageLongPress', () => {
    it('should handle own message deletion', () => {
      // Arrange
      const mockDeleteMessage = jest.fn();
      const message = { user: { _id: 'user123' } };
      
      // Act
      onLongPress(context, message);
      
      // Assert
      expect(mockDeleteMessage).toHaveBeenCalledWith(message, false);
    });
  });

================================================================================
                              ENVIRONMENTS
================================================================================

Development : https://dev.imprint.live/backend
Sigma       : https://sigma.imprint.live/backend  
Production  : https://api.imprint.live/backend

================================================================================
                              AUTHOR & LICENSE
================================================================================

Author: Mohammad Shahzad Rasheed
Date: December 2025
License: Proprietary

================================================================================

