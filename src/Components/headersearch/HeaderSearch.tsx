import React, { useState } from 'react';
import styled from 'styled-components';
import searchBtn from '../../assets/images/search-btn.svg';
import CalendarComponent from '../headercalendar/Calendar.tsx';
import Guest from '../headerguest/Guest.tsx';

interface SearchBoxProps {
  isOpen: boolean;
}

interface LocationSelectProps {
  isOpen: boolean;
}

interface DateSelectProps {
  isOpen: boolean;
}

interface GuestSelectProps {
  isOpen: boolean;
}

const SearchBox = styled.div<SearchBoxProps>`
  width: 90vh;
  height: 7vh;
  display: flex;
  border: 1px solid lightgrey;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  position: relative;
`;

const SearchLocation = styled.div<LocationSelectProps>`
  width: 28vh;
  height: 7vh;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 4vh;
  position: relative;
  background: ${(props) => (props.isOpen ? 'lightgrey' : 'transparent')};

  &::after {
    content: '';
    position: absolute;
    right: 0;
    height: 60%;
    border-right: 1px solid lightgrey;
    transition: border-right 0.3s;
  }

  &:hover {
    background: lightgrey;

    &::after {
      border-right: none;
    }
  }
`;

const LocationOption = styled.div`
  width: 5vh;
  height: 3vh;
  margin: 1vh;
  padding: 0.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgrey;
  border-radius: 20px;
  font-size: 2vh;
  cursor: pointer;
  &:hover {
    background-color: lightgrey;
  }
`;

const LocationTitle = styled.div`
  font-size: 2vh;
  font-weight: bold;
`;

const LocationContent = styled.div`
  font-size: 1.5vh;
`;

const LocationSelectContainer = styled.div<LocationSelectProps>`
  width: 58vh;
  max-height: ${(props) => (props.isOpen ? '10vh' : '0')};
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  top: calc(115%);
  left: 0;
  align-items: center;
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 8px;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
`;

const SearchDate = styled.div<DateSelectProps>`
  width: 15vh;
  height: 7vh;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 2vh;
  position: relative;
  background: ${(props) => (props.isOpen ? 'lightgrey' : 'transparent')};

  &::after {
    content: '';
    position: absolute;
    right: 0;
    height: 60%;
    border-right: 1px solid lightgrey;
    transition: border-right 0.3s;
  }

  &:hover {
    background: lightgrey;

    &::after {
      border-right: none;
    }
  }
`;

const DateTitle = styled.div`
  font-size: 2vh;
  font-weight: bold;
`;

const DateContent = styled.div`
  font-size: 1.5vh;
`;

const SearchGuest = styled.div<GuestSelectProps>`
  width: 30vh;
  height: 7vh;
  border-radius: 50px;
  padding: 0 1vh 0 1vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => (props.isOpen ? 'lightgrey' : 'transparent')};
  position: relative;

  &:hover {
    background: lightgrey;
  }
`;

const GuestTitle = styled.div`
  font-weight: bold;
  font-size: 2vh;
`;

const GuestContent = styled.div`
  font-size: 1.5vh;
`;

const SearchBtnImg = styled.img`
  width: 5vh;
  margin-right: 1vh;
  cursor: pointer;
`;

const locations = [
  '서울',
  '대전',
  '대구',
  '부산',
  '울산',
  '광주',
  '인천',
  '세종',
];

export default function HeaderSearch(): JSX.Element {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [guestCounts, setGuestCounts] = useState<{
    adult: number;
    child: number;
    cat: number;
  }>({
    adult: 0,
    child: 0,
    cat: 0,
  });
  const [openSelect, setOpenSelect] = useState<string>('');

  const toggleLocationSelect = (): void => {
    setOpenSelect(openSelect === 'location' ? '' : 'location');
  };

  const handleLocationClick = (location: string): void => {
    setSelectedLocation(location);
    setOpenSelect('');
  };

  const toggleCheckInSelect = (): void => {
    setOpenSelect(openSelect === 'checkIn' ? '' : 'checkIn');
  };

  const toggleCheckOutSelect = (): void => {
    setOpenSelect(openSelect === 'checkOut' ? '' : 'checkOut');
  };

  const toggleGuestSelect = (): void => {
    setOpenSelect(openSelect === 'guest' ? '' : 'guest');
  };

  const handleGuestChange = (
    type: 'adult' | 'child' | 'cat',
    delta: number,
  ): void => {
    setGuestCounts((prevCounts) => ({
      ...prevCounts,
      [type]: Math.max(0, prevCounts[type] + delta),
    }));
  };

  const handleConfirmGuests = (): void => {
    setOpenSelect('');
  };

  const handleDateChange = (date: Date): void => {
    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(date);
      setCheckOutDate(null);
    } else if (checkInDate && !checkOutDate) {
      if (date < checkInDate) {
        setCheckOutDate(checkInDate);
        setCheckInDate(date);
      } else {
        setCheckOutDate(date);
        setOpenSelect('');
      }
    }
  };

  return (
    <SearchBox isOpen={false}>
      <SearchLocation
        onClick={toggleLocationSelect}
        isOpen={openSelect === 'location'}
      >
        <LocationTitle>여행지</LocationTitle>
        <LocationContent>{selectedLocation || '여행지 선택'}</LocationContent>
      </SearchLocation>
      <LocationSelectContainer isOpen={openSelect === 'location'}>
        {locations.map((location) => (
          <LocationOption
            key={location}
            onClick={() => handleLocationClick(location)}
          >
            {location}
          </LocationOption>
        ))}
      </LocationSelectContainer>
      <SearchDate
        onClick={toggleCheckInSelect}
        isOpen={openSelect === 'checkIn'}
      >
        <DateTitle>체크인</DateTitle>
        <DateContent>
          {checkInDate ? checkInDate.toLocaleDateString() : '체크인 선택'}
        </DateContent>
      </SearchDate>
      <CalendarComponent
        isOpen={openSelect === 'checkIn'}
        onDateChange={handleDateChange}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
      />
      <SearchDate
        onClick={toggleCheckOutSelect}
        isOpen={openSelect === 'checkOut'}
      >
        <DateTitle>체크아웃</DateTitle>
        <DateContent>
          {checkOutDate ? checkOutDate.toLocaleDateString() : '체크아웃 선택'}
        </DateContent>
      </SearchDate>
      <CalendarComponent
        isOpen={openSelect === 'checkOut'}
        onDateChange={handleDateChange}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
      />
      <SearchGuest onClick={toggleGuestSelect} isOpen={openSelect === 'guest'}>
        <div>
          <GuestTitle>게스트</GuestTitle>
          <GuestContent>
            성인: {guestCounts.adult} 어린이: {guestCounts.child} 고양이:
            {guestCounts.cat}
          </GuestContent>
        </div>
        <Guest
          isOpen={openSelect === 'guest'}
          counts={guestCounts}
          onChange={handleGuestChange}
          onConfirm={handleConfirmGuests}
        />
      </SearchGuest>
      <SearchBtnImg src={searchBtn} alt="search-btn" onClick={() => {}} />
    </SearchBox>
  );
}
