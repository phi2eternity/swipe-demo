import React, { createContext, useContext, useEffect, useState } from 'react';
import { useInjection } from 'inversify-react';
import { FirebaseConfig, firebaseConfigSymbol } from '@domain/types/common/firebase-config';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { Analytics } from '@firebase/analytics';
import { getStorage, ref as storageRef, FirebaseStorage } from '@firebase/storage';
import { FirebaseAppSymbol } from '@domain/types/TYPES';
import { FirebaseApp } from '@firebase/app';


export interface FirebaseProviderProps {
  children: React.ReactNode;
}

export interface FirebaseContextValue {
  analytics: Analytics | null;
  storage: FirebaseStorage | null;
}

const FirebaseContext = createContext({ analytics: null, storage: null } as FirebaseContextValue);

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  const app = useInjection(FirebaseAppSymbol) as FirebaseApp;

  const [auth, setAuth] = useState(null);
  const [firestore, setFirestore] = useState(null);
  const [storage, setStorage] = useState<FirebaseStorage | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);


  useEffect(() => {

    const analytics = getAnalytics(app);
    const storage = getStorage(app);
    setAnalytics(analytics);
    setStorage(storage);

  }, []);

  const value = {
    analytics,
    storage
  } as FirebaseContextValue;

  return (<FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>);
};
