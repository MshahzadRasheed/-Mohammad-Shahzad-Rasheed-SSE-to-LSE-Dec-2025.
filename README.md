# 📚 Chat Module - Code Review Documentation

This document provides a complete overview of the **Chat Module** for code reviewers, ensuring better understanding of the structure and purpose of each file and folder.

---

## 📂 Project Structure Overview

### 1. `Chat/index.tsx`

- The **main screen** of the Chat feature.
- Handles core chat functionalities such as sending/receiving messages, rendering the chat UI, and handling user interactions.
- Integrates WebSocket, Redux states, custom hooks, and renders all major components.
- A **Higher-Order Component** wrapping the chat screen logic.
- Helps in separating concerns by injecting state and logic into the main chat UI.

### 3. `Chat/styles.tsx`

- Contains **shared styling** for the Chat screen .

---

## 🧩 Components

Located in the `components/` folder. These are modular UI components:

- `CustomBubble`: Renders individual message bubbles (text, media, etc.).
- `CustomInputToolBar`: Customizes the text input toolbar for message entry.
- `CustomSend`: Replaces the default "Send" button with a stylized one.
- `CustomTime`: Displays the message time.
- `GifSelector`: UI for selecting and sending GIFs in chat.

---

## 🛠️ Constants (`constants/` folder)

- `APIConstants.ts`: Defines the API routes used for chat-related requests.
- `StringConstants.ts`: Contains all hard-coded strings to keep them centralized and reusable.
- `RouteConstants.ts`: Holds navigation route names for consistency.
- `AssetSVGConstants.ts`: Maps static SVG assets.
- `RegexConstants.ts`: Regular expressions used across the module.

---

## ⚙️ Configuration

### `config/` *(currently empty)*

- Reserved for adding configuration files, e.g., WebSocket URLs, feature flags, or remote configs.

---

## 🔄 Redux Integration (`redux/` folder)

### `ActionTypes.ts`

- Central file for all Redux action type constants used across the chat and user modules.

### `ChatActions.ts`

- Contains all chat-specific Redux actions.
- Manages sending/receiving messages, updating message lists, handling reports, etc.

### `chat.ts`

- Contains Redux Saga functions for handling asynchronous side effects related to chat.
- Manages tasks like fetching recent chat lists, sending messages, and handling API interactions using generator functions (e.g., recentChatList,createChat).
- Implements patterns like while (true) and take to continuously listen for specific actions and respond accordingly

### `user.ts`

- Reducer managing **user state** including user information and authentication token.

---

## 🧠 Custom Hooks (`hooks/` folder)

### `useChatWebSocket.ts`

- Manages the **WebSocket connection** lifecycle.
- Sends and receives real-time messages.
- Implements reconnection logic if the socket drops.

### `useMessageLongPress.ts`

- Hook for handling **long-press interactions** on messages (e.g., delete, report, bookmark).

### `usePaginatedScroll.ts`

- Implements **infinite scroll** for chat history.
- Triggers data fetch when user scrolls to the top.

---

## 📡 Message Injection

### `withMessages.tsx`

- Higher-order wrapper/component that injects the message stream.
- Can be used to abstract logic from the chat UI.

---

## 🧾 Types

### `types.tsx`

- Shared TypeScript types used across the Chat module.
- Includes definitions for messages, user, actions, socket payloads, and more.

---

## 🔧 Utilities

### `util.tsx`

- Contains shared utility functions for the Chat module.
- Examples: text formatting, time manipulation, condition helpers, etc.

---

## 🌐 Navigation

### `RootNavigator.tsx`

- Root-level navigation setup that includes the chat screen.
- Manages navigation stack and modal transitions.

### `AppEntry.tsx`

- Main entry point of the app (or submodule).
- Renders providers (e.g., Redux, Navigation) and hooks initialization.

---

## ✅ Summary

This structure ensures the **Chat Module** is:

- ⚙️ Modular and scalable  
- 💡 Easy to maintain  
- 🚀 Optimized for real-time messaging  
- 📐 Consistent in design and development practices

---

## ✨ Features & Enhancements

- **Real-time Messaging**: WebSocket-powered, with reconnection support.
- **GIF Support**: Users can search and send GIFs in chat.
- **Message Pagination**: Infinite scroll for message history.
- **Long-Press Options**: Delete, report, bookmark messages via long-press.
- **Fully Typed**: Strong TypeScript usage throughout the module.

---
