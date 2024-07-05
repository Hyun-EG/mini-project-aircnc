import { AxiosResponse } from 'axios';
import {
  EmailFormSchemaType,
  FindPasswordFormSchemaType,
  LoginFormSchemaType,
  User,
} from '../schema/userSchema.ts';
import api from './api.ts';
import { CITY_NAME } from '../schema/roomSchema.ts';

type FetchMethod = 'GET' | 'POST' | 'DELETE';

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

interface RequestArguments<T> {
  url: string;
  method: FetchMethod;
  data?: T;
}

const request = async <T, K = unknown>({
  url,
  method,
  data,
}: RequestArguments<K>) =>
  (await api.request({
    url,
    method,
    data,
  })) as AxiosResponse<ResponseData<T>>['data'];

export const getEmailValidation = async (email: EmailFormSchemaType['email']) =>
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

export const getRoom = async (id: number) =>
  await request({
    url: `/rooms/${id}`,
    method: 'GET',
  });

export const getRandomRooms = async () =>
  await request({
    url: '/rooms/randoms',
    method: 'GET',
  });

// 룸 조건 검색은 파라미터가 복잡해서 임시로 만든 것임
type DateType = `${number}-${number}-${number}`;

interface RoomSearchCity extends Record<string, unknown> {
  capacity?: number;
  check_in?: DateType;
  check_out?: DateType;
  city?: (typeof CITY_NAME)[number];
  cursor_id?: number;
}

interface RoomSearchMap extends Record<string, unknown> {
  capacity?: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
  cursor_id?: number;
}

export const getRoomSearchCity = async (params: RoomSearchCity) =>
  await request({
    url: `/rooms/city${Object.keys(params).length ? '?' : ''}${Object.keys(
      params,
    )
      .map((key) => `key=${params[key]}`)
      .join('&')}`,
    method: 'GET',
  });

export const getRoomSearchMap = async (params: RoomSearchMap) =>
  await request({
    url: `/rooms/map${Object.keys(params)
      .map((key) => `key=${params[key]}`)
      .join('&')}`,
    method: 'GET',
  });

export const getPayments = async () =>
  await request({
    url: '/members/payments',
    method: 'GET',
  });

export const postPayment = async (roomId: number, payment: unknown) =>
  await request({
    url: `/payments/rooms/${roomId}`,
    method: 'POST',
    data: payment,
  });

export const getWishes = async () =>
  await request({
    url: '/members/wishes',
    method: 'GET',
  });

export const postWish = async (id: number) =>
  await request({
    url: `/wishes/rooms/${id}`,
    method: 'POST',
  });

export const deleteWish = async (wishId: number, roomId: number) =>
  await request({
    url: `/wishes/${wishId}/rooms/${roomId}`,
    method: 'DELETE',
  });
