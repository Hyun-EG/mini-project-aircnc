import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { RoomResponse } from '../assets/interfaces.ts';

const WishListContainer = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 10vh;
`;

const WishListBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 15vh;
`;

const WishListTitle = styled.div`
  font-size: 4vh;
  font-weight: 400;
`;

const SeparationLine = styled.div`
  width: 100%;
  height: 0.1px;
  margin: 2rem 0;
  background-color: lightgrey;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
  gap: 25px;
  margin: 2rem;
  width: 100%;
`;

const CardContainer = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

function WishListPage() {
  const [wishList, setWishList] = useState<RoomResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedWishList = JSON.parse(
      localStorage.getItem('wishlists') || '[]',
    );

    const formattedWishList: RoomResponse[] = storedWishList.map(
      (item: { roomID: number; userID: string; image_url: string }) => ({
        room_id: item.roomID,
        user_id: item.userID,
        image_url: item.image_url,
      }),
    );

    setWishList(formattedWishList);
    setLoading(false);
  }, []);

  // eslint-disable-next-line camelcase
  const handleImageClick = (room_id: number) => {
    // eslint-disable-next-line camelcase
    navigate(`/detail/${room_id}`);
  };

  return (
    <WishListContainer>
      <WishListBody>
        <WishListTitle>위시리스트</WishListTitle>
      </WishListBody>
      <SeparationLine />
      {loading ? (
        <div>로딩 중...</div>
      ) : (
        <GridContainer>
          {wishList.length > 0 ? (
            wishList.map((room) => (
              <CardContainer
                key={room.room_id}
                onClick={() => handleImageClick(room.room_id)}
              >
                <ImageContainer>
                  <Image
                    src={room.image_url || '/defaultImage.jpg'}
                    alt={`Room ${room.room_id}`}
                    onError={(e) => {
                      e.currentTarget.src = '/defaultImage.jpg';
                    }}
                  />
                </ImageContainer>
              </CardContainer>
            ))
          ) : (
            <div>위시리스트에 추가된 숙소가 없습니다.</div>
          )}
        </GridContainer>
      )}
    </WishListContainer>
  );
}

export default WishListPage;
