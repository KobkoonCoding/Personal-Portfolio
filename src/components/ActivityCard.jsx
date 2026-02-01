import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { formatDateRange } from '../utils/dateFormatter';

const ActivityCard = ({ id, ...activity }) => {
    const { t, i18n } = useTranslation();
    const isThai = i18n.language === 'th';
    const title = isThai ? activity.title_th : activity.title_en;
    const description = isThai ? activity.description_th : activity.description_en;
    const image = activity.imageUrl || activity.image; // Support both old and new format
    const formattedDate = formatDateRange(
        activity.startDate || activity.date,
        activity.endDate,
        i18n.language
    );

    return (
        <Link to={`/activity/${id}`} className="group block">
            <div className="bg-[#0e0e1a] rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-sand">
                        {formattedDate}
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-sand transition-colors">
                        {title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">
                        {description}
                    </p>
                    <div className="mt-4 flex items-center text-sand text-sm font-medium">
                        {t('activities.readMore')}
                        <svg
                            className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ActivityCard;
