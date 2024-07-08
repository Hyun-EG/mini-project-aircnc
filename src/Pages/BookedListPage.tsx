import { useState, useEffect } from 'react';
import styled from 'styled-components';
import formatNumber from '../util/formatNumber.ts';
import { usePayments } from '../hooks/payment.tsx';
import { PaymentResponse } from '../api/request.ts';

const BookedListContainer = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 10vh;
`;

const BookedListBody = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 15vh;
`;

const BookedListTitle = styled.div`
  font-size: 4vh;
  font-weight: 400;
`;

const SeparationLine = styled.div`
  width: 100%;
  height: 0.1px;
  margin: 2rem 0;
  background-color: lightgrey;
`;

const ReserTitleContainer = styled.div`
  width: 100%;
  height: 7vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReserTitleRoom = styled.div`
  width: 40%;
  height: 4vh;
  margin-right: 1vh;
  padding-left: 2vh;
  border-right: 1px solid lightgrey;
  display: flex;
  align-items: center;
`;

const ReserTitleDate = styled.div`
  width: 20%;
  height: 4vh;
  border-right: 1px solid lightgrey;
  margin-right: 1vh;
  display: flex;
  align-items: center;
`;

const ReserTitlePrice = styled.div`
  width: 20%;
  height: 4vh;
  display: flex;
  align-items: center;
`;

const ReserCotentContainer = styled.div`
  width: 100%;
  height: 7vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReserContentRoom = styled.div`
  width: 40%;
  height: 4vh;
  margin-right: 1vh;
  padding-left: 2vh;
  display: flex;
  align-items: center;
`;

const ReserContentDate = styled.div`
  width: 20%;
  height: 4vh;
  margin-right: 1vh;
  display: flex;
  align-items: center;
`;

const ReserContentPrice = styled.div`
  width: 20%;
  height: 4vh;
  display: flex;
  align-items: center;
`;

const ReserCancelBtn = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: red;
`;

interface ReservationRowProps {
  reservation: PaymentResponse;
  onCancel: () => void;
}

function ReservationRow({ reservation, onCancel }: ReservationRowProps) {
  const formatDate = (date: Date) => {
    const formattedDate = date.toLocaleDateString().replace(/\.$/, '');
    return formattedDate;
  };

  return (
    <ReserCotentContainer>
      <ReserContentRoom>{reservation.room_response.name}</ReserContentRoom>
      <ReserContentDate>
        {formatDate(new Date(reservation.check_in))} -{' '}
        {formatDate(new Date(reservation.check_out))}
      </ReserContentDate>
      <ReserContentPrice>{formatNumber(reservation.price)}</ReserContentPrice>
      <ReserCancelBtn onClick={onCancel}>예약취소</ReserCancelBtn>
    </ReserCotentContainer>
  );
}

function BookedListPage() {
  const { data: reservations, isLoading, isError } = usePayments();
  const [localReservations, setLocalReservations] = useState<PaymentResponse[]>(
    [],
  );

  useEffect(() => {
    if (reservations) {
      setLocalReservations(reservations);
    }
  }, [reservations]);

  const handleCancel = (roomId: number) => {
    setLocalReservations((prevReservations) =>
      prevReservations.filter(
        (reservation) => reservation.room_response.room_id !== roomId,
      ),
    );
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error!</h1>;
  }

  if (!localReservations.length) {
    return (
      <div>
        <BookedListContainer>
          <BookedListBody>
            <BookedListTitle>예약 목록</BookedListTitle>
          </BookedListBody>
          <SeparationLine />
          <p>예약된 내역이 없습니다.</p>
        </BookedListContainer>
      </div>
    );
  }

  return (
    <div>
      <BookedListContainer>
        <BookedListBody>
          <BookedListTitle>예약 목록</BookedListTitle>
        </BookedListBody>
        <SeparationLine />
        <ReserTitleContainer>
          <ReserTitleRoom>방 이름</ReserTitleRoom>
          <ReserTitleDate>날짜</ReserTitleDate>
          <ReserTitlePrice>가격</ReserTitlePrice>
        </ReserTitleContainer>
        {localReservations.map((reservation) => (
          <ReservationRow
            key={
              reservation.room_response.room_id.toString() +
              reservation.check_in.toString().replace(/-/g, '') +
              reservation.check_out.toString().replace(/-/g, '')
            }
            reservation={reservation}
            onCancel={() => handleCancel(reservation.room_response.room_id)}
          />
        ))}
      </BookedListContainer>
    </div>
  );
}

export default BookedListPage;
