import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { onAuthChange, signOut as firebaseSignOut } from '../services/authService';
import {
    getAllActivities,
    addActivity as firestoreAddActivity,
    updateActivity as firestoreUpdateActivity,
    deleteActivity as firestoreDeleteActivity,
    batchUpdateOrder
} from '../services/firestoreService';
import { ADMIN_UIDS, IDLE_TIMEOUT_MS } from '../constants/admin';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [activities, setActivities] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const idleTimerRef = useRef(null);

    const logout = useCallback(async () => {
        try {
            await firebaseSignOut();
            setIsAdmin(false);
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        }
    }, []);

    // Listen to Firebase auth state changes + enforce UID allowlist
    useEffect(() => {
        const unsubscribe = onAuthChange(async (currentUser) => {
            if (currentUser && !ADMIN_UIDS.includes(currentUser.uid)) {
                // Authenticated user is NOT in the admin allowlist — kick them out.
                console.warn('Non-admin user detected, signing out:', currentUser.uid);
                await firebaseSignOut().catch(() => {});
                setUser(null);
                setIsAdmin(false);
                setLoading(false);
                return;
            }

            setUser(currentUser);
            setIsAdmin(!!currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Idle timeout — auto-logout after IDLE_TIMEOUT_MS of no user activity
    useEffect(() => {
        if (!isAdmin) return undefined;

        const resetTimer = () => {
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            idleTimerRef.current = setTimeout(() => {
                console.info('Idle timeout reached, logging out');
                logout();
            }, IDLE_TIMEOUT_MS);
        };

        const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
        events.forEach((event) => window.addEventListener(event, resetTimer, { passive: true }));
        resetTimer();

        return () => {
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            events.forEach((event) => window.removeEventListener(event, resetTimer));
        };
    }, [isAdmin, logout]);

    // Load activities from Firestore
    useEffect(() => {
        const loadActivities = async () => {
            try {
                const data = await getAllActivities();
                setActivities(data);
            } catch (error) {
                console.error('Error loading activities:', error);
                // Fallback to localStorage if Firestore fails
                const saved = localStorage.getItem('activities');
                if (saved) {
                    setActivities(JSON.parse(saved));
                }
            }
        };

        loadActivities();
    }, []);

    const addActivity = async (activity) => {
        try {
            const newId = await firestoreAddActivity(activity);

            // Optimistically update UI
            const newActivity = {
                id: newId,
                ...activity,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            setActivities([newActivity, ...activities]);
            return newId;
        } catch (error) {
            console.error('Error adding activity:', error);
            throw error;
        }
    };

    const updateActivity = async (id, updatedActivity) => {
        try {
            await firestoreUpdateActivity(id, updatedActivity);

            // Optimistically update UI
            setActivities(activities.map(act =>
                act.id === id ? { ...act, ...updatedActivity, updatedAt: new Date().toISOString() } : act
            ));
        } catch (error) {
            console.error('Error updating activity:', error);
            throw error;
        }
    };

    const deleteActivity = async (id) => {
        try {
            await firestoreDeleteActivity(id);

            // Optimistically update UI
            setActivities(activities.filter(act => act.id !== id));
        } catch (error) {
            console.error('Error deleting activity:', error);
            throw error;
        }
    };

    const reorderActivities = async (reorderedActivities) => {
        try {
            // Optimistically update UI
            setActivities(reorderedActivities);

            // Prepare batch updates
            const updates = reorderedActivities.map((activity, index) => ({
                id: activity.id,
                order: index
            }));

            // Batch update Firestore
            await batchUpdateOrder(updates);
        } catch (error) {
            console.error('Error reordering activities:', error);
            // Reload activities on error to restore correct order
            const data = await getAllActivities();
            setActivities(data);
            throw error;
        }
    };

    return (
        <AdminContext.Provider value={{
            activities,
            isAdmin,
            setIsAdmin,
            user,
            loading,
            addActivity,
            updateActivity,
            deleteActivity,
            reorderActivities,
            logout
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => useContext(AdminContext);
