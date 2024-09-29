import React, { useState } from 'react';
import { auth, googleProvider } from '../../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, signInWithPopup } from 'firebase/auth';
import { useAuthStore } from '../../game/store';

export const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: username });
      setUser(userCredential.user);
    } catch (error) {
      setError('Failed to create an account. ' + (error as Error).message);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      setError('Failed to sign in. ' + (error as Error).message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      setError('Failed to sign out. ' + (error as Error).message);
    }
  };

  const handleGoogleAuth = async () => {
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if this is a new user (i.e., first time signing in with Google)
      if (result.additionalUserInfo?.isNewUser) {
        // You can perform additional registration steps here if needed
        // For example, you might want to set a default display name if it's not provided by Google
        if (!user.displayName) {
          await updateProfile(user, { displayName: user.email?.split('@')[0] });
        }
        // You can also add the user to your game's database or perform other initialization steps
      }
      
      setUser(user);
    } catch (error) {
      setError('Failed to authenticate with Google. ' + (error as Error).message);
    }
  };

  if (user) {
    return (
      <div>
        <p>Welcome, {user.displayName || user.email}!</p>
        <button onClick={handleSignOut}>Sign Out</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={isRegistering ? handleSignUp : handleSignIn}>
        {isRegistering && (
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">{isRegistering ? 'Sign Up' : 'Sign In'}</button>
        <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Switch to Sign In' : 'Switch to Sign Up'}
        </button>
      </form>
      <button onClick={handleGoogleAuth}>
        {isRegistering ? 'Sign Up with Google' : 'Sign In with Google'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};