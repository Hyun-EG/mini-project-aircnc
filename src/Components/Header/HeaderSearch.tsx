import { useState, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IconSearch } from '@tabler/icons-react';
import { RootState } from '../../redux/store.ts';
import {
  setLocation,
  setCheckInDate,
  setCheckOutDate,
  setGuestCount,
  resetSearch,
  setMode,
  setCursorId,
  SearchState,
} from '../../redux/slices/searchSlice.ts';
import { City } from '../../schema/roomSchema.ts';
import HeaderSearchLocation from './HeaderSearchLocation.tsx';
import CalendarComponent from './Calendar.tsx';
import Guest from './Guest.tsx';
import Button from '../Button.tsx';
import locationImg from '../../assets/images/airplane.png';
import checkImg from '../../assets/images/calendar.png';
import usersImg from '../../assets/images/users.png';

type SelectMode = '' | 'location' | 'checkIn' | 'checkOut' | 'guest';

const SearchBox = styled.menu<{ $openSelect: SelectMode }>`
  width: fit-content;
  margin: 0 auto;
  display: flex;
  border: 1px solid lightgrey;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  position: relative;
  ${(props) =>
    props.$openSelect.length &&
    css`
      background-color: rgba(242, 242, 242);
    `}
`;

const SearchItem = styled.li<{ $openSelect: SelectMode; $isOpen: SelectMode }>`
  ${(props) =>
    props.$openSelect === props.$isOpen &&
    css`
      z-index: 10;
      & > button {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      }
      & > button:hover {
        filter: none;
      }
    `}
  ${(props) =>
    props.$openSelect !== props.$isOpen &&
    css`
      filter: brightness(95%);
    `}
    ${(props) =>
    props.$openSelect.length === 0 &&
    css`
      filter: none;
    `}
`;

const SearchLocation = styled(SearchItem)``;
const SearchCheckIn = styled(SearchItem)``;
const SearchCheckOut = styled(SearchItem)``;
const SearchGuest = styled(SearchItem)``;

const SearchButtonItem = styled.div<{ $openSelect: SelectMode }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &::after {
    ${(props) =>
      props.$openSelect.length
        ? css`
            content: none;
          `
        : css`
            content: '';
          `}
    position: absolute;
    top: 50%;
    right: -1.5rem;
    width: 1px;
    height: 75%;
    transform: translateY(-50%);
    background-color: #ddd;
  }
  @media (min-width: 601px) {
    min-width: 6rem;
  }
  @media (min-width: 769px) {
    min-width: 7.75rem;
  }
  @media (min-width: 1024px) {
    min-width: 11.5rem;
  }
`;

const SearchButtonTitle = styled.span`
  font-size: 0.75rem;
`;

const SearchButtonContent = styled.span`
  font-size: 1rem;
`;

const HeaderSearchButton = styled.div`
  position: relative;
  z-index: 100;
  & > button {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  @media (min-width: 601px) {
    position: absolute;
    right: 0.5rem;
    transform: none;
    & > button {
      box-shadow: none;
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: -0.5rem;
      width: 0.5rem;
      height: 100%;
    }
  }
`;

const HeaderSearchButtonConditionalText = styled.span`
  margin-right: 0.5rem;
`;

interface SearchProps {
  windowWidth: number;
}

type HeaderSearchState = Omit<SearchState, 'coordinates' | 'mode' | 'cursorId'>;

export default function HeaderSearch({
  windowWidth,
}: SearchProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { location, checkInDate, checkOutDate, guestCount } = useSelector(
    (state: RootState) => state.search,
  );
  const [openSelect, setOpenSelect] = useState<SelectMode>('');
  const locationPath = useLocation().pathname;

  const initialSearchState: HeaderSearchState = useMemo(() => {
    return { location: '', checkInDate: '', checkOutDate: '', guestCount: 0 };
  }, []);

  const [searchState, setSearchState] =
    useState<HeaderSearchState>(initialSearchState);

  useEffect(() => {
    if (locationPath === '/') {
      dispatch(resetSearch());
    }
  }, [locationPath, dispatch]);

  useEffect(() => {
    setSearchState({ location, checkInDate, checkOutDate, guestCount });
  }, [location, checkInDate, checkOutDate, guestCount]);

  const checkIfMobile = () => windowWidth < 769;
  const checkIfDesktop = () => windowWidth > 1023;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSearch = () => {
    const locationPrefix = searchState.location.substring(0, 2);
    const checkInOutDate = searchState.checkInDate && searchState.checkOutDate;
    const chooseOne =
      searchState.location || checkInOutDate || searchState.guestCount > 0;

    if (!chooseOne) {
      return;
    }

    dispatch(setLocation(locationPrefix as City));
    dispatch(
      setCheckInDate(
        searchState.checkInDate ? formatDate(searchState.checkInDate) : null,
      ),
    );
    dispatch(
      setCheckOutDate(
        searchState.checkOutDate ? formatDate(searchState.checkOutDate) : null,
      ),
    );
    dispatch(setGuestCount(searchState.guestCount));
    dispatch(setMode('city'));
    dispatch(setCursorId(null));
    navigate('/search');
  };

  return (
    <SearchBox $openSelect={openSelect}>
      <SearchLocation $openSelect={openSelect} $isOpen="location">
        <Button
          $size="medium"
          $shape="rounded"
          $color="white"
          onClick={() =>
            setOpenSelect(openSelect === 'location' ? '' : 'location')
          }
        >
          <SearchButtonItem $openSelect={openSelect}>
            <SearchButtonTitle>
              {checkIfMobile() ? (
                <img src={locationImg} alt="여행지" width="15vh" />
              ) : (
                '여행지'
              )}
            </SearchButtonTitle>
            {!checkIfMobile() && (
              <SearchButtonContent>
                {searchState.location || '여행지 선택'}
              </SearchButtonContent>
            )}
          </SearchButtonItem>
        </Button>
        {openSelect === 'location' && (
          <HeaderSearchLocation
            onClick={(location) => {
              setSearchState((prev) => {
                return { ...prev, location };
              });
              setOpenSelect('');
            }}
          />
        )}
      </SearchLocation>
      <SearchCheckIn $openSelect={openSelect} $isOpen="checkIn">
        <Button
          $size="medium"
          $shape="rounded"
          $color="white"
          onClick={() =>
            setOpenSelect(openSelect === 'checkIn' ? '' : 'checkIn')
          }
        >
          <SearchButtonItem $openSelect={openSelect}>
            <SearchButtonTitle>
              {checkIfMobile() ? (
                <img src={checkImg} alt="체크인" width="15vh" />
              ) : (
                '체크인'
              )}
            </SearchButtonTitle>
            {!checkIfMobile() && (
              <SearchButtonContent>
                {searchState.checkInDate
                  ? formatDate(searchState.checkInDate)
                  : '체크인 선택'}
              </SearchButtonContent>
            )}
          </SearchButtonItem>
        </Button>
        <CalendarComponent
          isOpen={openSelect === 'checkIn'}
          onDateChange={(date) => {
            const dateString = date.toISOString();
            if (
              !searchState.checkInDate ||
              (searchState.checkInDate && searchState.checkOutDate)
            ) {
              setSearchState((prev) => {
                return { ...prev, checkInDate: dateString };
              });
              setSearchState((prev) => {
                return { ...prev, checkOutDate: null };
              });
            } else if (searchState.checkInDate && !searchState.checkOutDate) {
              if (date < new Date(searchState.checkInDate)) {
                setSearchState((prev) => {
                  return { ...prev, checkOutDate: searchState.checkInDate };
                });
                setSearchState((prev) => {
                  return { ...prev, checkInDate: dateString };
                });
              } else {
                setSearchState((prev) => {
                  return { ...prev, checkOutDate: dateString };
                });
                setOpenSelect('');
              }
            }
          }}
          checkInDate={
            searchState.checkInDate ? new Date(searchState.checkInDate) : null
          }
          checkOutDate={
            searchState.checkOutDate ? new Date(searchState.checkOutDate) : null
          }
        />
      </SearchCheckIn>
      <SearchCheckOut $openSelect={openSelect} $isOpen="checkOut">
        <Button
          $size="medium"
          $shape="rounded"
          $color="white"
          onClick={() =>
            setOpenSelect(openSelect === 'checkOut' ? '' : 'checkOut')
          }
        >
          <SearchButtonItem $openSelect={openSelect}>
            <SearchButtonTitle>
              {checkIfMobile() ? (
                <img src={checkImg} alt="체크아웃" width="15vh" />
              ) : (
                '체크아웃'
              )}
            </SearchButtonTitle>
            {!checkIfMobile() && (
              <SearchButtonContent>
                {searchState.checkOutDate
                  ? formatDate(searchState.checkOutDate)
                  : '체크아웃 선택'}
              </SearchButtonContent>
            )}
          </SearchButtonItem>
        </Button>
        <CalendarComponent
          isOpen={openSelect === 'checkOut'}
          onDateChange={(date) => {
            const dateString = date.toISOString();
            if (
              date &&
              searchState.checkInDate &&
              date < new Date(searchState.checkInDate)
            ) {
              setSearchState((prev) => {
                return { ...prev, checkOutDate: searchState.checkInDate };
              });
              setSearchState((prev) => {
                return { ...prev, checkInDate: dateString };
              });
            } else {
              setSearchState((prev) => {
                return { ...prev, checkOutDate: dateString };
              });
              setOpenSelect('');
            }
          }}
          checkInDate={
            searchState.checkInDate ? new Date(searchState.checkInDate) : null
          }
          checkOutDate={
            searchState.checkOutDate ? new Date(searchState.checkOutDate) : null
          }
        />
      </SearchCheckOut>
      <SearchGuest $openSelect={openSelect} $isOpen="guest">
        <Button
          $size="medium"
          $shape="rounded"
          $color="white"
          onClick={() => setOpenSelect(openSelect === 'guest' ? '' : 'guest')}
        >
          <SearchButtonItem $openSelect={openSelect}>
            <SearchButtonTitle>
              {checkIfMobile() ? (
                <img src={usersImg} alt="인원" width="15vh" />
              ) : (
                '인원'
              )}
            </SearchButtonTitle>
            {!checkIfMobile() && (
              <SearchButtonContent>
                인원: {searchState.guestCount}
              </SearchButtonContent>
            )}
          </SearchButtonItem>
        </Button>
        {openSelect === 'guest' && (
          <Guest
            counts={{ total: guestCount }}
            onChange={(delta) => {
              const newGuestCount = searchState.guestCount + delta;
              if (newGuestCount < 0) {
                return;
              }
              setSearchState((prev) => {
                return { ...prev, guestCount: newGuestCount };
              });
            }}
          />
        )}
      </SearchGuest>
      <HeaderSearchButton>
        {checkIfDesktop() && openSelect.length ? (
          <Button
            $size="small"
            $shape="rounded"
            $color="primary"
            onClick={handleSearch}
          >
            <HeaderSearchButtonConditionalText>
              검색
            </HeaderSearchButtonConditionalText>
            <IconSearch color="white" />
          </Button>
        ) : (
          <Button
            $size="medium"
            $shape="circle"
            $color="primary"
            onClick={handleSearch}
          >
            <IconSearch color="white" />
          </Button>
        )}
      </HeaderSearchButton>
    </SearchBox>
  );
}
