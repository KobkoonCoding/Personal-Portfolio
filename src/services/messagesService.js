import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    doc,
    deleteDoc,
    updateDoc,
    serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'messages';

/**
 * Save a new contact message to Firestore.
 * Callable by anonymous visitors — Firestore rules should allow public `create`
 * on this collection (see README / deploy notes).
 *
 * @param {{ name: string, email: string, message: string }} payload
 * @returns {Promise<string>} The new message document ID.
 */
export const saveMessage = async ({ name, email, message }) => {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        name: name?.trim() || '',
        email: email?.trim() || '',
        message: message?.trim() || '',
        read: false,
        createdAt: serverTimestamp()
    });
    return docRef.id;
};

/**
 * Fetch all contact messages ordered by newest first.
 * Admin-only in practice — Firestore rules should restrict `read` to authenticated admins.
 *
 * @returns {Promise<Array>} Array of message documents.
 */
export const getAllMessages = async () => {
    const q = query(
        collection(db, COLLECTION_NAME),
        orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/**
 * Mark a message as read.
 * @param {string} id
 */
export const markMessageRead = async (id) => {
    const ref = doc(db, COLLECTION_NAME, id);
    await updateDoc(ref, { read: true });
};

/**
 * Permanently delete a message.
 * @param {string} id
 */
export const deleteMessage = async (id) => {
    const ref = doc(db, COLLECTION_NAME, id);
    await deleteDoc(ref);
};
