import { z } from 'zod';

export const CITY_NAME = [
  '서울',
  '부산',
  '울산',
  '인천',
  '대전',
  '경기',
  '제주',
  '강원',
] as const;

export const CityEnum = z.enum(CITY_NAME);

export const RoomSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  maxCapacity: z.number(),
  description: z.string(),
  imageUrl: z.string(),
  city: CityEnum,
  address: z.string(),
  mapX: z.number(),
  mapY: z.number(),
});

export type Room = z.infer<typeof RoomSchema>;
