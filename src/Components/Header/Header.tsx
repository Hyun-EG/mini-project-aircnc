// Header.tsx
import styled from 'styled-components';
import logo from '../../assets/images/logo.svg';
import HeaderSearch from './HeaderSearch.tsx';
import HeaderMenu from './HeaderMenu.tsx';

const HeaderContainer = styled.div`
  width: 100%;
  height: 13vh;
  top: 0;
  display: flex;
  position: fixed; // 수정 By 상화, absolute -> fixed
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgray;
  z-index: 1000; // 수정 By 상화, Z-index 설정 (카드 위에 표시..)
  background-color: #ffffff; // 수정By 상화, background color표시 (스크롤했을 때 카드가 보여서,,)
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
