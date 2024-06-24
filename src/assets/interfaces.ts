export interface MockData {
  photo: string;
  name: string;
  address: string;
  rooms: string;
}

// export interface RoomData {
//   id: number;
//   name: string;
//   price: number;
//   address: string;
//   image_url: string;
// }

export interface RoomData {
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
  image_url: string;
}

export interface SearchBoxProps {
  isOpen: boolean;
}

export interface LocationSelectProps {
  isOpen: boolean;
}

export interface DateSelectProps {
  isOpen: boolean;
}

export interface GuestSelectProps {
  isOpen: boolean;
}
