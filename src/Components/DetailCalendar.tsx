import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store.ts';
import CalendarComponent from './Header/Calendar.tsx';
import {
  setCheckInDate,
  setCheckOutDate,
} from '../redux/slices/searchSlice.ts';
import isDateConflict from '../util/dateUtils.ts';

const CardContainer = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  @media (max-width: 768px) {
    width: 60%;
  }
`;

const CalendarContainer = styled.div`
  width: 100%;
  min-height: 50vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: absolute;
`;

const CustomCalendar = styled(CalendarComponent)`
  padding: 3vh;
  border: 1px solid lightgrey;
  position: static;
  top: auto;
  visibility: visible;
`;

export default function DetailCalendar() {
  const dispatch = useDispatch();
  const selectedRoom = useSelector(
    (state: RootState) => state.rooms.selectedRoom,
  );
  const checkInDate = useSelector(
    (state: RootState) => state.search.checkInDate,
  );
  const checkOutDate = useSelector(
    (state: RootState) => state.search.checkOutDate,
  );

  if (!selectedRoom) {
    return <h1>Loading...</h1>;
  }

  const handleDateChange = (date: Date) => {
    if (!checkInDate || (checkInDate && checkOutDate)) {
      dispatch(setCheckInDate(date));
      dispatch(setCheckOutDate(null));
    } else if (date > checkInDate) {
      const reservations = JSON.parse(
        localStorage.getItem('reservedRoom') || '[]',
      );
      const isConflict = isDateConflict(
        checkInDate,
        date,
        reservations, // 현재까지 예약된 방 정보
        selectedRoom.id,
      );
      if (isConflict) {
        alert('이미 예약된 날자가 포함되어 있습니다.');
      } else {
        dispatch(setCheckOutDate(date));
      }
    } else {
      dispatch(setCheckInDate(date));
      dispatch(setCheckOutDate(null));
    }
  };

  return (
    <CardContainer>
      <CalendarContainer>
        <CustomCalendar
          isOpen
          onDateChange={handleDateChange}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
        />
      </CalendarContainer>
    </CardContainer>
  );
}
