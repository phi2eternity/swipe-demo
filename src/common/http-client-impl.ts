import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { inject, injectable } from 'inversify';
import { ApiUrl, ApiUrlSymbol } from '@domain/types/symbols/api-url';
import { HttpClient } from './http-client';

@injectable()
export class HttpClientImpl implements HttpClient {

  protected instance: AxiosInstance;
  protected authToken: string | null;

  constructor(
    @inject<ApiUrl>(ApiUrlSymbol) protected apiUrl: ApiUrl,
  ) {
    this.instance = axios.create({ baseURL: apiUrl.value });
    this.authToken = localStorage.getItem('authToken');
    if(this.authToken) {
      this.setAuthToken(this.authToken);
    }
    this.verify().then();

    this.instance.interceptors.response.use(
      (response: any) => {
        if (response.status === 401) {
          return;
        } else {
          return response;
        }
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const response = await this.instance.post('/api/auth/customer/login', {
        email,
        password,
      });
      if (response.status === 200) {
        this.setAuthToken(response.data.token);
      }
    } catch (error) {
      throw new Error('Authentication failed');
    }
  }

  async verify(): Promise<boolean> {
    if (!this.authToken) return false;
    try {
      const response = await this.instance.get('/api/auth/customer/verify', {
        headers: {
          Authorization: `Token ${this.authToken}`,
        },
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  public setAuthToken(token: string): void {
    this.authToken = token;
    this.instance.defaults.headers.common['Authorization'] = `Token ${token}`;
    localStorage.setItem('authToken', token);
    // Set the token's expiration time
    const expiresIn = 4 * 24 * 60 * 60 * 1000; // 4 days in milliseconds
    const expirationTime = new Date().getTime() + expiresIn;
    localStorage.setItem('authTokenExpiration', expirationTime.toString());
  }

  public purgeAuthToken(): void {
    this.authToken = null;
    delete this.instance.defaults.headers.common['Authorization'];
    localStorage.removeItem('authToken');
    localStorage.removeItem('authTokenExpiration');
  }

  get<Response = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Response>> {
    return this.instance.get<Response>(url, config);
  }

  post<Request = any, Response = any>(
    url: string,
    data?: Request,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Response>> {
    return this.instance.post<Response>(url, data, config);
  }

  put<Request = any, Response = any>(
    url: string,
    data?: Request,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Response>> {
    return this.instance.put<Response>(url, data, config);
  }

  delete<Response = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Response>> {
    return this.instance.delete<Response>(url, config);
  }

  patch<Request = any, Response = any>(
    url: string,
    data?: Request,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Response>> {
    return this.instance.patch<Response>(url, data, config);
  }

  logout(): Promise<void> {
    this.purgeAuthToken();
    return Promise.resolve();
  }

  isTokenExpired(): boolean {
    const expirationTime = localStorage.getItem('authTokenExpiration');
    if (!expirationTime) return true;

    return new Date().getTime() > parseInt(expirationTime, 10);
  }
}
