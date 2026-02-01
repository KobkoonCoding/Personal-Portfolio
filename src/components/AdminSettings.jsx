import React, { useState } from 'react';
import { changePassword } from '../services/authService';

const AdminSettings = ({ onClose }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('');
        setLoading(true);

        // Validation
        if (newPassword.length < 8) {
            setStatus('error: รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร');
            setLoading(false);
            return;
        }

        if (newPassword !== confirmPassword) {
            setStatus('error: รหัสผ่านใหม่ไม่ตรงกัน');
            setLoading(false);
            return;
        }

        try {
            // Use Firebase password change
            await changePassword(oldPassword, newPassword);
            setStatus('success: เปลี่ยนรหัสผ่านสำเร็จ!');

            // Clear form
            setTimeout(() => {
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setStatus('');
            }, 3000);
        } catch (error) {
            console.error('Password change error:', error);

            // Handle Firebase-specific errors
            let errorMessage = 'เกิดข้อผิดพลาด กรุณาลองใหม่';
            if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                errorMessage = 'รหัสผ่านเดิมไม่ถูกต้อง';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'รหัสผ่านใหม่ไม่ปลอดภัยเพียงพอ';
            } else if (error.code === 'auth/requires-recent-login') {
                errorMessage = 'กรุณา logout และ login ใหม่ก่อนเปลี่ยนรหัสผ่าน';
            } else if (error.message) {
                errorMessage = error.message;
            }

            setStatus(`error: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-[#0e0e1a] border border-white/10 rounded-2xl p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-white mb-6">⚙️ Admin Settings</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">
                            รหัสผ่านเดิม (Current Password) *
                        </label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-sand outline-none"
                            required
                            disabled={loading}
                            placeholder="ใส่รหัสผ่านเดิม"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">
                            รหัสผ่านใหม่ (New Password) *
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-sand outline-none"
                            required
                            disabled={loading}
                            minLength={8}
                            placeholder="อย่างน้อย 8 ตัวอักษร"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">
                            ยืนยันรหัสผ่านใหม่ (Confirm Password) *
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-sand outline-none"
                            required
                            disabled={loading}
                            placeholder="ใส่รหัสผ่านใหม่อีกครั้ง"
                        />
                    </div>

                    {status && (
                        <div className={`p-3 rounded-lg text-sm ${status.startsWith('success')
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}>
                            {status.replace('success: ', '').replace('error: ', '')}
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-all disabled:opacity-50"
                        >
                            ยกเลิก
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-6 py-3 rounded-xl bg-sand text-black font-bold hover:bg-white transition-all disabled:opacity-50"
                        >
                            {loading ? 'กำลังเปลี่ยน...' : 'เปลี่ยนรหัสผ่าน'}
                        </button>
                    </div>
                </form>

                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <p className="text-blue-400 text-xs">
                        ℹ️ <strong>หมายเหตุ:</strong> การเปลี่ยนรหัสผ่านจะอัพเดทใน Firebase Authentication ทันที
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
