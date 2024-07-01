import styled from 'styled-components';
import CardGrid from '../Components/CardGrid.tsx';
import Header from '../Components/Header/Header.tsx';

const BodyContainer = styled.div`
  margin-top: 13vh;
  padding: 20px;
`;

function MainPage() {
  return (
    <>
      <header>
        <Header />
      </header>
      <BodyContainer>
        <CardGrid />
      </BodyContainer>
    </>
  );
}

export default MainPage;
