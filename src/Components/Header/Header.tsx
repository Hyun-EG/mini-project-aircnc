import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import HeaderSearch from './HeaderSearch.tsx';
import HeaderMenu from './HeaderMenu.tsx';
import LoginModal from '../Login/LoginModal.tsx';
import logoSmall from '../../assets/images/logo-small.svg';

const HeaderContainer = styled.header`
  width: 100%;
  top: 0;
  position: fixed;
  z-index: 1000;
  background-color: #ffffff;
  @media (max-width: 600px) {
    margin: 0;
    padding: 0;
  }
`;

const HeaderTop = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLogo = styled.img`
  cursor: pointer;
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

  const Navigate = useNavigate();

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
      return (
        <HeaderLogo
          onClick={() => {
            Navigate('/');
          }}
          src={logoSmall}
          alt="Logo"
        />
      );
    }

    return (
      <HeaderLogo
        onClick={() => {
          Navigate('/');
        }}
        src={logo}
        alt="Logo"
      />
    );
  };

  return (
    <HeaderContainer>
      <HeaderTop>
        {logoPhone()}
        <HeaderMenu windowWidth={windowWidth} />
      </HeaderTop>
      <HeaderSearch windowWidth={windowWidth} />
      <LoginModal />
    </HeaderContainer>
  );
}
