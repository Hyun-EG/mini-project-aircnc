import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { IconX } from '@tabler/icons-react';
import { RootState, AppDispatch } from '../../redux/store.ts';
import {
  LoginModalStatus,
  setModalStatus,
  clearModalState,
} from '../../redux/slices/loginModalSlice.ts';
import EmailForm from './EmailForm.tsx';
import LoginForm from './LoginForm.tsx';
import SignupForm from './SignupForm.tsx';
import FindPasswordForm from './FindPasswordForm.tsx';
import NewPasswordForm from './NewPasswordForm.tsx';
import ModalMessage from './ModalMessage.tsx';
import Button from '../Button.tsx';
import LogoImage from '../../assets/images/logo.svg';

const LoginModalLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 32px;
  background-color: white;
  box-sizing: border-box;
  overflow-y: auto;
  z-index: 10000;
  @media (min-width: 769px) {
    top: 50%;
    left: 50%;
    width: fit-content;
    min-width: 27.5rem;
    height: fit-content;
    padding: 2rem;
    transform: translate(-50%, -50%);
    border-radius: 16px;
  }
`;

const LoginModalBackground = styled.div`
  display: none;
  @media (min-width: 769px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10000;
  }
`;

const LoginModalCloseButton = styled.div`
  width: fit-content;
  margin-left: auto;
  @media (min-width: 769px) {
    display: none;
  }
`;

const LoginModalLogo = styled.img`
  position: relative;
  display: block;
  margin: 0 auto;
  padding: 1rem 0;
`;

const LoginModalLinkText = styled.nav`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-size: 14px;
`;

const LoginModalLinkNav = styled(LoginModalLinkText)`
  margin-top: 1rem;
`;

const LoginModalLinkButton = styled.button`
  padding: 0;
  margin: 0;
  display: inline-block;
  color: #ff385c;
  background-color: inherit;
  font-size: 14px;
  border: none;
  cursor: pointer;
`;

function LoginModal() {
  const modalState = useSelector((state: RootState) => state.loginModal);
  const dispatch = useDispatch<AppDispatch>();
  const [status, setStatus] = useState<LoginModalStatus>(modalState.status);

  const handleCloseModal = () => {
    dispatch(clearModalState());
  };

  const toPage = (status: LoginModalStatus) => {
    return () => {
      dispatch(setModalStatus(status));
    };
  };

  useEffect(() => {
    setStatus(modalState.status);
  }, [modalState.status]);

  return (
    status && (
      <>
        <LoginModalBackground onClick={handleCloseModal} />
        <LoginModalLayout>
          <LoginModalCloseButton>
            <Button
              $size="small"
              $shape="circle"
              $color="white"
              onClick={handleCloseModal}
            >
              <IconX />
            </Button>
          </LoginModalCloseButton>
          <LoginModalLogo src={LogoImage} />
          {status === 'email' && <EmailForm />}
          {status === 'login' && (
            <>
              <LoginForm />
              {modalState.isFailed && (
                <LoginModalLinkNav>
                  <LoginModalLinkText>
                    혹시 비밀번호를 잃어버리셨나요?
                  </LoginModalLinkText>
                  <LoginModalLinkButton onClick={toPage('findPassword')}>
                    비밀번호 찾기
                  </LoginModalLinkButton>
                </LoginModalLinkNav>
              )}
            </>
          )}
          {status === 'signup' && <SignupForm />}
          {status === 'findPassword' && <FindPasswordForm />}
          {status === 'newPassword' && <NewPasswordForm />}
          {status === 'message' && <ModalMessage />}
        </LoginModalLayout>
      </>
    )
  );
}

export default LoginModal;
