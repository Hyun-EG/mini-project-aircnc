import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/logo.svg';
import HeaderSearch from './HeaderSearch.tsx';
import HeaderMenu from './HeaderMenu.tsx';
import logoSmall from '../../assets/images/logo-small.svg';

const HeaderContainer = styled.div`
  width: 100%;
  height: 13vh;
  top: 0;
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgray;
  z-index: 1000;
  background-color: #ffffff;
  @media (max-width: 600px) {
    margin: 0;
    padding: 0;
  }
`;

const HeaderLogo = styled.img`
  cursor: pointer;
  margin: 0 3vh;
  width: 17vh;
  height: 20vh;

  @media (max-width: 768px) {
    width: 8vh;
    height: 8vh;
  }
  @media (max-width: 600px) {
    width: 4vh;
    height: 4vh;
    margin: 0 1vh;
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

  const logoPhone = () => {
    if (windowWidth <= 600) {
      return <HeaderLogo src={logoSmall} alt="Logo" />;
    }

    return <HeaderLogo src={logo} alt="Logo" />;
  };
  return (
    <HeaderContainer>
      {logoPhone()}
      <HeaderSearch />
      <HeaderMenu />
    </HeaderContainer>
  );
}
