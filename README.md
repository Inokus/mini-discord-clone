# mini-discord-clone

Mini Discord Clone is chatting application mimicking the functionality of Discord.

## Features

- **Username Prompt**: Users are greeted with a screen that prompts them to enter their username.
- **Avatar**: When new user enters they're assigned color of the avatar at random.
- **Channel List**: Users are presented with a predefined list of text channels.
- **Real-Time Chat**: Users can see and switch between available channels. Each channel has its own chat that updates in real-time.
- **User List**: A sidebar shows the list of connected users, divided into:
  - **Online Users**: Displayed with a green bubble next to their avatar.
  - **Offline Users**: Grayed out when disconnected.
- **Leave Button**: Users can leave the chat, which takes them back to the username input screen. Upon leaving, their status is updated, and they are removed from the online/offline list for others.
- **Message Overflow Handling**: The chat area scrolls automatically as new messages come in when the message count exceeds the visible area.

## Getting Started

To set up the project locally, follow these steps:

1. Clone the repository: `git clone <repository-url>` and `cd mini-discord-clone`
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Run the application in preview mode: `npm run preview`
5. Start the server: `npm run server`
