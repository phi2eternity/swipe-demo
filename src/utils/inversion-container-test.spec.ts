import {getTestContainer} from "@utils/inversion-container-test";
import {ApiUrl, ApiUrlSymbol} from "@domain/types/symbols/api-url";
import { FirebaseConfig, firebaseConfigSymbol } from '@domain/types/common/firebase-config';

describe("Inversion container", () => {
  it("should create a container", () => {
    const container = getTestContainer();
    expect(container).toBeDefined();
  });

  it("should contain API_URL.", () => {
    const container = getTestContainer();
    const apiUrl: ApiUrl = container.get(ApiUrlSymbol);
    expect(apiUrl).toBeDefined();
    expect(apiUrl.value).toBeDefined();
  });

  it("should contain FIREBASE_API_KEY.", () => {
    const container = getTestContainer();
    const firebaseConfig: FirebaseConfig = container.get(firebaseConfigSymbol);
    expect(firebaseConfig).toBeDefined();
    expect(firebaseConfig.apiKey).toBeDefined();
  });
});
