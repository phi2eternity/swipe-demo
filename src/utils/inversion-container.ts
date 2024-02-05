import { ApiUrl, ApiUrlSymbol } from "@domain/types/symbols/api-url";
import { Container } from "inversify";
import {containerBind} from "@utils/common";
import {CredentialsSymbol} from "@domain/types/TYPES";
import {Credentials} from "@domain/types/common/credentials";
import { FirebaseConfig, firebaseConfigSymbol } from '@domain/types/common/firebase-config';

let container: Container;

export const createInversion = () => {
  container = new Container();

  container
    .bind<ApiUrl>(ApiUrlSymbol)
    .toConstantValue({ value: import.meta.env.VITE_API_URL as string });

  const credentials = {
    username:import.meta.env.VITE_API_USERNAME as string,
    password:import.meta.env.VITE_API_PASSWORD as string,
  } as Credentials;
  container
    .bind<Credentials>(CredentialsSymbol)
    .toConstantValue(credentials);


  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
    appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string,
  }
  container.bind<FirebaseConfig>(firebaseConfigSymbol).toConstantValue(firebaseConfig);

  containerBind(container);
};

export const getContainer = () => {
  if (!container) {
    createInversion();
    return container;
  }
  return container;
};
