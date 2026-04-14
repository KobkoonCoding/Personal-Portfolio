import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { useTranslation } from 'react-i18next';
import ActivityForm from '../components/ActivityForm';
import AdminSettings from '../components/AdminSettings';
import MessagesList from '../components/MessagesList';

const Dashboard = () => {
    const { activities, isAdmin, loading, logout, deleteActivity, reorderActivities } = useAdmin();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [showForm, setShowForm] = useState(false);
    const [editingActivity, setEditingActivity] = useState(null);
    const [showSettings, setShowSettings] = useState(false);
    const [showMessages, setShowMessages] = useState(false);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [dragOverIndex, setDragOverIndex] = useState(null);

    React.useEffect(() => {
        // Only redirect if loading is complete and user is not admin
        if (!loading && !isAdmin) {
            navigate('/login');
        }
    }, [isAdmin, loading, navigate]);

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (!isAdmin) return null;

    const handleEdit = (activity) => {
        setEditingActivity(activity);
        setShowForm(true);
    };

    const handleAddNew = () => {
        setEditingActivity(null);
        setShowForm(true);
    };

    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDragOverIndex(index);
    };

    const handleDragLeave = () => {
        setDragOverIndex(null);
    };

    const handleDrop = async (e, dropIndex) => {
        e.preventDefault();

        if (draggedIndex === null || draggedIndex === dropIndex) {
            setDraggedIndex(null);
            setDragOverIndex(null);
            return;
        }

        // Reorder array
        const reordered = [...activities];
        const [movedItem] = reordered.splice(draggedIndex, 1);
        reordered.splice(dropIndex, 0, movedItem);

        // Update order in Firestore
        try {
            await reorderActivities(reordered);
        } catch (error) {
            console.error('Failed to reorder:', error);
        }

        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-black">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-bold text-white">{t('admin.dashboard')}</h1>
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => { setShowMessages(!showMessages); setShowSettings(false); setShowForm(false); }}
                            className={`border px-6 py-2 rounded-full transition-all font-semibold ${showMessages ? 'bg-sand text-black border-sand' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                        >
                            {t('admin.messages')}
                        </button>
                        <button
                            onClick={() => { setShowSettings(!showSettings); setShowMessages(false); setShowForm(false); }}
                            className="bg-white/5 border border-white/10 text-white px-6 py-2 rounded-full hover:bg-white/10 transition-all font-semibold"
                        >
                            {showSettings ? 'Dashboard' : 'Settings'}
                        </button>
                        {!showSettings && !showMessages && (
                            <button
                                onClick={handleAddNew}
                                className="bg-sand text-black px-6 py-2 rounded-full font-bold hover:bg-white transition-all"
                            >
                                {t('admin.addNew')}
                            </button>
                        )}
                        <button
                            onClick={() => { logout(); navigate('/'); }}
                            className="bg-white/5 border border-white/10 text-white px-6 py-2 rounded-full hover:bg-white/10 transition-all font-semibold"
                        >
                            {t('admin.logout')}
                        </button>
                    </div>
                </div>

                {showMessages ? (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-12 backdrop-blur-xl max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold text-white mb-6">{t('admin.messages')}</h2>
                        <MessagesList />
                    </div>
                ) : showSettings ? (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12 backdrop-blur-xl max-w-2xl mx-auto">
                        <AdminSettings onClose={() => setShowSettings(false)} />
                    </div>
                ) : showForm ? (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12 backdrop-blur-xl">
                        <ActivityForm initialData={editingActivity} onClose={() => setShowForm(false)} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {activities.map((activity, index) => (
                            <div
                                key={activity.id}
                                draggable={!showForm && !showSettings}
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, index)}
                                onDragEnd={handleDragEnd}
                                className={`bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 transition-all cursor-move
                                    ${draggedIndex === index ? 'opacity-50 scale-95' : ''}
                                    ${dragOverIndex === index && draggedIndex !== index ? 'border-sand border-2 bg-sand/10' : ''}
                                    hover:border-white/20`}
                            >
                                <div className="flex items-center gap-6 w-full md:w-auto">
                                    {/* Index Number Badge */}
                                    <div className="flex-shrink-0 w-12 h-12 bg-sand/20 border border-sand/40 rounded-lg flex items-center justify-center">
                                        <span className="text-sand font-bold text-lg">#{index + 1}</span>
                                    </div>

                                    {/* Drag Handle */}
                                    <div className="flex-shrink-0 text-white/40 hover:text-sand cursor-grab active:cursor-grabbing">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <circle cx="9" cy="5" r="1.5" />
                                            <circle cx="9" cy="12" r="1.5" />
                                            <circle cx="9" cy="19" r="1.5" />
                                            <circle cx="15" cy="5" r="1.5" />
                                            <circle cx="15" cy="12" r="1.5" />
                                            <circle cx="15" cy="19" r="1.5" />
                                        </svg>
                                    </div>

                                    <img
                                        src={activity.imageUrl || activity.image}
                                        alt={i18n.language === 'th' ? activity.title_th : activity.title_en}
                                        className="w-20 h-20 object-cover rounded-lg border border-white/10"
                                    />
                                    <div>
                                        <h3 className="text-white font-bold text-xl">{i18n.language === 'th' ? activity.title_th : activity.title_en}</h3>
                                        <p className="text-gray-400 text-sm">{t('activities.eventDate')}: {activity.date} • {t('activities.publishedOn')}: {activity.uploadDate || 'Legacy'}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 w-full md:w-auto">
                                    <button
                                        onClick={() => handleEdit(activity)}
                                        className="flex-1 md:flex-none bg-blue-500/10 text-blue-400 border border-blue-500/20 px-6 py-2 rounded-lg hover:bg-blue-500/20 transition-all font-semibold"
                                    >
                                        {t('admin.edit')}
                                    </button>
                                    <button
                                        onClick={() => { if (window.confirm('Delete?')) deleteActivity(activity.id); }}
                                        className="flex-1 md:flex-none bg-red-500/10 text-red-400 border border-red-500/20 px-6 py-2 rounded-lg hover:bg-red-500/20 transition-all font-semibold"
                                    >
                                        {t('admin.delete')}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
