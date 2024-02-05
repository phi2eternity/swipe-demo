import { QuickerFirebaseStorage } from '@data/datasources/firebase/storage';
import {  FirebaseStorageSymbol } from '@domain/types/TYPES';
import { inject, injectable } from 'inversify';
import { GetMeUseCase } from '@domain/usecases/customer/get-me';
import { UploadProofRequest } from '@domain/types/requests/firebase/upload-proof';
import { FirebaseStorage,ref, uploadBytes, getDownloadURL } from '@firebase/storage';

@injectable()
export class QuickerFirebaseStorageImpl implements QuickerFirebaseStorage {
  constructor(@inject(FirebaseStorageSymbol) private storage: FirebaseStorage, @inject(GetMeUseCase) private getMeUseCase: GetMeUseCase) {

  }

  async uploadProof({ petName, file, date }: UploadProofRequest): Promise<string> {
    const currentUser = await this.getMeUseCase.call();
    const userId = currentUser.id;

    const convertedDate = date.toLocaleDateString().split('/').join('_');
    const path = `user_data/${userId}/${petName}/vaccine_proof_${convertedDate}.pdf`;
    const storageRef = ref(this.storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

}
