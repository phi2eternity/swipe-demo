import {ApiUrl, ApiUrlSymbol} from "@domain/types/symbols/api-url";
import {Container} from "inversify";
import 'reflect-metadata';
import {containerBind} from "@utils/common";
import {Credentials} from "@domain/types/common/credentials";
import {CredentialsSymbol} from "@domain/types/TYPES";
import { FirebaseConfig, firebaseConfigSymbol } from '@domain/types/common/firebase-config';

let container: Container;

export const createTestInversion = () => {
  container = new Container();


  container.bind<ApiUrl>(ApiUrlSymbol).toConstantValue({value: process.env.API_URL as string});
  container
    .bind<Credentials>(CredentialsSymbol)
    .toConstantValue({
      username:process.env.API_USERNAME as string,
      password:process.env.API_PASSWORD as string,
    });

  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY as string,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN as string,
    projectId: process.env.FIREBASE_PROJECT_ID as string,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID as string,
    appId: process.env.FIREBASE_APP_ID as string,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID as string,
  }
  container.bind<FirebaseConfig>(firebaseConfigSymbol).toConstantValue(firebaseConfig);

  containerBind(container);
}

export const getTestContainer = () => {
  if (!container) {
    createTestInversion();
    return container;
  }
  return container;
};
