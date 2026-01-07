
#  React Chat Application

[![React + Vite](https://img.shields.io/badge/React%20%2B%20Vite-Fast%20Build-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![IndexedDB](https://img.shields.io/badge/IndexedDB-LocalDB-orange)](https://javascript.info/indexeddb)
[![React Router](https://img.shields.io/badge/React_Router_DOM-6-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com)
[![Lucide](https://img.shields.io/badge/Lucide-React_Icons-f97583?logo=lucide&logoColor=white)](https://lucide.dev)
![npm](https://img.shields.io/badge/npm-v11.6.2-blue)

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

# Project Structure

```text
src/
│
├── components/
│   ├── AddUser.tsx
│   ├── Chat.tsx
│   ├── Conversation.tsx
|   ├── ConversationUser.tsx
|   ├── EditUserModel.tsx 
│   ├── Home.tsx
|   ├── LoadingSkeleton.tsx
│   ├── MessageInput.tsx
|   ├── Messages.tsx
|
├── contextAPI/
│   └── ChatContext.ts
│  
├── DB/
│   └── indexedDB.ts
│
├── Routes/
│   └── Router.ts
│
├── App.tsx
├── main.tsx
└── index.css
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
