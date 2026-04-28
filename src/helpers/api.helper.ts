import { APIRequestContext } from '@playwright/test';

export class ApiHelper {
  constructor(private readonly request: APIRequestContext) {}

  async get<T>(url: string, params?: Record<string, string>): Promise<T> {
    const response = await this.request.get(url, { params });
    return response.json() as Promise<T>;
  }

  async post<T>(url: string, body: unknown): Promise<T> {
    const response = await this.request.post(url, { data: body });
    return response.json() as Promise<T>;
  }
}