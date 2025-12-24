==============================================
========= 1. GENERAL INFO ====================

Date of Sending the Sample: 24-Dec-2025
Developer's Name: Mohammad Shahzad Rasheed
Current Designation: SSE
Sample Code Project Name: imPrintAI
Nature of Project: MobileApp (React Native Social Media App)
My Allocation in this Project: 100%

-- This README describes the chat module, including real-time messaging, message actions, and related components.

==============================================
======== 2. CODE INFO ========================

Languages: TypeScript, JavaScript
Platform: React Native

Followed Standard:

React Native best practices and modular folder structure

TypeScript for type safety and maintainability

Redux + Redux-Saga for state management

WebSocket standards for real-time chat messaging

ESLint & Prettier for consistent code style

- Jest for unit and integration tests

Reusable components and HOC patterns for chat logic

Purpose of Module:

Implement real-time chat messaging using WebSocket

Handle message pagination, GIFs, long-press actions (delete/report), and read-status updates

Integrate chat with Redux state management

Support private one-on-one chats and group chats

Provide UI components for chat functionality (bubble, toolbar, send button, GIF selector, timestamp)

==============================================
======== 3. OTHER FILES =======================

None

Code Contributed by Other Developers:

None (all code contributed by me for this module)

==============================================
======== 4. MY FILES ==========================
Program Entry Point For this Module:

File: AppEntry.tsx
Method: Main application entry with providers and root navigator setup

Files Intro:

chat/ChatScreen.tsx
Main chat screen component handling message display, input, and interactions

chat/styles.tsx
Styles for chat screen and components

chat/ChatScreen.test.tsx
Unit and integration tests for chat module following AAA pattern

components/CustomBubble/
Chat bubble component for message display

components/CustomInputToolBar/
Custom input toolbar for chat message input

components/CustomSend/
Send button component

components/CustomTime/
Timestamp display component

components/GifSelector/
GIF picker component

hooks/useChatWebSocket.ts
WebSocket connection management

hooks/useMessageLongPress.ts
Handles long-press actions on messages (delete/report)

hooks/usePaginatedScroll.ts
Implements infinite scroll for messages

hoc/withChatLogic.tsx
Higher-order component for chat functionality logic

redux/
Contains Redux actions, reducers, and sagas for chat and user modules

constants/
API endpoints, string literals, routes, and regex patterns

==============================================
======== 5. ADDITIONAL COMMENTS ================

Real-time chat uses WebSocket integrated with Redux for state management

Tests follow AAA (Arrange-Act-Assert) pattern for clarity

