import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../redux/store.ts';
import Header from '../Components/Header/Header.tsx';
import DetailCard from '../Components/DetailCard.tsx';
import DetailCalendar from '../Components/DetailCalendar.tsx';
import DetailFooter from '../Components/DetailFooter.tsx';
import DetailMap from '../Components/Map/DetailMap.tsx';
import { setGuestCount } from '../redux/slices/searchSlice.ts';

const BodyContainer = styled.div`
  margin: 13vh 0 13vh 0;
  padding: 20px;
`;

const InfoContainer = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;

  @media (max-width: 1300px) {
    flex-direction: column;
  }
`;

const RoomBookingDetails = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const BookingDetailsContent = styled.div`
  width: 100%;
  font-size: 2.5vh;
  font-weight: bold;
  padding: 10px;
`;

const AddGuestBtn = styled.button`
  width: 4vh;
  height: 4vh;
  margin-left: 2vh;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 3vh;
  font-weight: bold;
  color: #fff;
  background: #ff385c;
`;

const RoomTitle = styled.div`
  font-size: 3vh;
  margin-left: 2.5vh;
`;

const MapTitle = styled.div`
  font-size: 3vh;
  margin-bottom: 2.5vh;
`;

const MapContainer = styled.div`
  width: 80%;
  margin: 0 10%;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  font-size: 3vh;
  font-weight: bold;
`;

const SeparationLine = styled.div`
  width: 100%;
  height: 0.1px;
  margin: 6vh 0 5vh 0;
  background-color: lightgrey;
`;

function DetailInfoPage() {
  const dispatch = useDispatch();
  const selectedRoom = useSelector(
    (state: RootState) => state.rooms.selectedRoom,
  );
  const guestCount = useSelector((state: RootState) => state.search.guestCount);

  if (!selectedRoom) {
    return <h1>Loading...</h1>;
  }

  const incrementGuestCount = () => {
    dispatch(setGuestCount(guestCount + 1));
  };

  return (
    <>
      <Header />
      <BodyContainer>
        <RoomTitle>{selectedRoom.name}</RoomTitle>
        <InfoContainer>
          <DetailCard />
          <RoomBookingDetails>
            <DetailCalendar />
            <BookingDetailsContent>
              {`Price: ${selectedRoom.price}`}
            </BookingDetailsContent>
            <BookingDetailsContent>
              {`Personnel: ${guestCount}`}
              <AddGuestBtn onClick={incrementGuestCount}>+</AddGuestBtn>
            </BookingDetailsContent>
          </RoomBookingDetails>
        </InfoContainer>
        <SeparationLine />
        <MapContainer>
          <MapTitle>숙소 위치</MapTitle>
          <DetailMap width="100%" height="50vh" listing={selectedRoom} />
        </MapContainer>
      </BodyContainer>
      <DetailFooter />
    </>
  );
}

export default DetailInfoPage;
