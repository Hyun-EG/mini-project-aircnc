import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IconX } from '@tabler/icons-react';
import { useWishes, useDeleteWish } from '../hooks/wish.tsx';
import { SkeletonObject } from '../Components/SkeletonGrid.tsx';

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
  position: relative;
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

const SkeletonImage = styled(SkeletonObject)`
  width: 100%;
  padding-bottom: 100%;
  border-radius: 10px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1;

  & > svg {
    color: red;
    width: 24px;
    height: 24px;
  }
`;

function WishListPage() {
  const { data: wishlist, isLoading, isError, refetch } = useWishes();
  const { mutate: deleteWish } = useDeleteWish();
  const navigate = useNavigate();

  const handleImageClick = (roomId: number) => {
    navigate(`/detail/${roomId}`);
  };

  const handleDeleteClick = (wishId: number, roomId: number) => {
    deleteWish(
      { wishId, roomId },
      {
        onSuccess: () => {
          refetch();
        },
      },
    );
  };

  if (isLoading) {
    return (
      <WishListContainer>
        <WishListBody>
          <WishListTitle>위시리스트</WishListTitle>
        </WishListBody>
        <SeparationLine />
        <GridContainer>
          {Array.from({ length: 12 }, (_v, i) => i).map((index) => (
            <SkeletonImage key={index} />
          ))}
        </GridContainer>
      </WishListContainer>
    );
  }

  if (isError) {
    return <h1>Error!</h1>;
  }

  if (!wishlist || !wishlist.length) {
    return <h1>위시리스트에 저장된 숙소가 없습니다!</h1>;
  }

  console.log(wishlist);

  return (
    <WishListContainer>
      <WishListBody>
        <WishListTitle>위시리스트</WishListTitle>
      </WishListBody>
      <SeparationLine />
      <GridContainer>
        {wishlist
          .sort((a, b) => a.id - b.id)
          .map((wish) => (
            <CardContainer key={wish.room_response.room_id}>
              <DeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(wish.id, wish.room_response.room_id);
                }}
              >
                <IconX />
              </DeleteButton>
              <ImageContainer
                onClick={() => handleImageClick(wish.room_response.room_id)}
              >
                <Image
                  src={wish.room_response.image_url || '/defaultImage.jpg'}
                  alt={`Room ${wish.room_response.room_id}`}
                  onError={(e) => {
                    e.currentTarget.src = '/defaultImage.jpg';
                  }}
                />
              </ImageContainer>
            </CardContainer>
          ))}
      </GridContainer>
    </WishListContainer>
  );
}

export default WishListPage;
