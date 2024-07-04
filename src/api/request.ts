import { AxiosResponse } from 'axios';
import {
  EmailFormSchemaType,
  FindPasswordFormSchemaType,
  LoginFormSchemaType,
  User,
} from '../schema/userSchema.ts';
import api from './api.ts';

type FetchMethod = 'GET' | 'POST';

const RESULT_CODE = [200, 4000, 4001, 4002, 4003, 4004] as const;

type ResultCode = (typeof RESULT_CODE)[number];

interface ResponseResult {
  result_code: ResultCode;
  result_message: string;
}

interface ResponseData<T> {
  result: ResponseResult;
  body: T;
  valid: null;
}

interface RequestArgs<T> {
  url: string;
  method: FetchMethod;
  data?: T;
  setToken?: boolean;
}

const request = async <T, K = unknown>({ url, method, data }: RequestArgs<K>) =>
  (await api.request({
    url,
    method,
    data,
  })) as AxiosResponse<ResponseData<T>>['data'];

export const getValidateEmail = async (email: EmailFormSchemaType['email']) =>
  await request({
    url: `/auth/email/${email}`,
    method: 'GET',
  });

export const postLogIn = async (
  user: EmailFormSchemaType & LoginFormSchemaType,
) =>
  await request({
    url: '/auth/login',
    method: 'POST',
    data: user,
  });

export const postSignUp = async (user: User) =>
  await request({
    url: '/auth/signup',
    method: 'POST',
    data: user,
  });

export const postFindPassword = async (
  user: EmailFormSchemaType & FindPasswordFormSchemaType,
) =>
  await request<string>({
    url: '/auth/help',
    method: 'POST',
    data: user,
  });
