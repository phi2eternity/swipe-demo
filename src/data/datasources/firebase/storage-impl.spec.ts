jest.mock('@firebase/storage', () => {
  return {
    ref: jest.fn(),
    uploadBytes: jest.fn(),
    getDownloadURL: jest.fn(),
    getStorage: jest.fn(),
  }
});
import { getTestContainer } from '@utils/inversion-container-test';
import { interfaces } from 'inversify';
import Container = interfaces.Container;
import { QuickerFirebaseStorageImpl } from '@data/datasources/firebase/storage-impl';
import { QuickerFirebaseStorage } from '@data/datasources/firebase/storage';
import { GetMeUseCase } from '@domain/usecases/customer/get-me';
import { MeMockGenerator } from '@domain/types/__mock__/me-generator';
describe('QuickerFirebaseStorageImpl', () => {
  let container : Container;
  let storage : QuickerFirebaseStorageImpl;
  let meResponseGenerator = new MeMockGenerator();

  beforeAll(() => {
    container = getTestContainer();
    storage = container.get<QuickerFirebaseStorage>(QuickerFirebaseStorage) as QuickerFirebaseStorageImpl;
  });

  beforeEach(()=> {


  });
  afterEach(()=>{
    jest.clearAllMocks();
  })

  it('should be defined', () => {
    expect(storage).toBeDefined();
  });
  it('should upload a file', async () => {
    // mock get me use case
    const getMeUseCase = container.get<GetMeUseCase>(GetMeUseCase);
    const spy = jest.spyOn(getMeUseCase, 'call');
    const meResponse = meResponseGenerator.generateOne();
    spy.mockResolvedValue(meResponse);
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    await storage.uploadProof({ petName: 'test', file, date: new Date() });
  });
});
