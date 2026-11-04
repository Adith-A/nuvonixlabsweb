import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize singleton app
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Critical: configure Firestore with the specific databaseId provisioned
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Export Auth
export const auth = getAuth(app);

// Connection validator callable on demand
export async function testConnection(): Promise<boolean> {
  try {
    if (typeof window === 'undefined') return true;
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase running in offline/cached mode.');
    }
    return false;
  }
}
