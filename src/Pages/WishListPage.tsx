// 로그인이 되었을 때만 표시되도록 처리
import { styled } from 'styled-components';

const WishListContainer = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 10vh;
`;

const WishListBody = styled.div`
  display: flex;
  justify-content: center;
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

function WishListPage() {
  return (
    <WishListContainer>
      <WishListBody>
        <WishListTitle>위시리스트</WishListTitle>
      </WishListBody>
      <SeparationLine />
    </WishListContainer>
  );
}

export default WishListPage;
