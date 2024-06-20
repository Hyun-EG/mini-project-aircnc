export interface MockData {
  photo: string;
  name: string;
  address: string;
  rooms: string;
}

export interface RoomData {
  id: number;
  name: string;
  price: number;
  address: string;
  imageUrl: string;
}

export interface RoomDetailData {
  id: number;
  name: string;
  price: number;
  max_capacity: number;
  description: string;
  city: string;
  address: string;
  map_x: number;
  map_y: number;
  created_at: string;
  imageUrl: string;
}
