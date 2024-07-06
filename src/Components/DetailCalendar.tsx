import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store.ts';
import CalendarComponent from './Header/Calendar.tsx';
import {
  setCheckInDate,
  setCheckOutDate,
} from '../redux/slices/searchSlice.ts';

const CardContainer = styled.div`
  width: 100%;
  min-width: 16rem;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
`;

const CalendarContainer = styled.div`
  width: 100%;
  min-height: 50vh;
  display: flex;
  justify-content: center;
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
  const selectedRoom = useSelector((state: RootState) => state.rooms.room);
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
    const dateString = date.toISOString();
    if (!checkInDate || (checkInDate && checkOutDate)) {
      dispatch(setCheckInDate(dateString));
      dispatch(setCheckOutDate(null));
    } else if (date > new Date(checkInDate)) {
      dispatch(setCheckOutDate(dateString));
    } else {
      dispatch(setCheckInDate(dateString));
      dispatch(setCheckOutDate(null));
    }
  };

  return (
    <CardContainer>
      <CalendarContainer>
        <CustomCalendar
          isOpen
          onDateChange={handleDateChange}
          checkInDate={checkInDate ? new Date(checkInDate) : null}
          checkOutDate={checkOutDate ? new Date(checkOutDate) : null}
        />
      </CalendarContainer>
    </CardContainer>
  );
}
