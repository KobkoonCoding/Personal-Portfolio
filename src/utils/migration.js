import { addActivity } from '../services/firestoreService';

/**
 * Migrate activities from localStorage to Firebase Firestore
 * This is a one-time migration script
 */
export const migrateLocalStorageToFirebase = async () => {
    try {
        // Get activities from localStorage
        const localActivities = JSON.parse(localStorage.getItem('activities') || '[]');

        if (localActivities.length === 0) {
            console.log('No activities found in localStorage');
            return { success: true, count: 0 };
        }

        console.log(`Found ${localActivities.length} activities in localStorage`);

        // Migrate each activity
        const results = [];
        for (const activity of localActivities) {
            try {
                // Remove the old numeric ID (Firebase will generate new ones)
                const { id, ...activityData } = activity;

                // Add to Firestore
                const newId = await addActivity(activityData);
                results.push({ oldId: id, newId, success: true });
                console.log(`✅ Migrated activity: ${activity.title_en || activity.title}`);
            } catch (error) {
                console.error(`❌ Failed to migrate activity ${activity.id}:`, error);
                results.push({ oldId: activity.id, success: false, error: error.message });
            }
        }

        // Summary
        const successCount = results.filter(r => r.success).length;
        const failCount = results.filter(r => !r.success).length;

        console.log(`\n📊 Migration Summary:`);
        console.log(`✅ Success: ${successCount}`);
        console.log(`❌ Failed: ${failCount}`);

        return {
            success: failCount === 0,
            total: localActivities.length,
            successCount,
            failCount,
            results
        };
    } catch (error) {
        console.error('Migration error:', error);
        throw error;
    }
};

/**
 * Backup localStorage data to a downloadable JSON file
 */
export const backupLocalStorage = () => {
    try {
        const activities = localStorage.getItem('activities');
        const adminState = localStorage.getItem('adminState');

        const backup = {
            timestamp: new Date().toISOString(),
            activities: JSON.parse(activities || '[]'),
            adminState: JSON.parse(adminState || '{}')
        };

        // Create downloadable file
        const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        console.log('✅ Backup downloaded successfully');
        return true;
    } catch (error) {
        console.error('Backup error:', error);
        return false;
    }
};
