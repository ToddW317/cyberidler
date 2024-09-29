import React, { useState } from 'react';
import { useAuthStore, useGameStore, useTheme } from '../../game/store';
import { updateProfile, updatePassword, deleteUser } from 'firebase/auth';
import { auth } from '../../lib/firebase';

export const ProfilePage: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const gameSettings = useGameStore((state) => state.settings);
  const setLanguage = useGameStore((state) => state.setLanguage);
  const setNotifications = useGameStore((state) => state.setNotifications);
  const setDifficulty = useGameStore((state) => state.setDifficulty);
  const setGameVolume = useGameStore((state) => state.setVolume);

  const { theme, setTheme } = useTheme();

  const inputClassName = `mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${
    theme === 'dark' 
      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500' 
      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
  }`;

  const labelClassName = `block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`;

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!user) return;

    try {
      await updateProfile(user, { displayName });
      setUser({ ...user, displayName });
      setSuccess('Profile updated successfully!');
    } catch (error) {
      setError('Failed to update profile. ' + (error as Error).message);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!user) return;
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await updatePassword(user, newPassword);
      setSuccess('Password changed successfully!');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setError('Failed to change password. ' + (error as Error).message);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await deleteUser(user);
        setUser(null);
      } catch (error) {
        setError('Failed to delete account. ' + (error as Error).message);
      }
    }
  };

  if (!user) {
    return <div className={`text-center mt-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Please sign in to view your profile.</div>;
  }

  return (
    <div className={`max-w-2xl mx-auto mt-8 p-6 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
      
      <form onSubmit={handleUpdateProfile} className="mb-8">
        <div className="mb-4">
          <label htmlFor="displayName" className={labelClassName}>Display Name:</label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className={inputClassName}
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Update Profile
        </button>
      </form>

      <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Change Password</h3>
      <form onSubmit={handleChangePassword} className="mb-8">
        <div className="mb-4">
          <label htmlFor="newPassword" className={labelClassName}>New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={inputClassName}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className={labelClassName}>Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={inputClassName}
          />
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Change Password
        </button>
      </form>

      <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Game Settings</h3>
      <div className="space-y-4 mb-8">
        <div>
          <label htmlFor="gameVolume" className="block text-sm font-medium text-gray-700">Game Volume:</label>
          <input
            type="range"
            id="gameVolume"
            min="0"
            max="100"
            value={gameSettings.volume}
            onChange={(e) => setGameVolume(Number(e.target.value))}
            className="mt-1 block w-full"
          />
          <span className="text-sm text-gray-500">{gameSettings.volume}%</span>
        </div>
        <div>
          <label htmlFor="theme" className={labelClassName}>Theme:</label>
          <select
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
            className={inputClassName}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div>
          <label htmlFor="language" className={labelClassName}>Language:</label>
          <select
            id="language"
            value={gameSettings.language}
            onChange={(e) => setLanguage(e.target.value)}
            className={inputClassName}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="notifications"
            checked={gameSettings.notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className={`rounded ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
          />
          <label htmlFor="notifications" className={`ml-2 ${labelClassName}`}>Enable Notifications</label>
        </div>
        <div>
          <label htmlFor="difficulty" className={labelClassName}>Difficulty:</label>
          <select
            id="difficulty"
            value={gameSettings.difficulty}
            onChange={(e) => setDifficulty(e.target.value as 'easy' | 'normal' | 'hard')}
            className={inputClassName}
          >
            <option value="easy">Easy</option>
            <option value="normal">Normal</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Account Management</h3>
      <button 
        onClick={handleDeleteAccount} 
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Delete Account
      </button>

      {error && <p className="mt-4 text-red-500">{error}</p>}
      {success && <p className="mt-4 text-green-500">{success}</p>}
    </div>
  );
};