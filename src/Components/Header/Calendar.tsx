import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';
import Calendar from 'react-calendar';
import { RootState } from '../../redux/store.ts';
import {
  setCurrentDate,
  setNextMonthDate,
} from '../../redux/slices/calendarSlice.ts';
import { CalendarProps } from '../../assets/interfaces.ts';

const GlobalStyles = createGlobalStyle`
  .react-calendar {
    width: 45vh;
    margin-top: 3vh;
    max-width: 100%;
    background: white;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }
  .react-calendar__month-view__weekdays .react-calendar__month-view__weekdays__weekday {
    text-align: center;
    text-transform: uppercase;
    font-size: 1.8vh;
    font-weight: bold;
    margin-top: 2vh;
    margin-bottom: 1.5vh;
    color: grey;
  }
  .react-calendar__tile {
    background: white;
    font-size: 1.8vh;
    padding: 0.4vh 0;
    border: none;
    cursor: pointer;
    border-radius: 0;
  }
  .selected-date, .date-in-range {
    background: #f7f7f7;
    color: black;
  }
  .react-calendar__navigation {
    display: none;
  }
`;

const DateSelectContainer = styled.div<{ isOpen: boolean }>`
  width: 90vh;
  height: 33vh;
  position: absolute;
  top: calc(115%);
  left: 0;
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 20px;
  overflow: hidden;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  @media (max-width: 768px) {
    width: 50vh;
    height: 30vh;
  }
  @media (max-width: 600px) {
    width: 30vh;
    height: 30vh;
  }
`;

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  & > * {
    margin: 0 1vh;
    width: 45vh;
  }
  @media (max-width: 768px) {
    & > :nth-child(2) {
      display: none;
    }
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1vh 0;
  font-size: 2vh;
  @media (max-width: 768px) {
    .next-month-label {
      display: none;
    }
  }
`;

const NavigationButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.7vh;
`;

const formatDay = (locale: string | undefined, date: Date) => {
  return date.getDate().toString();
};

export default function CalendarComponent({
  isOpen,
  onDateChange,
  checkInDate,
  checkOutDate,
}: CalendarProps) {
  const dispatch = useDispatch();
  const { currentDate, nextMonthDate } = useSelector((state: RootState) => ({
    currentDate: state.calendar.currentDate
      ? new Date(state.calendar.currentDate)
      : new Date(),
    nextMonthDate: state.calendar.nextMonthDate
      ? new Date(state.calendar.nextMonthDate)
      : new Date(),
  }));

  useEffect(() => {
    if (isOpen) {
      const newCurrentDate = new Date();
      dispatch(setCurrentDate(newCurrentDate.toISOString()));
      dispatch(
        setNextMonthDate(
          new Date(
            newCurrentDate.getFullYear(),
            newCurrentDate.getMonth() + 1,
            1,
          ).toISOString(),
        ),
      );
    }
  }, [isOpen, dispatch]);

  const handlePrevMonth = () => {
    const newCurrentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    );
    dispatch(setCurrentDate(newCurrentDate.toISOString()));
  };

  const handleNextMonth = () => {
    const newCurrentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1,
    );
    dispatch(setCurrentDate(newCurrentDate.toISOString()));
  };

  const handleDateClick = (date: Date) => {
    onDateChange(date);
  };

  const formatNavigationLabel = (date: Date) =>
    `${date.getFullYear()}년 ${date.getMonth() + 1}월`;

  const tileClassName = ({ date }: { date: Date }) => {
    if (checkInDate && date.toDateString() === checkInDate.toDateString()) {
      return 'selected-date';
    }
    if (checkOutDate && date.toDateString() === checkOutDate.toDateString()) {
      return 'selected-date';
    }
    if (
      checkInDate &&
      checkOutDate &&
      date > new Date(checkInDate) &&
      date < new Date(checkOutDate)
    ) {
      return 'date-in-range';
    }
    return '';
  };

  const tileDisabled = ({ date }: { date: Date }) => date < new Date();

  return (
    <DateSelectContainer isOpen={isOpen}>
      <GlobalStyles />
      <NavigationContainer>
        <NavigationButton onClick={handlePrevMonth}>{'<'}</NavigationButton>
        <div>
          {formatNavigationLabel(currentDate)} &nbsp;
          <span className="next-month-label">
            {formatNavigationLabel(nextMonthDate)}
          </span>
        </div>
        <NavigationButton onClick={handleNextMonth}>{'>'}</NavigationButton>
      </NavigationContainer>
      <CalendarWrapper>
        <Calendar
          key={currentDate.toISOString()}
          value={currentDate}
          formatDay={formatDay}
          tileDisabled={tileDisabled}
          tileClassName={tileClassName}
          onClickDay={handleDateClick}
          showNeighboringMonth={false}
        />
        <Calendar
          key={nextMonthDate.toISOString()}
          value={nextMonthDate}
          formatDay={formatDay}
          tileDisabled={tileDisabled}
          tileClassName={tileClassName}
          onClickDay={handleDateClick}
          showNeighboringMonth={false}
        />
      </CalendarWrapper>
    </DateSelectContainer>
  );
}
