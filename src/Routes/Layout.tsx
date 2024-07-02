import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Components/Header/Header.tsx';

const MainContainer = styled.main`
  padding: 0 0.5rem;
  @media (min-width: 481px) {
    padding: 0 2rem;
  }
`;

function Layout() {
  return (
    <>
      <Header />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
}

export default Layout;
