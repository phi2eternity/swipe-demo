import { MeResponse } from '@domain/types/responses/me-response';

export interface AuthenticationResponse {
  token: string;
  profile:MeResponse
}
