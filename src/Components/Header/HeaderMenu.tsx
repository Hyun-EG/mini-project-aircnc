import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IconMenu2, IconUserCircle } from '@tabler/icons-react';
import { AppDispatch } from '../../redux/store.ts';
import { setModalStatus } from '../../redux/slices/loginModalSlice.ts';
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
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement | null>(null);

  const menuItemsWithToken = [
    {
      typeName: '위시리스트',
      callback: () => {
        navigate('/wishlist');
      },
    },
    {
      typeName: '예약 목록',
      callback: () => {
        navigate('/booked');
      },
    },
    {
      typeName: '로그아웃',
      callback: () => {
        localStorage.removeItem('token');
        navigate('/');
      },
    },
  ];

  const menuItemsWithoutToken = [
    {
      typeName: '로그인',
      callback: () => {
        dispatch(setModalStatus('email'));
      },
    },
    {
      typeName: '회원가입',
      callback: () => {
        dispatch(setModalStatus('email'));
      },
    },
  ];

  const toggleMenu = (): void => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <MenuContainer onClick={toggleMenu} ref={menuRef}>
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
          {token
            ? menuItemsWithToken.map((menu) => (
                <MenuItem key={menu.typeName} onClick={menu.callback}>
                  {menu.typeName}
                </MenuItem>
              ))
            : menuItemsWithoutToken.map((menu) => (
                <MenuItem key={menu.typeName} onClick={menu.callback}>
                  {menu.typeName}
                </MenuItem>
              ))}
        </DropdownMenu>
      )}
    </MenuContainer>
  );
}
