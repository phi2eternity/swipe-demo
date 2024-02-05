import {CapacityRemoteDataSource} from "@data/datasources/capacity/capacity-remote-data-source";
import {CapacityRemoteDataSourceImpl} from "@data/datasources/capacity/capacity-remote-data-source-impl";
import {CapacityRepository} from "@domain/repositories/capacity-repository";
import {CapacityRepositoryImpl} from "@data/repositories/capacity/repository-impl";
import {HttpClient} from "@quicker/common/http-client";
import {HttpClientImpl} from "@quicker/common/http-client-impl";
import {AvailableRepository} from "@domain/repositories/available-repository";
import {AvailableRepositoryImpl} from "@data/repositories/available/repository-impl";
import {AvailableRemoteDataSource} from "@data/datasources/available/remote-data-source";
import {AvailableRemoteDataSourceImpl} from "@data/datasources/available/remote-data-source-impl";
import {CustomerRemoteDataSource} from "@data/datasources/customer/remote-data-source";
import {CustomerRemoteDataSourceImpl} from "@data/datasources/customer/remote-data-source-impl";
import {CustomerRepository} from "@domain/repositories/customer";
import {CustomerRepositoryImpl} from "@data/repositories/customer";
import {Container} from "inversify";
import {BranchRemoteDataSource} from "@data/datasources/branch/remote-data-source";
import {BranchLocalDataSource} from "@data/datasources/branch/local-data-source";
import {BranchRemoteDataSourceImpl} from "@data/datasources/branch/remote-data-source-impl";
import {BranchLocalDataSourceImpl} from "@data/datasources/branch/local-data-source-impl";
import {GetMonthlyCapacityUseCase} from "@domain/usecases/capacity/get-monthly-capacity";
import {GetAvailableSlotsUseCase} from "@domain/usecases/available/get-available-slots";
import {GetMeUseCase} from "@domain/usecases/customer/get-me";
import {BranchRepositoryImpl} from "@data/repositories/branch/repository-impl";
import {BranchRepository} from "@domain/repositories/branch/repository";
import {GetAllBranchesUseCase} from "@domain/usecases/branch/get-all-branches";
import {EmployeeRemoteDataSource} from "@data/datasources/employee/remote-data-source";
import {EmployeeRemoteDataSourceImpl} from "@data/datasources/employee/remote-data-source-impl";
import {EmployeeRepository} from "@domain/repositories/employee/repository";
import {EmployeeRepositoryImpl} from "@data/repositories/employee/repository-impl";
import {GetAllGroomersUseCase} from "@domain/usecases/employee/get-all-groomers-use-case";
import {
  AppointmentCacheProvider, CreditCardCacheProvider,
  FirebaseAppSymbol, FirebaseStorageSymbol, HttpClientCachedSymbol,
  HttpClientSymbol,
  PetDetailsCacheProvider,
} from '@domain/types/TYPES';
import { CapacityLocalDataSource } from '@data/datasources/capacity/local-data-source';
import { CapacityLocalDataSourceImpl } from '@data/datasources/capacity/local-data-source-impl';
import { ProductRemoteDataSource } from '@data/datasources/product/remote-data-source';
import { ProductRemoteDataSourceImpl } from '@data/datasources/product/remote-data-source-impl';
import { ProductLocalDataSource } from '@data/datasources/product/local-data-source';
import { ProductLocalDataSourceImpl } from '@data/datasources/product/local-data-source-impl';
import { ProductRepository } from '@domain/repositories/product/repository';
import { ProductRepositoryImpl } from '@data/repositories/product/repository-impl';
import { GetAllProductsUseCase } from '@domain/usecases/product/get-all-products';
import {CustomerSignupUseCase}  from '@domain/usecases/customer/signup';
import {CustomerLoginUseCase} from '@domain/usecases/customer/login';
import { CustomerGetAllAppointmentsUseCase } from '@domain/usecases/customer/all-appointments';
import { CustomerGetAllPetsUseCase } from '@domain/usecases/customer/get-all-pets';
import { AppointmentRemoteDataSource } from '@data/datasources/appointment/index.remote';
import { AppointmentRemoteDataSourceImpl } from '@data/datasources/appointment/index.remote-impl';
import { AppointmentRepositoryImpl } from '@data/repositories/appointment';
import { AppointmentRepository } from '@domain/repositories/appointment';
import { CreateAppointmentUseCase } from '@domain/usecases/appointment/create-appointment';
import { CancelAppointmentUseCase } from '@domain/usecases/appointment/cancel-appointment';
import { CustomerGetUpcomingAppointmentsUseCase } from '@domain/usecases/customer/upcoming-appointments';
import { CustomerGetPastAppointmentsUseCase } from '@domain/usecases/customer/past-appointments';
import { CustomerCreatePetUseCase } from '@domain/usecases/customer/create-pet';
import { AppointmentEntity } from '@domain/types/common/appointment';
import { CacheProvider } from '@quicker/common/cache-provider';
import { IndexedDbCache } from '@quicker/common/indexed-db';
import { PetDetailsEntity } from '@domain/types/common/pet-details';
import { AppointmentLocalDataSourceImpl } from '@data/datasources/appointment/index.local-impl';
import { AppointmentLocalDataSource } from '@data/datasources/appointment/index.local';
import { CustomerLocalDataSource } from '@data/datasources/customer/local-data-source';
import { CustomerLocalDataSourceImpl } from '@data/datasources/customer/local-data-source-impl';
import { initializeApp,FirebaseApp } from '@firebase/app';
import { FirebaseConfig, firebaseConfigSymbol } from '@domain/types/common/firebase-config';
import { FirebaseStorage, getStorage } from '@firebase/storage';
import { QuickerFirebaseStorage } from '@data/datasources/firebase/storage';
import { QuickerFirebaseStorageImpl } from '@data/datasources/firebase/storage-impl';
import { PaymentRemoteDataSource } from '@data/datasources/payment/index.remote';
import { PaymentRemoteDataSourceImpl } from '@data/datasources/payment/index.remote.impl';
import { PaymentRepository } from '@domain/repositories/payment';
import { PaymentRepositoryImpl } from '@data/repositories/payment';
import { PaymentCreateCreditCardUseCase } from '@domain/usecases/payment/create-credit-card';
import { PaymentListCreditCardsUseCase } from '@domain/usecases/payment/list-credit-cards';
import { PaymentDeleteCreditCardUseCase } from '@domain/usecases/payment/delete-credit-card';
import { PaymentLocalDataSource } from '@data/datasources/payment/index.local';
import { PaymentLocalDataSourceImpl } from '@data/datasources/payment/index.local.impl';
import { CreditCardRecord } from '@domain/types/common/credit-card';
import { HttpClientMockImpl } from '@common/http-client-mock.impl';
import { configurePayloads } from '@common/configure-payloads';

export const containerBind = (container:Container) => {
  container.bind<CapacityRemoteDataSource>(CapacityRemoteDataSource).to(CapacityRemoteDataSourceImpl);
  container.bind<CapacityRepository>(CapacityRepository).to(CapacityRepositoryImpl);
  container.bind<GetMonthlyCapacityUseCase>(GetMonthlyCapacityUseCase).toSelf();
  //container.bind<HttpClient>(HttpClientSymbol).to(HttpClientImpl).inSingletonScope();
  const httpClient = new HttpClientMockImpl();
  configurePayloads(httpClient);
  container.bind<HttpClient>(HttpClientSymbol).toConstantValue(httpClient);
  container.bind<AvailableRepository>(AvailableRepository).to(AvailableRepositoryImpl);
  container.bind<AvailableRemoteDataSource>(AvailableRemoteDataSource).to(AvailableRemoteDataSourceImpl);
  container.bind<GetAvailableSlotsUseCase>(GetAvailableSlotsUseCase).toSelf();
  container.bind<CustomerRemoteDataSource>(CustomerRemoteDataSource).to(CustomerRemoteDataSourceImpl).inSingletonScope();
  container.bind<CustomerRepository>(CustomerRepository).to(CustomerRepositoryImpl);
  container.bind<GetMeUseCase>(GetMeUseCase).toSelf().inSingletonScope();

  container.bind<BranchRepository>(BranchRepository).to(BranchRepositoryImpl).inSingletonScope();
  container.bind<BranchRemoteDataSource>(BranchRemoteDataSource).to(BranchRemoteDataSourceImpl).inSingletonScope();
  container.bind<BranchLocalDataSource>(BranchLocalDataSource).to(BranchLocalDataSourceImpl).inSingletonScope();
  container.bind<GetAllBranchesUseCase>(GetAllBranchesUseCase).toSelf().inSingletonScope();

  container.bind<EmployeeRemoteDataSource>(EmployeeRemoteDataSource).to(EmployeeRemoteDataSourceImpl);
  container.bind<EmployeeRepository>(EmployeeRepository).to(EmployeeRepositoryImpl);
  container.bind<GetAllGroomersUseCase>(GetAllGroomersUseCase).toSelf();

  container.bind<CapacityLocalDataSource>(CapacityLocalDataSource).to(CapacityLocalDataSourceImpl);

  container.bind<ProductRemoteDataSource>(ProductRemoteDataSource).to(ProductRemoteDataSourceImpl);
  container.bind<ProductLocalDataSource>(ProductLocalDataSource).to(ProductLocalDataSourceImpl);
  container.bind<ProductRepository>(ProductRepository).to(ProductRepositoryImpl);
  container.bind<GetAllProductsUseCase>(GetAllProductsUseCase).toSelf();
  container.bind<CustomerSignupUseCase>(CustomerSignupUseCase).toSelf();
  container.bind<CustomerLoginUseCase>(CustomerLoginUseCase).toSelf();
  container.bind<CustomerGetAllAppointmentsUseCase>(CustomerGetAllAppointmentsUseCase).toSelf();
  container.bind<CustomerGetAllPetsUseCase>(CustomerGetAllPetsUseCase).toSelf();

  container.bind<AppointmentRemoteDataSource>(AppointmentRemoteDataSource).to(AppointmentRemoteDataSourceImpl).inSingletonScope();
  container.bind<AppointmentRepository>(AppointmentRepository).to(AppointmentRepositoryImpl).inSingletonScope();
  container.bind<CreateAppointmentUseCase>(CreateAppointmentUseCase).toSelf();
  container.bind<CancelAppointmentUseCase>(CancelAppointmentUseCase).toSelf();
  container.bind<CustomerGetUpcomingAppointmentsUseCase>(CustomerGetUpcomingAppointmentsUseCase).toSelf();
  container.bind<CustomerGetPastAppointmentsUseCase>(CustomerGetPastAppointmentsUseCase).toSelf();
  container.bind<CustomerCreatePetUseCase>(CustomerCreatePetUseCase).toSelf();


  container.bind<AppointmentLocalDataSource>(AppointmentLocalDataSource).to(AppointmentLocalDataSourceImpl).inSingletonScope();
  container.bind<CustomerLocalDataSource>(CustomerLocalDataSource).to(CustomerLocalDataSourceImpl).inSingletonScope();
  container.bind<CacheProvider<AppointmentEntity>>(AppointmentCacheProvider).toDynamicValue(
    () =>
      new IndexedDbCache<AppointmentEntity>({
        dbName: 'appointment',
        storeName: 'appointments',
      }),
  )
    .inSingletonScope();

  container.bind<CacheProvider<PetDetailsEntity>>(PetDetailsCacheProvider).toDynamicValue(
    () =>
      new IndexedDbCache<PetDetailsEntity>({
        dbName: 'pet-details',
        storeName: 'pet-details',
      }),
  ).inSingletonScope();
  const firebaseConfig = container.get<FirebaseConfig>(firebaseConfigSymbol);
  const firebaseApp = initializeApp(firebaseConfig)
  container.bind<FirebaseApp>(FirebaseAppSymbol).toConstantValue(firebaseApp);
  const storage = getStorage(firebaseApp);
  container.bind<FirebaseStorage>(FirebaseStorageSymbol).toConstantValue(storage);

  container.bind<QuickerFirebaseStorage>(QuickerFirebaseStorage).to(QuickerFirebaseStorageImpl).inSingletonScope();

  container.bind<PaymentLocalDataSource>(PaymentLocalDataSource).to(PaymentLocalDataSourceImpl).inSingletonScope();
  container.bind<CacheProvider<CreditCardRecord>>(CreditCardCacheProvider).toDynamicValue(
    () =>
      new IndexedDbCache<CreditCardRecord>({
        dbName: 'credit-card',
        storeName: 'credit-card',
      })).inSingletonScope();
  container.bind<PaymentRemoteDataSource>(PaymentRemoteDataSource).to(PaymentRemoteDataSourceImpl).inSingletonScope();
  container.bind<PaymentRepository>(PaymentRepository).to(PaymentRepositoryImpl).inSingletonScope();
  container.bind<PaymentCreateCreditCardUseCase>(PaymentCreateCreditCardUseCase).toSelf().inSingletonScope();
  container.bind<PaymentListCreditCardsUseCase>(PaymentListCreditCardsUseCase).toSelf().inSingletonScope();
  container.bind<PaymentDeleteCreditCardUseCase>(PaymentDeleteCreditCardUseCase).toSelf().inSingletonScope();

}
