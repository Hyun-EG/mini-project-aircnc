import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Calendar from 'react-calendar';

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

  .selected-date,
  .date-in-range {
    background: #f7f7f7;
    color: black;
  }

  .react-calendar__navigation {
    display: none;
  }
`;

interface CalendarProps {
  isOpen: boolean;
  onDateChange: (date: Date) => void;
  checkInDate: Date | null;
  checkOutDate: Date | null;
}

const DateSelectContainer = styled.div<Pick<CalendarProps, 'isOpen'>>`
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
`;

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  & > * {
    margin: 0 1vh;
    width: 45vh;
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1vh 0;
  font-size: 2vh;
`;

const NavigationButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.7vh;
`;

interface CalendarTileProperties {
  date: Date;
  view: string;
}

export default function CalendarComponent({
  isOpen,
  onDateChange,
  checkInDate,
  checkOutDate,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [nextMonthDate, setNextMonthDate] = useState(
    new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
  );

  useEffect(() => {
    if (isOpen) {
      const newCurrentDate = new Date();
      setCurrentDate(newCurrentDate);
      setNextMonthDate(
        new Date(
          newCurrentDate.getFullYear(),
          newCurrentDate.getMonth() + 1,
          1,
        ),
      );
    }
  }, [isOpen]);

  useEffect(() => {
    setNextMonthDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  }, [currentDate]);

  const formatDay = (locale: string | undefined, date: Date) =>
    date.getDate().toString();

  const tileDisabled = ({ date }: CalendarTileProperties) =>
    date < new Date(new Date().setHours(0, 0, 0, 0));

  const handlePrevMonth = () => {
    const newCurrentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    );
    setCurrentDate(newCurrentDate);
  };

  const handleNextMonth = () => {
    const newCurrentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1,
    );
    setCurrentDate(newCurrentDate);
  };

  const formatNavigationLabel = (date: Date) => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
  };

  const isDateInRange = (date: Date) => {
    if (!checkInDate || !checkOutDate) return false;
    return date > checkInDate && date < checkOutDate;
  };

  const tileClassName = ({ date, view }: CalendarTileProperties) => {
    if (view === 'month') {
      if (checkInDate && date.toDateString() === checkInDate.toDateString()) {
        return 'selected-date';
      }
      if (checkOutDate && date.toDateString() === checkOutDate.toDateString()) {
        return 'selected-date';
      }
      if (isDateInRange(date)) {
        return 'date-in-range';
      }
    }
    return '';
  };

  const handleDateClick = (date: Date) => {
    onDateChange(date);
  };

  return (
    <DateSelectContainer isOpen={isOpen}>
      <GlobalStyles />
      <NavigationContainer>
        <NavigationButton onClick={handlePrevMonth}>{'<'}</NavigationButton>
        <div>
          {formatNavigationLabel(currentDate)} &nbsp;{' '}
          {formatNavigationLabel(nextMonthDate)}
        </div>
        <NavigationButton onClick={handleNextMonth}>{'>'}</NavigationButton>
      </NavigationContainer>
      <CalendarWrapper>
        <Calendar
          key={currentDate.getTime()}
          value={currentDate}
          formatDay={formatDay}
          tileDisabled={tileDisabled}
          tileClassName={tileClassName}
          onClickDay={handleDateClick}
          showNeighboringMonth={false}
        />
        <Calendar
          key={nextMonthDate.getTime()}
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
