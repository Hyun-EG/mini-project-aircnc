import { Reservation } from '../assets/interfaces.ts';

const addReservation = async ({
  room,
  userID,
  checkInDate,
  checkOutDate,
}: Reservation) => {
  const reservation = JSON.parse(localStorage.getItem('reservedRoom') || '[]');

  const isConflict = reservation.some((res: Reservation) => {
    const resRoom = res.room.room_id; // 이거 이상하다
    const resCheckIn = new Date(res.checkInDate);
    const resCheckOut = new Date(res.checkOutDate);

    const isOverlapping =
      room.room_id === resRoom &&
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
    room,
    userID,
    checkInDate,
    checkOutDate,
  });

  await new Promise<void>((resolve) => {
    localStorage.setItem('reservedRoom', JSON.stringify(reservation));
    resolve();
  });

  alert('예약이 완료되었습니다.');
};

export default addReservation;
