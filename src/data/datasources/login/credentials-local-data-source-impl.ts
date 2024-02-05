import {CredentialsLocalDataSource} from "@data/datasources/login/credentials-local-data-source";
import {inject, injectable} from "inversify";
import {Credentials} from "@domain/types/common/credentials";
import {CredentialsSymbol} from "@domain/types/TYPES";

@injectable()
export class CredentialsLocalDataSourceImpl implements CredentialsLocalDataSource {

  constructor(@inject(CredentialsSymbol) private readonly credentials: Credentials) {
    this.credentials = credentials;
  }

  setCredentials(credentials: Credentials): void {
    localStorage.setItem("credentials", JSON.stringify(Object.assign(credentials, {
      username: this.credentials.username, password: this.credentials.password,
    })));

  };

  getCredentials(): Credentials | null {
    const credentials = localStorage.getItem("credentials");
    return credentials ? JSON.parse(credentials) : null;
  }
}
