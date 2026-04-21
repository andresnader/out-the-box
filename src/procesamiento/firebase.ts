import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

declare const __firebase_config: any;
declare const __app_id: any;

const getFirebaseConfig = () => {
    try {
        return typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
    } catch (e) {
        return typeof __firebase_config === 'string' ? JSON.parse(__firebase_config) : __firebase_config;
    }
}

export const firebaseConfig = getFirebaseConfig();
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const appId = typeof __app_id !== 'undefined' ? __app_id : 'box-studio-portal';
