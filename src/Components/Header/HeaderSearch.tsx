import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import searchBtn from '../../assets/images/search-btn.svg';
import CalendarComponent from './Calendar.tsx';
import Guest from './Guest.tsx';
import {
  MockData,
  SearchBoxProps,
  LocationSelectProps,
  DateSelectProps,
  GuestSelectProps,
} from '../../assets/interfaces.ts';

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
  max-height: ${(props) => (props.isOpen ? '12vh' : '0')};
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
  '부산',
  '울산',
  '인천',
  '대전',
  '경기',
  '제주',
  '강원',
];

export default function HeaderSearch(): JSX.Element {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [guestCounts, setGuestCounts] = useState<{
    adult: number;
    child: number;
    cat: number;
  }>({ adult: 0, child: 0, cat: 0 });
  const [openSelect, setOpenSelect] = useState<string>('');
  const [listings, setListings] = useState<MockData[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/src/assets/mockdata.json');
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  const handleSearch = () => {
    const locationPrefix = selectedLocation.substring(0, 2);
    const filteredData = listings.filter((listing) =>
      listing.address.includes(locationPrefix),
    );
    console.log(filteredData);
  };

  return (
    <SearchBox isOpen={false}>
      <SearchLocation
        onClick={() =>
          setOpenSelect(openSelect === 'location' ? '' : 'location')
        }
        isOpen={openSelect === 'location'}
      >
        <LocationTitle>여행지</LocationTitle>
        <LocationContent>{selectedLocation || '여행지 선택'}</LocationContent>
      </SearchLocation>
      <LocationSelectContainer isOpen={openSelect === 'location'}>
        {locations.map((location) => (
          <LocationOption
            key={location}
            onClick={() => {
              setSelectedLocation(location);
              setOpenSelect('');
            }}
          >
            {location}
          </LocationOption>
        ))}
      </LocationSelectContainer>
      <SearchDate
        onClick={() => setOpenSelect(openSelect === 'checkIn' ? '' : 'checkIn')}
        isOpen={openSelect === 'checkIn'}
      >
        <DateTitle>체크인</DateTitle>
        <DateContent>
          {checkInDate ? checkInDate.toLocaleDateString() : '체크인 선택'}
        </DateContent>
      </SearchDate>
      <CalendarComponent
        isOpen={openSelect === 'checkIn'}
        onDateChange={(date) => {
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
        }}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
      />
      <SearchDate
        onClick={() =>
          setOpenSelect(openSelect === 'checkOut' ? '' : 'checkOut')
        }
        isOpen={openSelect === 'checkOut'}
      >
        <DateTitle>체크아웃</DateTitle>
        <DateContent>
          {checkOutDate ? checkOutDate.toLocaleDateString() : '체크아웃 선택'}
        </DateContent>
      </SearchDate>
      <CalendarComponent
        isOpen={openSelect === 'checkOut'}
        onDateChange={(date) => {
          if (date && checkInDate && date < checkInDate) {
            setCheckOutDate(checkInDate);
            setCheckInDate(date);
          } else {
            setCheckOutDate(date);
            setOpenSelect('');
          }
        }}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
      />
      <SearchGuest
        onClick={() => setOpenSelect(openSelect === 'guest' ? '' : 'guest')}
        isOpen={openSelect === 'guest'}
      >
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
          onChange={(type, delta) => {
            setGuestCounts((prevCounts) => ({
              ...prevCounts,
              [type]: Math.max(0, prevCounts[type] + delta),
            }));
          }}
          onConfirm={() => setOpenSelect('')}
        />
      </SearchGuest>
      <SearchBtnImg src={searchBtn} alt="search-btn" onClick={handleSearch} />
    </SearchBox>
  );
}
