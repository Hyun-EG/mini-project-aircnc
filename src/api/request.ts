import { AxiosResponse } from 'axios';
import {
  EmailFormSchemaType,
  FindPasswordFormSchemaType,
  LoginFormSchemaType,
  User,
} from '../schema/userSchema.ts';
import api from './api.ts';
import { CITY_NAME } from '../schema/roomSchema.ts';
import { RoomResponse } from '../assets/interfaces.ts';

export type DateType = `${number}-${number}-${number}`;

export type SimpleRoomResponse = Pick<
  RoomResponse,
  'room_id' | 'name' | 'city' | 'description'
>;

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

export interface RoomResponseData {
  room_response: RoomResponse;
  reserved_date: DateType[];
}

export const getRoom = async (roomId: RoomResponse['room_id']) =>
  await request<RoomResponseData>({
    url: `/rooms/${roomId}`,
    method: 'GET',
  });

export interface RandomRoomRequestParam extends Record<string, number> {
  map_x: number;
  map_y: number;
  radius: number;
}

export interface RandomRoomResponseData {
  room_response_list: SimpleRoomResponse[];
}

export const getRandomRooms = async (params: RandomRoomRequestParam) =>
  await request<RandomRoomResponseData>({
    url: `/rooms/randoms?${Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&')}`,
    method: 'GET',
  });

export interface RoomSearchCity extends Record<string, unknown> {
  capacity: number;
  check_in: DateType;
  check_out: DateType;
  city: (typeof CITY_NAME)[number];
  cursor_id?: number;
}

export interface RoomSearchMap extends Record<string, unknown> {
  capacity: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
  cursor_id?: number;
}

export interface RoomSearchResponseData {
  room_response_list: RoomResponse[];
  last: boolean;
}

export const getRoomSearchCity = async (params: RoomSearchCity) =>
  await request<RoomSearchResponseData>({
    url: `/rooms/city${Object.keys(params).length ? '?' : ''}${Object.keys(
      params,
    )
      .map((key) => `${key}=${params[key]}`)
      .join('&')}`,
    method: 'GET',
  });

export const getRoomSearchMap = async (params: RoomSearchMap) =>
  await request<RoomSearchResponseData>({
    url: `/rooms/map${Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&')}`,
    method: 'GET',
  });

export interface PaymentResponse {
  room_response: SimpleRoomResponse;
  price: number;
  check_in: DateType;
  check_out: DateType;
}

export interface PaymentsResponseData {
  payment_response_list: PaymentResponse[];
}

export const getPayments = async () =>
  await request<PaymentsResponseData>({
    url: '/members/payments',
    method: 'GET',
  });

export const postPayment = async (
  roomId: number,
  payment: {
    price: number;
    capacity: number;
    check_in: string;
    check_out: string;
  },
) =>
  await request<PaymentResponse>({
    url: `/payments/rooms/${roomId}`,
    method: 'POST',
    data: payment,
  });

export interface WishResponse {
  id: number;
  room_response: SimpleRoomResponse;
}

export interface WishesReponseData {
  wish_response_list: WishResponse[];
}

export const getWishes = async () =>
  await request<WishesReponseData>({
    url: '/members/wishes',
    method: 'GET',
  });

export const postWish = async (roomId: RoomResponse['room_id']) =>
  await request({
    url: `/wishes/rooms/${roomId}`,
    method: 'POST',
  });

export const deleteWish = async (
  wishId: WishResponse['id'],
  roomId: RoomResponse['room_id'],
) =>
  await request({
    url: `/wishes/${wishId}/rooms/${roomId}`,
    method: 'DELETE',
  });
