import type { Message, User } from "../type/chat"

const DB_NAME = "chatDB"
const DB_VERSION = 2

const MESSAGE_STORE = "messages"
const USER_STORE = "users"

export const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        try {
            const request = indexedDB.open(DB_NAME, DB_VERSION)
            request.onupgradeneeded = () => {
                const db = request.result
                db.createObjectStore(MESSAGE_STORE, {
                    keyPath: "id",
                    autoIncrement: true
                })
                db.createObjectStore(USER_STORE, {
                    keyPath: "id",
                    autoIncrement: true
                })
            }
            request.onsuccess = () => resolve(request.result)
            request.onerror = () => reject(request.error)
        } catch (error) {
            console.error("IndexedDB open error", error)
            reject(error)
        }
    })
}

// Add Messages To IndexedDB
export const addMessageToDB = async (
    message: Omit<Message, "id">
): Promise<Message | null> => {
    try {
        const db = await openDB()
        const transaction = db.transaction(MESSAGE_STORE, "readwrite")
        const store = transaction.objectStore(MESSAGE_STORE)

        return new Promise((resolve, reject) => {
            const request = store.add(message)

            request.onsuccess = () => {
                resolve({ ...message, id: request.result as number });
            }
            request.onerror = () => reject(request.error)
        })
    } catch (error) {
        console.error("addMessageToDB error", error)
        return null
    }
}

// Display Messages From IndexedDB
export const getMessagesFromDB = async (): Promise<Message[]> => {
    try {
        const db = await openDB()
        const transaction = db.transaction(MESSAGE_STORE, "readonly")
        const store = transaction.objectStore(MESSAGE_STORE)

        return new Promise((resolve, reject) => {
            const request = store.getAll()
            request.onsuccess = () => resolve(request.result as Message[])
            request.onerror = () => reject(request.error)
        })
    } catch (error) {
        console.error("getMessagesFromDB error", error);
        return [];
    }
}

// Update Message 
export const updateMessageInDB = async (
    id: number,
    newText: string
): Promise<boolean> => {
    try {
        const db = await openDB()
        const transaction = db.transaction(MESSAGE_STORE, "readwrite")
        const store = transaction.objectStore(MESSAGE_STORE)
        return new Promise((resolve, reject) => {
            const request = store.get(id)
            request.onsuccess = () => {
                const message = request.result as Message | undefined
                if (!message) {
                    reject("Message not found")
                    return
                }
                message.text = newText
                message.edited = true
                store.put(message)
            }
            transaction.oncomplete = () => resolve(true)
            transaction.onerror = () => reject(false)
        })
    } catch (error) {
        console.error("updateMessageInDB error", error)
        return false
    }
}

//Delete Message
export const deleteMessageFromDB = async (
  messageId: number
): Promise<boolean> => {
  try {
    const db = await openDB()
    const transaction = db.transaction(MESSAGE_STORE, "readwrite")
    const store = transaction.objectStore(MESSAGE_STORE)

    return new Promise((resolve, reject) => {
      const request = store.delete(messageId)
      request.onsuccess = () => resolve(true)
      request.onerror = () => reject(false)
    })
  } catch (error) {
    console.error("deleteMessageFromDB error", error)
    return false
  }
}


// Add Users To IndexedDB
export const addUsersToDB = async (user: User): Promise<void> => {
    const db = await openDB()
    const transaction = db.transaction(USER_STORE, "readwrite")
    transaction.objectStore(USER_STORE).add(user)
}

// Display Users From IndexedDB
export const getUsersFromDB = async (): Promise<User[]> => {
    try {
        const db = await openDB()
        const transaction = db.transaction(USER_STORE, "readonly")
        const store = transaction.objectStore(USER_STORE)

        return new Promise((resolve, reject) => {
            const request = store.getAll()

            request.onsuccess = () => resolve(request.result as User[])
            request.onerror = () => reject(request.error)
        })
    } catch (error) {
        console.error("getUsersFromDB error", error)
        return []
    }
}

// Update UserProfile
export const updateUserProfile = async (
    id: number,
    data: Partial<User>
): Promise<User | null> => {
    try {
        const db = await openDB()
        const transaction = db.transaction(USER_STORE, "readwrite")
        const store = transaction.objectStore(USER_STORE);

        return new Promise((resolve, reject) => {
            const getRequest = store.get(id)
            getRequest.onsuccess = () => {
                const user = getRequest.result;
                if (!user) {
                    reject("User Not found")
                    return
                }
                const updatedUser = { ...user, ...data }
                const request = store.put(updatedUser)
                request.onsuccess = () => resolve(updatedUser)
                request.onerror = () => reject(request.error)
            }
        })
    } catch (error) {
        console.error("updateUserProfile error", error)
        return null
    }
}

export const getMessagesLastId = async (
    lastId: number
): Promise<Message[]> => {
    try {
        const db = await openDB()
        const store = db
            .transaction(MESSAGE_STORE, "readonly")
            .objectStore(MESSAGE_STORE)

        return new Promise((resolve, reject) => {
            const request = store.getAll()

            request.onsuccess = () => {
                const newMessages = (request.result as Message[]).filter(
                    (msg) => (msg.id ?? 0) > lastId
                )
                resolve(newMessages)
            }

            request.onerror = () => reject(request.error)
        })
    } catch (error) {
        console.error("getMessagesLastId error", error)
        return []
    }
}