import { UploadProofRequest } from '@domain/types/requests/firebase/upload-proof';

describe('UploadProofRequest', () => {
  it('should be defined', () => {
    const data = {
      petName: 'petName',
      file: new File([], 'filename'),
      date: new Date(),
    } as UploadProofRequest;
    expect(data).toBeDefined();
  });
});
