# GhostTalk - Anonymous Chat Application

GhostTalk is a simple anonymous chat application where users can join anonymously and chat with each other. 
Users can see who is online, chat with multiple users at the same time, and view their chat history.

## Features

- Anonymous chat: Users can join the chat room with an anonymous username.
- Real-time messaging: Messages are delivered instantly to all connected users.
- Typing indicator: Shows when a user is typing a message.
- Online users list: Displays the count of connected users and their usernames.
- Chat history: Displays the last 50 messages sent in the chat room.

## Technologies Used

- Express.js: Backend framework for handling HTTP requests.
- Socket.IO: Library for real-time, bidirectional, and event-based communication.
- MongoDB: Database for storing user information and chat messages.
- Mongoose: MongoDB object modeling for Node.js.
- Bootstrap: Frontend framework for designing responsive and mobile-first websites.

## Screenshots

1. User's Interface
   ![initialUserPage](https://github.com/VishnuAjk/Ghost-Talk/assets/145429961/29114645-52ba-4c89-8a40-c6d29d86d638)

2. Two User's Connected
   ![twoUsersJoined](https://github.com/VishnuAjk/Ghost-Talk/assets/145429961/4a43430b-0f38-44fc-988e-6a05d0abd08c)

3. Chat View
   ![chatBtwnUsers](https://github.com/VishnuAjk/Ghost-Talk/assets/145429961/271a21f9-4786-46a4-9145-12da2827ea12)

4. persistent storage of Chats
   ![prevMessgesload](https://github.com/VishnuAjk/Ghost-Talk/assets/145429961/75a3bedf-8f25-416c-8d71-101ef39313bc)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/VishnuAjk/Ghost-Talk.git
   ```

### Install dependencies:

`cd GhostTalk`
`npm install`

### Start the server:

`npm start`

## Usage

- Enter your name to join the chat room.
- Start typing your message in the input field and press Enter to send.
- See who is online in the sidebar.
- Enjoy chatting anonymously!
