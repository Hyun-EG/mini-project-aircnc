import { Reservation } from '../assets/interfaces.ts';

const isDateConflict = (
  checkInDate: Date,
  checkOutDate: Date,
  reservations: Reservation[],
  roomID: number,
): boolean => {
  return reservations.some((res: Reservation) => {
    const resRoom = res.room.room_id;
    const resCheckIn = new Date(res.checkInDate);
    const resCheckOut = new Date(res.checkOutDate);

    const isOverlapping =
      roomID === resRoom &&
      ((checkInDate < resCheckOut && checkOutDate > resCheckIn) || // 날짜가 겹치는 경우
        (checkInDate <= resCheckIn && checkOutDate >= resCheckOut)); // 완전히 포함하는 경우

    return isOverlapping;
  });
};

export default isDateConflict;
