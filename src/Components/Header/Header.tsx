// Header.tsx
import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/logo.svg';
import HeaderSearch from '../headersearch/HeaderSearch.tsx';
import HeaderMenu from '../headermenu/HeaderMenu.tsx';

const HeaderContainer = styled.div`
  width: 100%;
  height: 13vh;
  top: 0;
  display: flex;
  position: absolute;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgray;
`;

const HeaderLogo = styled.img`
  width: 17vh;
  height: 20vh;
  cursor: pointer;
  margin: 0 3vh;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderLogo src={logo} alt="Logo" />
      <HeaderSearch />
      <HeaderMenu />
    </HeaderContainer>
  );
}
