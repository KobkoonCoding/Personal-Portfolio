import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    query,
    orderBy,
    serverTimestamp,
    writeBatch
} from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'activities';

/**
 * Get all activities from Firestore
 * @returns {Promise<Array>} Array of activities
 */
export const getAllActivities = async () => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            orderBy('order', 'asc')
        );
        const querySnapshot = await getDocs(q);

        const activities = [];
        querySnapshot.forEach((doc) => {
            activities.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return activities;
    } catch (error) {
        console.error('Error getting activities:', error);
        throw error;
    }
};

/**
 * Add a new activity to Firestore
 * @param {Object} activityData - The activity data
 * @returns {Promise<string>} The new activity ID
 */
export const addActivity = async (activityData) => {
    try {
        // Get current activities to determine next order number
        const activities = await getAllActivities();
        const nextOrder = activities.length;

        // Add timeout to prevent infinite hang if Firestore rules block the write
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Firestore write timeout - check your security rules')), 10000);
        });

        const addPromise = addDoc(collection(db, COLLECTION_NAME), {
            ...activityData,
            order: nextOrder,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });

        const docRef = await Promise.race([addPromise, timeoutPromise]);
        return docRef.id;
    } catch (error) {
        console.error('Error adding activity:', error);
        if (error.message.includes('timeout')) {
            throw new Error('Failed to save activity. Please check Firestore security rules in Firebase Console.');
        }
        throw error;
    }
};

/**
 * Update an existing activity in Firestore
 * @param {string} activityId - The activity ID
 * @param {Object} activityData - The updated activity data
 * @returns {Promise<void>}
 */
export const updateActivity = async (activityId, activityData) => {
    try {
        const activityRef = doc(db, COLLECTION_NAME, activityId);
        await updateDoc(activityRef, {
            ...activityData,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating activity:', error);
        throw error;
    }
};

/**
 * Delete an activity from Firestore
 * @param {string} activityId - The activity ID
 * @returns {Promise<void>}
 */
export const deleteActivity = async (activityId) => {
    try {
        const activityRef = doc(db, COLLECTION_NAME, activityId);
        await deleteDoc(activityRef);
    } catch (error) {
        console.error('Error deleting activity:', error);
        throw error;
    }
};

/**
 * Batch update activity order
 * @param {Array<{id: string, order: number}>} updates - Array of activity updates
 * @returns {Promise<void>}
 */
export const batchUpdateOrder = async (updates) => {
    try {
        const batch = writeBatch(db);

        updates.forEach(({ id, order }) => {
            const activityRef = doc(db, COLLECTION_NAME, id);
            batch.update(activityRef, { order, updatedAt: serverTimestamp() });
        });

        await batch.commit();
    } catch (error) {
        console.error('Error batch updating order:', error);
        throw error;
    }
};
