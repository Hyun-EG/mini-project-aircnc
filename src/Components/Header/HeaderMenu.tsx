import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { setModalStatus } from '../../redux/slices/loginModalSlice.ts';
import { clearUser } from '../../redux/slices/userSlice.ts';
import hamburgerBtn from '../../assets/images/hamburger-btn.svg';
import headerProfile from '../../assets/images/header-profile.svg';

const MenuContainer = styled.div`
  width: 10vh;
  height: 6.5vh;
  margin: 0 4vh;
  border: 1px solid lightgrey;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3vh;
  cursor: pointer;
  position: relative;

  @media (max-width: 768px) {
    padding: 0;
    border-radius: 50%;
    width: 4vh;
    height: 4vh;
  }
  @media (max-width: 600px) {
    width: 4vh;
    height: 4vh;
    border-radius: 50%;
    margin: 0 2vh 0 0.5vh;
  }
`;

const HamburgerBtn = styled.img`
  width: 3vh;
  @media (max-width: 768px) {
    display: none;
    width: 0vh;
  }
`;

const HeaderProfile = styled.img`
  width: 4vh;
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 8vh;
  right: 0;
  width: 18vh;
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: ${({ isOpen }) => (isOpen ? '20vh' : '0')};
  overflow: hidden;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition:
    max-height 0.3s ease-out,
    visibility 0.3s ease-out;
  @media (max-width: 600px) {
    margin: 0 2vh;
  }
`;

const MenuItem = styled.div`
  padding: 1vh 2vh;
  font-size: 2vh;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default function HeaderMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.profile);
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(['user']);

  const toggleMenu = (): void => {
    setIsOpen((prev) => !prev);
  };

  return (
    <MenuContainer onClick={toggleMenu}>
      <HamburgerBtn src={hamburgerBtn} alt="hamburger-btn" />
      <HeaderProfile src={headerProfile} alt="headerProfile" />
      <DropdownMenu isOpen={isOpen}>
        {user ? (
          <>
            <MenuItem
              onClick={() => {
                navigate('/booked');
              }}
            >
              예약 목록
            </MenuItem>
            <MenuItem
              onClick={() => {
                removeCookie('user');
                dispatch(clearUser());
                navigate('/');
              }}
            >
              로그아웃
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              onClick={() => {
                dispatch(setModalStatus('email'));
              }}
            >
              로그인
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(setModalStatus('email'));
              }}
            >
              회원가입
            </MenuItem>
          </>
        )}
      </DropdownMenu>
    </MenuContainer>
  );
}
