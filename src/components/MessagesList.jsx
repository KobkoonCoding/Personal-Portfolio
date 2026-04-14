import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    getAllMessages,
    markMessageRead,
    deleteMessage,
} from "../services/messagesService";

const formatTimestamp = (ts) => {
    if (!ts) return "";
    // Firestore Timestamp objects have a toDate() method; guard for plain values too.
    const date = typeof ts.toDate === "function" ? ts.toDate() : new Date(ts);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleString();
};

const MessagesList = () => {
    const { t } = useTranslation();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedId, setExpandedId] = useState(null);

    const loadMessages = async () => {
        setLoading(true);
        setError(null);
        try {
            const rows = await getAllMessages();
            setMessages(rows);
        } catch (err) {
            console.error("Failed to load messages:", err);
            setError(err.message || "Failed to load messages");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMessages();
    }, []);

    const handleToggle = async (msg) => {
        const next = expandedId === msg.id ? null : msg.id;
        setExpandedId(next);

        // When opening an unread message, mark it as read.
        if (next === msg.id && !msg.read) {
            try {
                await markMessageRead(msg.id);
                setMessages((prev) =>
                    prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
                );
            } catch (err) {
                console.error("Failed to mark as read:", err);
            }
        }
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (!window.confirm(t("admin.confirmDeleteMessage"))) return;
        try {
            await deleteMessage(id);
            setMessages((prev) => prev.filter((m) => m.id !== id));
        } catch (err) {
            console.error("Failed to delete message:", err);
            alert(t("common.error") + ": " + err.message);
        }
    };

    const unreadCount = messages.filter((m) => !m.read).length;

    if (loading) {
        return (
            <div className="text-white/60 text-center py-12">
                {t("admin.loadingMessages")}
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-red-300">
                <p className="font-semibold mb-2">{t("common.error")}</p>
                <p className="text-sm">{error}</p>
                <p className="text-xs mt-3 text-red-200/60">
                    {t("admin.rulesHint")}
                </p>
            </div>
        );
    }

    if (messages.length === 0) {
        return (
            <div className="text-white/60 text-center py-12 border border-white/10 rounded-xl">
                {t("admin.noMessages")}
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
                <p className="text-white/60 text-sm">
                    {messages.length} {t("admin.messagesTotal")}
                    {unreadCount > 0 && (
                        <span className="ml-3 inline-flex items-center gap-1.5 text-sand">
                            <span className="w-2 h-2 rounded-full bg-sand animate-pulse" />
                            {unreadCount} {t("admin.unread")}
                        </span>
                    )}
                </p>
                <button
                    onClick={loadMessages}
                    className="text-xs text-white/50 hover:text-white border border-white/10 rounded-full px-3 py-1 hover:border-white/30 transition-colors"
                >
                    {t("admin.refresh")}
                </button>
            </div>

            {messages.map((msg) => {
                const isOpen = expandedId === msg.id;
                return (
                    <div
                        key={msg.id}
                        className={`border rounded-xl overflow-hidden transition-colors ${msg.read
                                ? "bg-white/[0.02] border-white/10"
                                : "bg-sand/[0.06] border-sand/30"
                            }`}
                    >
                        <button
                            onClick={() => handleToggle(msg)}
                            className="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-white/5 transition-colors"
                        >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                {!msg.read && (
                                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-sand animate-pulse" />
                                )}
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-semibold text-white">
                                            {msg.name || "—"}
                                        </span>
                                        <span className="text-xs text-white/50">
                                            {msg.email}
                                        </span>
                                    </div>
                                    <p className="text-xs text-white/40 mt-0.5">
                                        {formatTimestamp(msg.createdAt)}
                                    </p>
                                    {!isOpen && (
                                        <p className="text-sm text-white/60 mt-1 truncate">
                                            {msg.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <span
                                className={`text-white/40 transition-transform ${isOpen ? "rotate-180" : ""
                                    }`}
                            >
                                ▼
                            </span>
                        </button>

                        {isOpen && (
                            <div className="px-4 pb-4 border-t border-white/10">
                                <pre className="text-sm text-white/80 whitespace-pre-wrap font-sans mt-4 mb-4">
                                    {msg.message}
                                </pre>
                                <div className="flex items-center gap-2">
                                    <a
                                        href={`mailto:${msg.email}?subject=Re: your message`}
                                        className="text-xs text-sand border border-sand/40 rounded-full px-3 py-1 hover:bg-sand/10 transition-colors"
                                    >
                                        {t("admin.replyEmail")}
                                    </a>
                                    <button
                                        onClick={(e) => handleDelete(msg.id, e)}
                                        className="text-xs text-red-400 border border-red-500/30 rounded-full px-3 py-1 hover:bg-red-500/10 transition-colors ml-auto"
                                    >
                                        {t("admin.delete")}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default MessagesList;
