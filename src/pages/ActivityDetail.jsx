import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { useTranslation } from 'react-i18next';
import { formatDateRange, formatFullDate } from '../utils/dateFormatter';

const ActivityDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { activities } = useAdmin();
    const { t, i18n } = useTranslation();
    const activity = activities.find(p => p.id === id);

    if (!activity) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-white">
                <h2 className="text-2xl font-bold mb-4">{t('activities.notFound' || 'Activity not found')}</h2>
                <button
                    onClick={() => navigate('/')}
                    className="bg-sand text-black px-6 py-2 rounded-full font-semibold"
                >
                    {t('activities.backToHome')}
                </button>
            </div>
        );
    }

    // Extract language-specific content
    const isThai = i18n.language === 'th';
    const title = isThai ? (activity.title_th || activity.title) : (activity.title_en || activity.title);
    const description = isThai ? (activity.description_th || activity.description) : (activity.description_en || activity.description);
    const subDescriptionText = isThai ? (activity.subDescription_th || activity.subDescription) : (activity.subDescription_en || activity.subDescription);
    const subDescription = typeof subDescriptionText === 'string'
        ? subDescriptionText.split('\n').filter(Boolean)
        : (Array.isArray(subDescriptionText) ? subDescriptionText : []);
    const formattedDate = formatDateRange(
        activity.startDate || activity.date,
        activity.endDate,
        i18n.language
    );
    const formattedUploadDate = activity.uploadDate
        ? formatFullDate(activity.uploadDate, i18n.language)
        : '';

    return (
        <div className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/#activities')}
                    className="flex items-center text-sand mb-8 hover:opacity-80 transition-opacity"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    {t('activities.backToPortfolio')}
                </button>

                <header className="mb-12">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-sand text-black px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                            {t('activities.eventDate')}: {formattedDate}
                        </span>
                        {activity.uploadDate && (
                            <span className="bg-white/10 text-gray-300 px-4 py-1 rounded-full text-sm font-semibold border border-white/10">
                                {t('activities.publishedOn')}: {formattedUploadDate}
                            </span>
                        )}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mt-2">
                        {title}
                    </h1>
                </header>

                {activity.gallery && activity.gallery.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                        {activity.gallery.map((img, index) => (
                            <div key={index} className="rounded-2xl overflow-hidden shadow-2xl border border-white/5 aspect-video">
                                <img src={img} alt={`Activity ${index}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                            </div>
                        ))}
                    </div>
                ) : (activity.imageUrl || activity.image) && (activity.imageUrl || activity.image).trim() !== '' ? (
                    <div className="h-[400px] w-full rounded-2xl overflow-hidden mb-12 shadow-2xl border border-white/5">
                        <img src={activity.imageUrl || activity.image} alt={title} className="w-full h-full object-cover" />
                    </div>
                ) : (
                    <div className="h-[400px] w-full rounded-2xl overflow-hidden mb-12 shadow-2xl border border-white/5 bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center">
                        <div className="text-center text-gray-400">
                            <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-sm">{t('activities.noImage') || 'No image available'}</p>
                        </div>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left: Content */}
                    <div className="lg:w-2/3">
                        <div className="prose prose-invert max-w-none">
                            <h2 className="text-2xl font-semibold mb-4 border-l-4 border-sand pl-4">
                                {t('activities.overview')}
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                {description}
                            </p>

                            {subDescription.length > 0 && (
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
                                    <h3 className="text-xl font-semibold mb-6 text-sand flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {t('activities.keyDetails')}
                                    </h3>
                                    <ul className="space-y-4">
                                        {subDescription.map((item, index) => (
                                            <li key={index} className="flex items-start gap-4 text-gray-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-sand mt-2.5 shrink-0" />
                                                <span className="text-lg">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Tags and Link */}
                    <div className="lg:w-1/3 space-y-8">
                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">{t('activities.techTags')}</h2>
                            <div className="flex flex-wrap gap-2">
                                {activity.tags && activity.tags.map((tag) => (
                                    <div key={tag.id} className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-colors">
                                        {isThai ? (tag.name_th || tag.name) : (tag.name_en || tag.name)}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {activity.href && (
                            <a href={activity.href} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-sand text-black py-4 rounded-xl font-bold hover:bg-white transition-colors duration-300 shadow-xl">
                                {t('activities.viewProjectSite' || 'View Project Site')}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityDetail;
