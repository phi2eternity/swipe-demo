import { faker } from '@faker-js/faker';
import {AuthenticationResponse} from '@domain/types/responses/authentication';
import {injectable} from 'inversify';
import { MockGenerator } from '@domain/types/__mock__/mock-generator';
import { MeMockGenerator } from '@domain/types/__mock__/me-generator';

@injectable()
export class AuthenticationResponseMockGenerator extends MockGenerator<AuthenticationResponse>{
  private meMockGenerator = new MeMockGenerator();

  generateMany(count: number): AuthenticationResponse[] {
    return new Array(count).fill(null).map(() => this.generateOne());
  }

  generateOne(): AuthenticationResponse {

    return {
      token: faker.datatype.uuid(),
      profile: this.meMockGenerator.generateOne(),
    };
  }

}
