import { Reservation } from '../assets/interfaces.ts';

const addReservation = async ({
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

  const isConflict = reservation.some((res: Reservation) => {
    const resRoom = res.roomID;
    const resCheckIn = new Date(res.checkInDate);
    const resCheckOut = new Date(res.checkOutDate);

    const isOverlapping =
      room.id === resRoom &&
      ((checkInDate < resCheckOut && checkOutDate > resCheckIn) || // 날짜가 겹치는 경우
        (checkInDate <= resCheckIn && checkOutDate >= resCheckOut)); // 완전히 포함하는 경우

    if (isOverlapping && res.userID === userID) {
      alert(`${res.userID}님이 이미 예약하신 숙소입니다 :)`);
      return true;
    }

    if (isOverlapping) {
      alert('타 고객님이 이미 예약하신 숙소입니다. 다른 숙소를 예약해주세요!');
      return true;
    }

    return false;
  });

  if (isConflict) {
    return;
  }

  reservation.push({
    roomID: room.id,
    userID,
    price: totalPrice,
    capacity: 4, // RoomData에는 지금 이게 없긴 하네..
    checkInDate,
    checkOutDate,
    reservationConfirmDate: new Date(),
  });

  await new Promise((resolve) => {
    localStorage.setItem('reservedRoom', JSON.stringify(reservation));
    resolve();
  });

  alert('예약이 완료되었습니다.');
};

export default addReservation;
