import { RemoteDataSource } from '@data/datasources/remote-data-source';
import { injectable } from 'inversify';
import { UploadProofRequest } from '@domain/types/requests/firebase/upload-proof';

@injectable()
export abstract class QuickerFirebaseStorage extends RemoteDataSource {
  abstract uploadProof(params:UploadProofRequest): Promise<string>;
}
