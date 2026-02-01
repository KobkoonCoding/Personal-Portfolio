import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import ActivityCard from '../components/ActivityCard';
import { useTranslation } from 'react-i18next';

const AllActivities = () => {
    const navigate = useNavigate();
    const { activities } = useAdmin();
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const totalPages = Math.ceil(activities.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = activities.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo(0, 0);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">{t('activities.title')}</h1>
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center text-sand hover:opacity-80 transition-opacity"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {t('activities.backToHome')}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentItems.map((activity, index) => (
                        <ActivityCard key={activity.id} {...activity} />
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="mt-16 flex flex-col items-center gap-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                {t('common.previous' || 'Previous')}
                            </button>

                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${currentPage === page
                                            ? 'bg-sand text-black border-sand font-bold'
                                            : 'bg-transparent text-white border-white/10 hover:border-white/30'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                {t('common.next' || 'Next')}
                            </button>
                        </div>
                        <p className="text-gray-400 text-sm">
                            {t('common.page' || 'Page')} {currentPage} {t('common.of' || 'of')} {totalPages}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllActivities;
