import { HttpClientImpl } from '@common/http-client-impl';
import { inject } from 'inversify';
import axios, { AxiosError } from 'axios';
import { setupCache } from 'axios-cache-adapter';
import { ApiUrl, ApiUrlSymbol } from '@domain/types/symbols/api-url';
/* eslint-disable @typescript-eslint/no-explicit-any */

export class HttpClientCachedImpl extends HttpClientImpl {
  protected cache: any;
  constructor(@inject<ApiUrl>(ApiUrlSymbol) protected apiUrl: ApiUrl) {
    super(apiUrl);
    this.cache = setupCache({
      maxAge: 24 * 60 * 60 * 1000, // Cache duration: 24 hours in milliseconds
      exclude: {
        query: false,
      },
    });
    this.instance = axios.create({
      baseURL: apiUrl.value,
      adapter: this.cache.adapter,
    });
    this.authToken = localStorage.getItem('authToken');
    this.verify().then();
    this.instance.interceptors.response.use(
      (response: any) => {
        return response.status === 401 ? undefined : response;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }
  clearCache(): void {
    this.cache.store.clear();
  }
  async logout(): Promise<void> {
    await super.logout();
    this.clearCache();
  }

}
