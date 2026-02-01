/**
 * Cloudinary Configuration
 * Used for uploading images and videos to Cloudinary
 */

export const cloudinaryConfig = {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    apiUrl: `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`
};

/**
 * Upload file to Cloudinary
 * @param {File} file - The file to upload
 * @param {string} folder - Optional folder name (default: 'activities')
 * @returns {Promise<string>} - The uploaded file URL
 */
export const uploadToCloudinary = async (file, folder = 'activities') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryConfig.uploadPreset);
    formData.append('folder', folder);

    try {
        const response = await fetch(cloudinaryConfig.apiUrl, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const data = await response.json();
        return data.secure_url; // Return the secure HTTPS URL
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }
};

/**
 * Upload multiple files to Cloudinary
 * @param {FileList|Array<File>} files - The files to upload
 * @param {string} folder - Optional folder name
 * @returns {Promise<Array<string>>} - Array of uploaded file URLs
 */
export const uploadMultipleToCloudinary = async (files, folder = 'activities') => {
    const uploadPromises = Array.from(files).map(file =>
        uploadToCloudinary(file, folder)
    );

    return Promise.all(uploadPromises);
};
