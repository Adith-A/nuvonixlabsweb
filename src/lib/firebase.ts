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

// Critical constraint: validate connection to Firestore on initial boot
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
    // Expected in rules if doc doesn't exist yet, but confirms endpoint connection
    return false;
  }
}

// Execute connection test on boot
testConnection().catch((err) => {
  console.debug('Initial Firestore connection test:', err);
});
