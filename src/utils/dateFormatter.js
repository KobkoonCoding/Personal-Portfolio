// Date formatting utility for Thai and English localization
export const formatDate = (dateString, language = 'en') => {
    if (!dateString) return '';

    const date = new Date(dateString);

    if (language === 'th') {
        const thaiMonths = [
            'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน',
            'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม',
            'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
        ];
        const month = thaiMonths[date.getMonth()];
        const year = date.getFullYear() + 543; // Convert to Buddhist Era
        return `${month} ${year}`;
    } else {
        const enMonths = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ];
        const month = enMonths[date.getMonth()];
        const year = date.getFullYear();
        return `${month} ${year}`;
    }
};

// Format full date with day
export const formatFullDate = (dateString, language = 'en') => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const day = date.getDate();

    if (language === 'th') {
        const thaiMonths = [
            'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน',
            'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม',
            'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
        ];
        const month = thaiMonths[date.getMonth()];
        const year = date.getFullYear() + 543;
        return `${day} ${month} ${year}`;
    } else {
        const enMonths = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ];
        const month = enMonths[date.getMonth()];
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }
};

// Format date range for multi-day events
export const formatDateRange = (startDate, endDate, language = 'en') => {
    if (!startDate) return '';

    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;

    if (language === 'th') {
        const thaiMonths = [
            'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน',
            'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม',
            'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
        ];

        if (!end || startDate === endDate) {
            // Single day
            const day = start.getDate();
            const month = thaiMonths[start.getMonth()];
            const year = start.getFullYear() + 543;
            return `${day} ${month} ${year}`;
        } else if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
            // Same month and year
            const startDay = start.getDate();
            const endDay = end.getDate();
            const month = thaiMonths[start.getMonth()];
            const year = start.getFullYear() + 543;
            return `${startDay}-${endDay} ${month} ${year}`;
        } else if (start.getFullYear() === end.getFullYear()) {
            // Same year, different months
            const startDay = start.getDate();
            const startMonth = thaiMonths[start.getMonth()];
            const endDay = end.getDate();
            const endMonth = thaiMonths[end.getMonth()];
            const year = start.getFullYear() + 543;
            return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`;
        } else {
            // Different years
            const startDay = start.getDate();
            const startMonth = thaiMonths[start.getMonth()];
            const startYear = start.getFullYear() + 543;
            const endDay = end.getDate();
            const endMonth = thaiMonths[end.getMonth()];
            const endYear = end.getFullYear() + 543;
            return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`;
        }
    } else {
        // English format
        const enMonths = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ];

        if (!end || startDate === endDate) {
            // Single day
            const day = start.getDate();
            const month = enMonths[start.getMonth()];
            const year = start.getFullYear();
            return `${month} ${day}, ${year}`;
        } else if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
            // Same month and year
            const startDay = start.getDate();
            const endDay = end.getDate();
            const month = enMonths[start.getMonth()];
            const year = start.getFullYear();
            return `${month} ${startDay}-${endDay}, ${year}`;
        } else if (start.getFullYear() === end.getFullYear()) {
            // Same year, different months
            const startDay = start.getDate();
            const startMonth = enMonths[start.getMonth()];
            const endDay = end.getDate();
            const endMonth = enMonths[end.getMonth()];
            const year = start.getFullYear();
            return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
        } else {
            // Different years
            const startDay = start.getDate();
            const startMonth = enMonths[start.getMonth()];
            const startYear = start.getFullYear();
            const endDay = end.getDate();
            const endMonth = enMonths[end.getMonth()];
            const endYear = end.getFullYear();
            return `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${endDay}, ${endYear}`;
        }
    }
};
