import { Firestore, DocumentData, QuerySnapshot, QueryDocumentSnapshot } from 'firebase/firestore';
import { firestore } from './firebase';

const collectionName = 'doctor';

export function getAllData(): Promise<DocumentData[]> {
  return firestore
    .collection(collectionName)
    .get()
    .then((snapshot: any) => {
      const data: DocumentData[] = snapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => ({ ...doc.data(), id: doc.id })
      );
      return data;
    })
    .catch((error: Error) => {
      console.error('Error retrieving data:', error);
      throw error;
    });
}

export function getDataById(id: string): Promise<DocumentData | null> {
  return firestore
    .collection(collectionName)
    .doc(id)
    .get()
    .then((doc: any) => {
      if (doc.exists) {
        return { ...doc.data(), id: doc.id };
      } else {
        console.log('Document not found');
        return null;
      }
    })
    .catch((error: Error) => {
      console.error('Error retrieving data:', error);
      throw error;
    });
}

export function createData(data: DocumentData): Promise<string> {
  return firestore
    .collection(collectionName)
    .add(data)
    .then((docRef: any) => {
      console.log('Data added successfully with ID:', docRef.id);
      return 'success';
    })
    .catch((error: Error) => {
      console.error('Error adding data:', error);
      throw error;
    });
}

export function updateData(id: string, newData: DocumentData): Promise<string> {
  return firestore
    .collection(collectionName)
    .doc(id)
    .update(newData)
    .then(() => {
      console.log('Data updated successfully');
      return 'success';
    })
    .catch((error: Error) => {
      console.error('Error updating data:', error);
      throw error;
    });
}

export function deleteData(id: string): Promise<void> {
  return firestore
    .collection(collectionName)
    .doc(id)
    .delete()
    .then(() => {
      console.log('Data deleted successfully');
    })
    .catch((error: Error) => {
      console.error('Error deleting data:', error);
      throw error;
    });
}
