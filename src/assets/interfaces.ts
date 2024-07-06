export interface MockData {
  photo: string;
  name: string;
  address: string;
  rooms: string;
}

export interface RoomResponse {
  room_id: number;
  name: string;
  max_capacity: number;
  map_x: number;
  map_y: number;
  image_url: string;
  address: string;
  city: string;
  description: string;
  price: number;
  order?: number;
}

export interface RoomDetailData {
  id: number; // (room_id)
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

export interface Toggleable {
  isOpen: boolean;
}

export interface SearchBoxProps extends Toggleable {}
export interface LocationSelectProps extends Toggleable {}
export interface DateSelectProps extends Toggleable {}
export interface GuestSelectProps extends Toggleable {}
export interface CalendarProps extends Toggleable {
  onDateChange: (date: Date) => void;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  className?: string;
}

export interface Reservation {
  room: RoomResponse;
  price: number;
  checkInDate: Date;
  checkOutDate: Date;
}

export interface Wishlist {
  roomID: number;
  userID: string;
  image_url: string;
}
