

import { HttpClient } from '@common/http-client';
import { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { injectable } from 'inversify';

@injectable()
export class HttpClientMockImpl implements HttpClient {
  private authToken: string | null = null;
  private timeout: number = 250;
  private responses: Map<string, AxiosResponse> = new Map<string, AxiosResponse>();
  constructor(timeout: number = 250) {
    this.timeout = timeout;
  }

  public purgeAuthToken(): void {
    this.authToken = null;
  }
  public setAuthToken(token: string): void {
    this.authToken = token;
  }
  async logout(): Promise<void> {
    this.purgeAuthToken();
  }
  public isTokenExpired(): boolean {
    return !!this.authToken;
  }
  async login(username?: string, password?: string): Promise<any> {
  }
  public verify(): Promise<boolean> {
    return Promise.resolve(!!this.authToken);
  }

  static getNotFoundResponse(): AxiosResponse {
    return {
      data: {},
      status: 404,
      statusText: 'Not Found',
      headers: {},
      config: {} as InternalAxiosRequestConfig<any>,
      request: {},
    };
  }
  get<Response = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Response>> {
    const response = this.responses.get(`${'GET'}:${url}`) ?? HttpClientMockImpl.getNotFoundResponse();
    return Promise.resolve(response);
  }
  post<Request = any, Response = any>(
    url: string,
    data?: Request,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Response>> {
    const response = this.responses.get(`${'POST'}:${url}`) ?? HttpClientMockImpl.getNotFoundResponse();
    return Promise.resolve(response);
  }
  put<Request = any, Response = any>(
    url: string,
    data?: Request,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Response>> {
    const response = this.responses.get(`${'PUT'}:${url}`) ?? HttpClientMockImpl.getNotFoundResponse();
    return Promise.resolve(response);
  }
  delete<Response = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Response>> {
    const response = this.responses.get(`${'DELETE'}:${url}`) ?? HttpClientMockImpl.getNotFoundResponse();
    return Promise.resolve(response);
  }
  patch<Request = any, Response = any>(
    url: string,
    data?: Request,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Response>> {
    const response = this.responses.get(`${'PATCH'}:${url}`) ?? HttpClientMockImpl.getNotFoundResponse();
    return Promise.resolve(response);
  }

  wait(ms?: number): Promise<void> {
    const waitTime = ms ?? this.timeout;
    return new Promise((resolve) => {
      setTimeout(resolve, waitTime);
    });
  }

  configure(method:string,url: string, responseData?: object): void {
    const response = responseData ? {data: responseData, status: 200, statusText: 'OK', headers: {}, config: {}, request: {}} as AxiosResponse : null;
    this.responses.set(`${method}:${url}`, response as AxiosResponse);
  }
}
