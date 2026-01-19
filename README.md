
#  React Chat Application

[![React + Vite](https://img.shields.io/badge/React%20%2B%20Vite-Fast%20Build-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![IndexedDB](https://img.shields.io/badge/IndexedDB-LocalDB-orange)](https://javascript.info/indexeddb)
[![React Router](https://img.shields.io/badge/React_Router_DOM-6-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com)
[![Lucide](https://img.shields.io/badge/Lucide-React_Icons-f97583?logo=lucide&logoColor=white)](https://lucide.dev)
![npm](https://img.shields.io/badge/npm-v11.6.2-blue)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/docs/)
[![GraphQL](https://img.shields.io/badge/GraphQL-API-E10098?logo=graphql&logoColor=white)](https://graphql.org/learn/)

# Description

A modern React Chat Application built using React.js, Context API, IndexedDB, React Router DOM, and Tailwind CSS.
This project focuses on real-world React concepts like state management, routing, reusable components, offline storage, and performance optimization.

# Features
🔐 User-based chat conversations

🧠 State management using Context API 

🗂️ Persistent data storage using IndexedDB

✏️ Edit & delete messages

👤 Edit user profile (name & avatar)

🧭 Dynamic & nested routing

# Tech Stack

| Technology        | Description                         |
|------------------|-------------------------------------|
| React.js         | Frontend UI library                 |
| Vite             | Fast development & build tool       |
| React Router DOM | Routing & navigation                |
| Context API      | Global state management             |
| IndexedDB        | Offline local database              |
| Tailwind CSS     | Utility-first styling               |
| Lucide React     | Icon library                        |
| Node.js          | JavaScript runtime for backend      |
| MongoDB          | NoSQL database for user data        |
| dotenv           | Environment variable management     |
| Graph QL         | The query language for modern APIs  |


# Project Structure
``` text
project-root/
│
├── backend/
│   ├── node_modules/
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts                # MongoDB connection setup
│   │   │
│   │   ├── controllers/
│   │   │   └── user.controller.ts   # User create, fetch, update, delete logic
│   │   │
│   │   ├── models/
│   │   │   └── user.model.ts        # Mongoose user schema
│   │   │
│   │   ├── graphql/                 
│   │   │   ├── index.ts             # start the graph ql server
│   │   │   ├── resolvers.ts         # functions that actually run when a query/mutation is called.
│   │   │   ├── typeDefs.ts          # This defines the shape of your API.
│   │   │
│   │   ├── routes/
│   │   │   └── user.routes.ts       # User API routes
│   │   │
│   │   ├── index.ts                 # App entry 
│   │   └── server.ts                # Server startup & port config
│   │
│   ├── .env                         # Environment variables
│   ├── nodemon.json                 # Nodemon config
│   ├── package.json                 # Backend dependencies
│   ├── package-lock.json
│   └── tsconfig.json                # TypeScript config
│
├── src/                             # Frontend (React + Vite)
│   │
│   ├── components/
│   │   ├── AddUser.tsx
│   │   ├── Chat.tsx
│   │   ├── Conversation.tsx
│   │   ├── ConversationUser.tsx
│   │   ├── EditUserModel.tsx
│   │   ├── Home.tsx
│   │   ├── MessageInput.tsx
│   │   ├── Messages.tsx
│   │   └── Settings.tsx
│   │
│   ├── contextAPI/
│   │   ├── ChatContext.tsx
│   │   └── ThemeContext.tsx
│   │
│   ├── DB/
│   │   └── indexedDB.ts             # IndexedDB logic for messages
│   │
│   │── contextAPI/
│   │   ├── client.ts                # GraphQL client configuration file
│   │   ├── queries.ts               # Describes which type of data is needed
│   │
│   ├── Routes/
│   │   └── Router.tsx
│   │
│   ├── redux/
│   │   ├── slices/
│   │   │   └── chatSlice.ts
│   │   └── store/
│   │       └── store.ts
│   │
│   ├── type/
│   │   └── chat.ts                  # TypeScript types
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── vite.config.ts
├── package.json
└── README.md
```

# IndexedDB Usage
**IndexedDB is used to:**

- Store messages locally
- Store users & chat history
- Enable offline access
- Persist data after page reload

**Functions include:**

- addMessageToDB
- updateMessageInDB
- deleteMessageFromDB
- updateUserProfile

# Getting Started

**Navigate to project**

```text 
cd .\ChatApp\
```

**Install dependencies**

```text 
npm install
```

**Start development server**

```text 
npm run dev
```

# Future Enhancements 
- Message notifications
- Unread Message Count
- File & Image Messages
