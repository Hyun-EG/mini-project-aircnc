import { useState, useEffect } from 'react';
import styled from 'styled-components';
import HeaderLogo from './HeaderLogo.tsx';
import HeaderSearch from './HeaderSearch.tsx';
import HeaderMenu from './HeaderMenu.tsx';
import LoginModal from '../Login/LoginModal.tsx';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  padding: 0.5rem;
  z-index: 1000;
  background-color: #ffffff;
  @media (min-width: 481px) {
    padding: 1rem 2rem 0.5rem;
  }
`;

const HeaderTop = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 601px) {
    margin-bottom: 0.5rem;
  }
`;

export default function Header() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <HeaderContainer>
      <HeaderTop>
        <HeaderLogo windowWidth={windowWidth} />
        <HeaderMenu windowWidth={windowWidth} />
      </HeaderTop>
      <HeaderSearch windowWidth={windowWidth} />
      <LoginModal />
    </HeaderContainer>
  );
}
