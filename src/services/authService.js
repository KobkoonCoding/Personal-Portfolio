import {
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential
} from 'firebase/auth';
import { auth } from '../config/firebase';

/**
 * Sign in with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User object
 */
export const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error('Sign in error:', error);
        throw error;
    }
};

/**
 * Sign out current user
 * @returns {Promise<void>}
 */
export const signOut = async () => {
    try {
        await firebaseSignOut(auth);
    } catch (error) {
        console.error('Sign out error:', error);
        throw error;
    }
};

/**
 * Get current authenticated user
 * @returns {Object|null} Current user or null
 */
export const getCurrentUser = () => {
    return auth.currentUser;
};

/**
 * Listen to authentication state changes
 * @param {Function} callback - Callback function to handle auth state changes
 * @returns {Function} Unsubscribe function
 */
export const onAuthChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};

/**
 * Change user password (requires recent authentication)
 * @param {string} currentPassword - Current password for reauthentication
 * @param {string} newPassword - New password to set
 * @returns {Promise<void>}
 */
export const changePassword = async (currentPassword, newPassword) => {
    try {
        const user = auth.currentUser;
        if (!user || !user.email) {
            throw new Error('No authenticated user found');
        }

        // Reauthenticate user before changing password (Firebase security requirement)
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);

        // Update password
        await updatePassword(user, newPassword);
    } catch (error) {
        console.error('Password change error:', error);
        throw error;
    }
};
