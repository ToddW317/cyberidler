'use client';

import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { useAuthStore, useGameStore } from '@/game/store';
import { Auth } from './components/Auth';
import { ProfilePage } from './components/ProfilePage';
import { Market } from './components/Market';
import { ResearchTree } from './components/ResearchTree';
import { OrgManagement } from './components/OrgManagement';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Home() {
  const isLoading = useAuthStore((state) => state.isLoading);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);
  const [activeTab, setActiveTab] = useState('dashboard');

  const tick = useGameStore((state) => state.tick);
  const calculateOfflineProgress = useGameStore((state) => state.calculateOfflineProgress);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  useEffect(() => {
    if (user) {
      calculateOfflineProgress();
      const interval = setInterval(() => {
        tick();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [user, calculateOfflineProgress, tick]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'market':
        return <Market />;
      case 'research':
        return <ResearchTree />;
      case 'profile':
        return <ProfilePage />;
      case 'org':
        return <OrgManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">CyberIdler</span>
              </div>
            </div>
            {user && (
              <div className="flex items-center">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'dashboard' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('market')}
                  className={`ml-4 px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'market' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Market
                </button>
                <button
                  onClick={() => setActiveTab('research')}
                  className={`ml-4 px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'research' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Research
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`ml-4 px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'profile' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('org')}
                  className={`ml-4 px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'org' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Organization
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {user ? (
          renderContent()
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Welcome to CyberIdler</h2>
            <Auth />
          </div>
        )}
      </main>
    </div>
  );
}