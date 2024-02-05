import { FirebaseConfig } from '@domain/types/common/firebase-config';

describe("FirebaseConfig", () => {
  it("should be defined", () => {
    const firebaseConfig: FirebaseConfig = {
      apiKey: "apiKey",
      authDomain: "authDomain",
      projectId: "projectId",
      storageBucket: "storageBucket",
      messagingSenderId: "messagingSenderId",
      appId: "appId",
      measurementId: "measurementId",

    };
    expect(firebaseConfig).toBeDefined();
  });
});
