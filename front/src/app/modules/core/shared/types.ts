/**
 * Created by @gusleein (Andrey Sanatullov)
 * https://github.com/gusleein
 *
 * on 11.7.18
 */

export interface FilterOptions {
  limit: number;
  skip: number;
  from: number;
  to: number; // Math.floor(Date.now() / 1000)
}

export interface PagingList<T> {
  total: number;
  list: T[];
}

export interface RouteParams {
  id: string
}

export interface UserClient {
  cid: string;
  type: string;
  os: string;
  v: string;
  last_access: number;
  app: string;
  device: string;
}

export interface UserClientData {
  lang: string;
  v: string;
  os: string;
}