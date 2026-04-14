// Admin UID allowlist
// Only Firebase users whose UID is in this list can access /admin.
// Even if someone else creates an account in this Firebase project,
// they will be auto-logged-out by AdminContext.
export const ADMIN_UIDS = ['OfD8zp1L7kagUyBs1szseztiAdK2'];

// Idle timeout: auto-logout after this many milliseconds of inactivity.
// 30 minutes — short enough to be safe if you forget to close the tab,
// long enough to not interrupt active work.
export const IDLE_TIMEOUT_MS = 30 * 60 * 1000;
