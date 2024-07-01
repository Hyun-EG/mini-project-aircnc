import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import { IconMenu2, IconUserCircle } from '@tabler/icons-react';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { setModalStatus } from '../../redux/slices/loginModalSlice.ts';
import { clearUser } from '../../redux/slices/userSlice.ts';
import Button from '../Button.tsx';

const MenuContainer = styled.nav`
  position: relative;
`;

const MenuIconLayout = styled.figure`
  display: flex;
  gap: 0.5rem;
`;

const DropdownMenu = styled.menu`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 300%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0;
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  @media (min-width: 601px) {
    width: 150%;
  }
  @media (min-width: 1024px) {
    width: 200%;
  }
`;

const MenuItem = styled.li`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

interface MenuProps {
  windowWidth: number;
}

export default function HeaderMenu({ windowWidth }: MenuProps) {
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
      {windowWidth < 601 ? (
        <Button $size="small" $shape="circle" $color="white" $border>
          <MenuIconLayout>
            <IconUserCircle size={24} color="#5a5a5a" />
          </MenuIconLayout>
        </Button>
      ) : (
        <Button $size="small" $shape="rounded" $color="white" $border>
          <MenuIconLayout>
            <IconMenu2 size={28} color="#5a5a5a" />
            <IconUserCircle size={28} color="#5a5a5a" />
          </MenuIconLayout>
        </Button>
      )}
      {isOpen && (
        <DropdownMenu>
          {user ? (
            <>
              <MenuItem>예약 목록</MenuItem>
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
      )}
    </MenuContainer>
  );
}
