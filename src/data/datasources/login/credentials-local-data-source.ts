import {LocalDataSource} from "@data/datasources/local-data-source";
import {injectable} from "inversify";
import {Credentials} from "@domain/types/common/credentials";


@injectable()
export abstract class CredentialsLocalDataSource implements LocalDataSource{

  abstract setCredentials(credentials : Credentials): void;
  abstract getCredentials(): Credentials | null;
}
