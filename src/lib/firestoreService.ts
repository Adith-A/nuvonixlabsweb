import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { handleFirestoreError, OperationType } from './firestoreErrors';

export interface ApplicationSubmission {
  id?: string;
  fullName: string;
  email: string;
  credentialUrl: string;
  practiceArea: 'finance' | 'audit' | 'law';
  status: 'submitted' | 'under_review' | 'accepted' | 'declined';
  createdAt?: any;
  userId?: string;
}

export interface InquirySubmission {
  id?: string;
  email: string;
  organization: string;
  domain: 'corporate_accounting' | 'tax_and_audit' | 'corporate_finance' | 'general_evaluation';
  format: 'parquet' | 'jsonl' | 'csv' | 'custom';
  scopeNotes?: string;
  status: 'pending' | 'in_review' | 'scheduled';
  createdAt?: any;
  userId?: string;
}

/**
 * Submit a practitioner bench application to Firestore.
 */
export async function submitPractitionerApplication(
  data: Omit<ApplicationSubmission, 'status' | 'createdAt'>
): Promise<{ id: string }> {
  const collectionPath = 'applications';
  try {
    const appsRef = collection(db, collectionPath);
    const newDocRef = doc(appsRef);
    const payload: Record<string, any> = {
      fullName: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      credentialUrl: data.credentialUrl.trim(),
      practiceArea: data.practiceArea,
      status: 'submitted',
      createdAt: new Date().toISOString(),
    };

    if (auth.currentUser?.uid) {
      payload.userId = auth.currentUser.uid;
    }

    await setDoc(newDocRef, payload);
    return { id: newDocRef.id };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, collectionPath);
  }
}

/**
 * Submit an early project inquiry or pilot request to Firestore.
 */
export async function submitProjectInquiry(
  data: Omit<InquirySubmission, 'status' | 'createdAt'>
): Promise<{ id: string }> {
  const collectionPath = 'inquiries';
  try {
    const inqRef = collection(db, collectionPath);
    const newDocRef = doc(inqRef);
    const payload: Record<string, any> = {
      email: data.email.trim().toLowerCase(),
      organization: data.organization.trim(),
      domain: data.domain || 'corporate_accounting',
      format: data.format || 'jsonl',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    if (data.scopeNotes && data.scopeNotes.trim()) {
      payload.scopeNotes = data.scopeNotes.trim().slice(0, 2048);
    }

    if (auth.currentUser?.uid) {
      payload.userId = auth.currentUser.uid;
    }

    await setDoc(newDocRef, payload);
    return { id: newDocRef.id };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, collectionPath);
  }
}

export interface ContactMessage {
  name: string;
  email: string;
  organization?: string;
  message: string;
}

/**
 * Submit a direct Contact Us message to Firestore.
 */
export async function submitContactMessage(
  data: ContactMessage
): Promise<{ id: string }> {
  const collectionPath = 'inquiries';
  try {
    const inqRef = collection(db, collectionPath);
    const newDocRef = doc(inqRef);
    const payload: Record<string, any> = {
      name: data.name.trim().slice(0, 128),
      email: data.email.trim().toLowerCase().slice(0, 256),
      message: data.message.trim().slice(0, 4096),
      status: 'received',
      createdAt: new Date().toISOString(),
    };

    if (data.organization && data.organization.trim()) {
      payload.organization = data.organization.trim().slice(0, 128);
    }

    if (auth.currentUser?.uid) {
      payload.userId = auth.currentUser.uid;
    }

    await setDoc(newDocRef, payload);
    return { id: newDocRef.id };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, collectionPath);
  }
}


/**
 * Fetch authenticated user's submitted applications and inquiries.
 */
export async function fetchUserSubmissions(userId: string): Promise<{
  applications: ApplicationSubmission[];
  inquiries: InquirySubmission[];
}> {
  const apps: ApplicationSubmission[] = [];
  const inqs: InquirySubmission[] = [];

  // Query applications
  try {
    const appsQuery = query(
      collection(db, 'applications'),
      where('userId', '==', userId)
    );
    const appsSnap = await getDocs(appsQuery);
    appsSnap.forEach((doc) => {
      apps.push({ id: doc.id, ...(doc.data() as ApplicationSubmission) });
    });
  } catch (error) {
    console.warn('Could not fetch user applications:', error);
  }

  // Query inquiries
  try {
    const inqQuery = query(
      collection(db, 'inquiries'),
      where('userId', '==', userId)
    );
    const inqSnap = await getDocs(inqQuery);
    inqSnap.forEach((doc) => {
      inqs.push({ id: doc.id, ...(doc.data() as InquirySubmission) });
    });
  } catch (error) {
    console.warn('Could not fetch user inquiries:', error);
  }

  return { applications: apps, inquiries: inqs };
}
