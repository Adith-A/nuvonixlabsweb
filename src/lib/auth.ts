import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

export const syncUserProfile = async (user: User) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(
      userRef,
      {
        userId: user.uid,
        email: user.email || '',
        displayName: user.displayName || user.email?.split('@')[0] || 'Client',
        photoURL: user.photoURL || '',
        role: 'client',
        lastLoginAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (err) {
    console.debug('User profile sync note:', err);
  }
};



// Workspace Scopes
export const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

const provider = new GoogleAuthProvider();
SCOPES.forEach((scope) => {
  provider.addScope(scope);
});
// Request offline access prompt to ensure fresh credentials
provider.setCustomParameters({
  prompt: 'select_account',
});

// Flag to indicate if we are in the middle of a sign-in flow
let isSigningIn = false;
// Cache the access token in memory only (never localStorage/sessionStorage)
let cachedAccessToken: string | null = null;

/**
 * Initialize auth state listener.
 */
export const initAuth = (
  onAuthSuccess?: (user: User, token: string | null) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      syncUserProfile(user).catch(() => {});
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // User is authenticated in Firebase but token hasn't been set in this session
        if (onAuthSuccess) onAuthSuccess(user, null);
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

/**
 * Must be called from a button click or user interaction
 */
export const googleSignIn = async (): Promise<{ user: User; accessToken: string | null }> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    cachedAccessToken = credential?.accessToken || null;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Sign in error:', error);
    // Provide user-friendly description if popup blocked or network issue
    if (error?.code === 'auth/popup-blocked') {
      throw new Error('Popup blocked by browser. Please allow popups for this site and try again.');
    } else if (error?.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in cancelled. Please try again.');
    } else if (error?.code === 'auth/network-request-failed') {
      throw new Error('Network error during Google sign-in. Please check your connection.');
    }
    throw error;
  } finally {
    isSigningIn = false;
  }
};

/**
 * Sign in or sign up with email and password
 */
export const emailPasswordSignIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    // If account doesn't exist yet, automatically create it for seamless onboarding
    if (error?.code === 'auth/user-not-found' || error?.code === 'auth/invalid-credential') {
      try {
        const newCredential = await createUserWithEmailAndPassword(auth, email, password);
        const displayName = email.split('@')[0];
        await updateProfile(newCredential.user, { displayName });
        return newCredential.user;
      } catch (createErr: any) {
        if (createErr?.code === 'auth/email-already-in-use') {
          throw new Error('Incorrect password. Please try again or use another login method.');
        } else if (createErr?.code === 'auth/weak-password') {
          throw new Error('Password must be at least 6 characters.');
        }
        throw new Error(createErr.message || 'Authentication failed');
      }
    } else if (error?.code === 'auth/wrong-password') {
      throw new Error('Incorrect password. Please try again.');
    } else if (error?.code === 'auth/invalid-email') {
      throw new Error('Please enter a valid email address.');
    }
    throw new Error(error.message || 'Failed to sign in with email and password.');
  }
};

/**
 * Retrieve current cached access token from memory.
 */
export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

/**
 * Log out and clear memory cache.
 */
export const logout = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

/**
 * Query user's Gmail profile using the OAuth access token
 */
export const fetchGmailProfile = async (token: string) => {
  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gmail API error (${res.status}): ${errText}`);
  }
  return res.json();
};

/**
 * Query recent messages from Gmail to verify connectivity
 */
export const fetchRecentGmailMessages = async (token: string, maxResults = 5) => {
  const res = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResults}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    }
  );
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gmail API error (${res.status}): ${errText}`);
  }
  return res.json();
};
