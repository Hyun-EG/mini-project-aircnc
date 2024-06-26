import { Reservation } from '../assets/interfaces.ts';

const addReservation = ({
  room,
  userID,
  checkInDate,
  checkOutDate,
}: Reservation) => {
  const reservation = JSON.parse(localStorage.getItem('reservedRoom') || '[]');
  const pricePerNight = room.price;
  const nights =
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24);
  const totalPrice = pricePerNight * nights;
  reservation.push({
    roomID: room.id,
    userID,
    price: totalPrice,
    capacity: 4, // RoomData에는 지금 이게 없긴 하네..
    checkInDate,
    checkOutDate,
    reservationConfirmDate: new Date(),
  });
  localStorage.setItem('reservedRoom', JSON.stringify(reservation));
};

export default addReservation;
