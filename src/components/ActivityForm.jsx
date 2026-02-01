import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useTranslation } from 'react-i18next';
import { uploadToCloudinary, uploadMultipleToCloudinary } from '../config/cloudinary';

const ActivityForm = ({ initialData, onClose }) => {
    const { addActivity, updateActivity } = useAdmin();
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        title_en: '',
        title_th: '',
        startDate: '',
        endDate: '',
        date: '', // Keep for backward compatibility
        description_en: '',
        description_th: '',
        subDescription_en: '',
        subDescription_th: '',
        imageUrl: '', // Changed from 'image' to 'imageUrl'
        gallery: [],
        tags: []
    });
    const [selectedTags, setSelectedTags] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState('');

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                title_en: initialData.title_en || initialData.title || '',
                title_th: initialData.title_th || initialData.title || '',
                startDate: initialData.startDate || initialData.date || '',
                endDate: initialData.endDate || '',
                date: initialData.date || initialData.startDate || '',
                description_en: initialData.description_en || initialData.description || '',
                description_th: initialData.description_th || initialData.description || '',
                subDescription_en: initialData.subDescription_en || (Array.isArray(initialData.subDescription) ? initialData.subDescription.join('\n') : initialData.subDescription || ''),
                subDescription_th: initialData.subDescription_th || (Array.isArray(initialData.subDescription) ? initialData.subDescription.join('\n') : initialData.subDescription || ''),
                imageUrl: initialData.imageUrl || initialData.image || '', // Support both old and new format
                gallery: initialData.gallery || [],
                tags: initialData.tags || []
            });
            setSelectedTags(initialData.tags || []);
        }
    }, [initialData]);

    const handleImageUpload = async (e, isGallery = false) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);
        try {
            if (isGallery) {
                setUploadProgress(`Uploading ${files.length} image(s) to Cloudinary...`);
                const urls = await uploadMultipleToCloudinary(files, 'activities');
                setFormData(prev => ({ ...prev, gallery: [...prev.gallery, ...urls] }));
                setUploadProgress(`✅ ${files.length} image(s) uploaded successfully!`);
            } else {
                setUploadProgress('Uploading image to Cloudinary...');
                const url = await uploadToCloudinary(files[0], 'activities');
                setFormData(prev => ({ ...prev, imageUrl: url }));
                setUploadProgress('✅ Image uploaded successfully!');
            }

            setTimeout(() => setUploadProgress(''), 3000);
        } catch (error) {
            console.error('Upload error:', error);
            setUploadProgress('❌ Upload failed. Please try again.');
            setTimeout(() => setUploadProgress(''), 5000);
        } finally {
            setUploading(false);
        }
    };

    const [isTranslating, setIsTranslating] = useState(false);

    const handleTranslate = async (sourceField, targetField, targetLang) => {
        const text = formData[sourceField];
        if (!text) return;

        setIsTranslating(true);
        try {
            // Using MyMemory API (Free)
            const langPair = targetLang === 'th' ? 'en|th' : 'th|en';
            const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`);
            const data = await response.json();

            if (data.responseData?.translatedText) {
                setFormData(prev => ({
                    ...prev,
                    [targetField]: data.responseData.translatedText
                }));
            }
        } catch (error) {
            console.error('Translation error:', error);
            alert('Translation failed. Please try again or enter manually.');
        } finally {
            setIsTranslating(false);
        }
    };

    const removeGalleryImage = (index) => {
        setFormData(prev => ({
            ...prev,
            gallery: prev.gallery.filter((_, i) => i !== index)
        }));
    };

    // Custom tag input state
    const [tagInput_en, setTagInput_en] = useState('');
    const [tagInput_th, setTagInput_th] = useState('');

    const handleAddTag = () => {
        if (!tagInput_en.trim() || !tagInput_th.trim()) {
            alert('Please enter both English and Thai tag names');
            return;
        }

        const newTag = {
            id: `custom_${Date.now()}`,
            name_en: tagInput_en.trim(),
            name_th: tagInput_th.trim()
        };

        setSelectedTags([...selectedTags, newTag]);
        setTagInput_en('');
        setTagInput_th('');
    };

    const handleRemoveTag = (tagId) => {
        setSelectedTags(selectedTags.filter(t => t.id !== tagId));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (uploading) {
            alert('Please wait for image upload to complete');
            return;
        }

        setUploading(true);
        setUploadProgress('Saving activity...');

        try {
            const processedData = {
                ...formData,
                tags: selectedTags,
                // Use startDate as primary date for backward compatibility
                date: formData.startDate || formData.date,
                startDate: formData.startDate || formData.date,
                endDate: formData.endDate,
                uploadDate: initialData?.uploadDate || new Date().toISOString().split('T')[0]
            };

            if (initialData) {
                await updateActivity(initialData.id, processedData);
                setUploadProgress('✅ Activity updated successfully!');
            } else {
                await addActivity(processedData);
                setUploadProgress('✅ Activity added successfully!');
            }

            setTimeout(() => {
                onClose();
            }, 1000);
        } catch (error) {
            console.error('Submit error:', error);
            setUploadProgress('❌ Failed to save activity. Please try again.');
            setTimeout(() => setUploadProgress(''), 5000);
        } finally {
            setUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-gray-400 text-sm">Title (EN)</label>
                            <button
                                type="button"
                                onClick={() => handleTranslate('title_en', 'title_th', 'th')}
                                className="text-xs text-sand hover:underline"
                                disabled={isTranslating}
                            >
                                {isTranslating ? '...' : 'Translate to TH'}
                            </button>
                        </div>
                        <input
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-sand outline-none transition-all"
                            value={formData.title_en}
                            onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-gray-400 text-sm">หัวข้อ (TH)</label>
                            <button
                                type="button"
                                onClick={() => handleTranslate('title_th', 'title_en', 'en')}
                                className="text-xs text-sand hover:underline"
                                disabled={isTranslating}
                            >
                                {isTranslating ? '...' : 'Translate to EN'}
                            </button>
                        </div>
                        <input
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-sand outline-none transition-all"
                            value={formData.title_th}
                            onChange={(e) => setFormData({ ...formData, title_th: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-gray-400 text-sm">Key Details (EN) (One per line)</label>
                            <button
                                type="button"
                                onClick={() => handleTranslate('subDescription_en', 'subDescription_th', 'th')}
                                className="text-xs text-sand hover:underline"
                                disabled={isTranslating}
                            >
                                {isTranslating ? '...' : 'Translate to TH'}
                            </button>
                        </div>
                        <textarea
                            rows="4"
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-sand outline-none transition-all"
                            value={formData.subDescription_en}
                            onChange={(e) => setFormData({ ...formData, subDescription_en: e.target.value })}
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-gray-400 text-sm">รายละเอียดที่สำคัญ (TH) (หนึ่งรายการต่อบรรทัด)</label>
                            <button
                                type="button"
                                onClick={() => handleTranslate('subDescription_th', 'subDescription_en', 'en')}
                                className="text-xs text-sand hover:underline"
                                disabled={isTranslating}
                            >
                                {isTranslating ? '...' : 'Translate to EN'}
                            </button>
                        </div>
                        <textarea
                            rows="4"
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-sand outline-none transition-all"
                            value={formData.subDescription_th}
                            onChange={(e) => setFormData({ ...formData, subDescription_th: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">
                            วันที่เริ่มต้น (Start Date) - ใส่เป็น ค.ศ. (CE) *
                        </label>
                        <input
                            type="date"
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-sand outline-none transition-all"
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            required
                        />
                        <small className="text-gray-500 text-xs mt-1 block">
                            * ระบบจะแปลงเป็น พ.ศ. (BE) อัตโนมัติเมื่อแสดงผลภาษาไทย
                        </small>
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">
                            วันที่สิ้นสุด (End Date) - ใส่เป็น ค.ศ. (CE) (ถ้ามี)
                        </label>
                        <input
                            type="date"
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-sand outline-none transition-all"
                            value={formData.endDate}
                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        />
                        <small className="text-gray-500 text-xs mt-1 block">
                            * ถ้าเป็นกิจกรรมวันเดียว ไม่ต้องใส่วันที่สิ้นสุด
                        </small>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-gray-400 text-sm">Description (EN)</label>
                            <button
                                type="button"
                                onClick={() => handleTranslate('description_en', 'description_th', 'th')}
                                className="text-xs text-sand hover:underline"
                                disabled={isTranslating}
                            >
                                {isTranslating ? '...' : 'Translate to TH'}
                            </button>
                        </div>
                        <textarea
                            rows="3"
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-sand outline-none transition-all"
                            value={formData.description_en}
                            onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-gray-400 text-sm">คำอธิบาย (TH)</label>
                            <button
                                type="button"
                                onClick={() => handleTranslate('description_th', 'description_en', 'en')}
                                className="text-xs text-sand hover:underline"
                                disabled={isTranslating}
                            >
                                {isTranslating ? '...' : 'Translate to EN'}
                            </button>
                        </div>
                        <textarea
                            rows="3"
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-sand outline-none transition-all"
                            value={formData.description_th}
                            onChange={(e) => setFormData({ ...formData, description_th: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">{t('admin.mainThumbnail' || 'Main Thumbnail')}</label>
                        {formData.imageUrl && (
                            <img src={formData.imageUrl} alt="Thumbnail" className="w-full h-40 object-cover rounded-xl mb-4 border border-white/10" />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sand file:text-black hover:file:bg-white transition-all cursor-pointer"
                            onChange={(e) => handleImageUpload(e)}
                            disabled={uploading}
                        />
                        {uploadProgress && (
                            <p className="text-sm text-sand mt-2">{uploadProgress}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">{t('admin.images')} (Gallery)</label>
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            {formData.gallery.map((img, index) => (
                                <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-white/10">
                                    <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeGalleryImage(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sand file:text-black hover:file:bg-white transition-all cursor-pointer"
                            onChange={(e) => handleImageUpload(e, true)}
                            disabled={uploading}
                        />
                    </div>
                </div>
            </div>

            {/* Custom Tags Input Section */}
            <div className="border-t border-white/10 pt-8">
                <label className="block text-gray-400 text-sm mb-4">
                    🏷️ Technologies & Tags (เทคโนโลยีและแท็ก)
                </label>

                {/* Tag Input Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-gray-400 text-xs mb-2">Tag Name (EN)</label>
                        <input
                            type="text"
                            value={tagInput_en}
                            onChange={(e) => setTagInput_en(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-sand outline-none transition-all"
                            placeholder="e.g., Machine Learning"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-xs mb-2">ชื่อแท็ก (TH)</label>
                        <input
                            type="text"
                            value={tagInput_th}
                            onChange={(e) => setTagInput_th(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-sand outline-none transition-all"
                            placeholder="เช่น การเรียนรู้ของเครื่อง"
                        />
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleAddTag}
                    className="mb-6 px-6 py-2 bg-sand/20 border border-sand/40 text-sand rounded-lg hover:bg-sand/30 transition-all font-semibold text-sm"
                >
                    + Add Tag
                </button>

                {/* Selected Tags Display */}
                {selectedTags.length > 0 && (
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <p className="text-sm text-gray-400 mb-3">Selected Tags ({selectedTags.length}):</p>
                        <div className="flex flex-wrap gap-2">
                            {selectedTags.map(tag => (
                                <span
                                    key={tag.id}
                                    className="bg-sand/20 border border-sand/40 text-sand px-4 py-2 rounded-lg text-sm flex items-center gap-2 font-semibold"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-xs opacity-90">{tag.name_en}</span>
                                        <span className="text-xs opacity-70">{tag.name_th}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(tag.id)}
                                        className="ml-2 hover:text-red-400 transition-colors text-lg leading-none"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex gap-4 justify-end border-t border-white/10 pt-8">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-8 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-all"
                    disabled={uploading}
                >
                    {t('admin.cancel')}
                </button>
                <button
                    type="submit"
                    disabled={uploading}
                    className="px-8 py-3 rounded-xl bg-sand text-black font-bold hover:bg-white transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {uploading ? 'Saving...' : t('admin.save')}
                </button>
            </div>
        </form>
    );
};

export default ActivityForm;
