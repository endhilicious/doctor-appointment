import { Firestore, QuerySnapshot, DocumentData, Query } from 'firebase/firestore';
import { firestore } from './firebase';

const collectionName = 'users';

export async function getUserByUsernameAndPassword(username: string, password: string): Promise<DocumentData | null> {
  try {
    const querySnapshot: any = await firestore
      .collection(collectionName)
      .where('username', '==', username)
      .where('password', '==', password)
      .limit(1)
      .get();

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }

    return null;
  } catch (error) {
    console.error('Error saat mengambil data user:', error);
    throw error;
  }
}
