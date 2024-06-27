import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState, AppDispatch } from '../../redux/store.ts';
import {
  LoginModalStatus,
  setModalStatus,
} from '../../redux/slices/loginModalSlice.ts';
import LoginForm from './LoginForm.tsx';
import SignupForm from './SignupForm.tsx';
import FindPasswordForm from './FindPasswordForm.tsx';
import NewPasswordForm from './NewPasswordForm.tsx';
import PasswordChangeMessage from './PasswordChangeMessage.tsx';
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
  }
`;

const LoginModalCloseButton = styled.button`
  width: 2rem;
  height: 2rem;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  background-color: white;
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
`;

const LoginModalLinkNav = styled(LoginModalLinkText)``;

const LoginModalLinkButton = styled.button`
  padding: 0;
  margin: 0;
  display: inline-block;
  color: #ff385c;
  background-color: inherit;
  border: none;
  cursor: pointer;
`;

function LoginModal() {
  const modalStatus = useSelector(
    (state: RootState) => state.loginModal.status,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [status, setStatus] = useState<LoginModalStatus>(modalStatus);

  const handleCloseModal = () => {
    dispatch(setModalStatus(null));
  };

  const toPage = (status: LoginModalStatus) => {
    return () => {
      dispatch(setModalStatus(status));
    };
  };

  useEffect(() => {
    setStatus(modalStatus);
  }, [modalStatus]);

  return (
    status && (
      <>
        <LoginModalBackground onClick={handleCloseModal} />
        <LoginModalLayout>
          <LoginModalCloseButton onClick={handleCloseModal}>
            X
          </LoginModalCloseButton>
          <LoginModalLogo src={LogoImage} />
          {status === 'login' && (
            <>
              <LoginForm />
              <LoginModalLinkText>
                <p>계정이 없거나 비밀번호를 잊으셨나요?</p>
                <LoginModalLinkNav>
                  <LoginModalLinkButton
                    type="button"
                    onClick={toPage('signup')}
                  >
                    가입하기
                  </LoginModalLinkButton>
                  <span>|</span>
                  <LoginModalLinkButton
                    type="button"
                    onClick={toPage('findPassword')}
                  >
                    비밀번호 찾기
                  </LoginModalLinkButton>
                </LoginModalLinkNav>
              </LoginModalLinkText>
            </>
          )}
          {status === 'signup' && (
            <>
              <SignupForm />
              <LoginModalLinkNav>
                <p>이미 계정이 있으신가요?</p>
                <LoginModalLinkButton type="button" onClick={toPage('login')}>
                  로그인 하러 가기
                </LoginModalLinkButton>
              </LoginModalLinkNav>
            </>
          )}
          {status === 'findPassword' && <FindPasswordForm />}
          {status === 'newPassword' && <NewPasswordForm />}
          {status === 'changeComplete' && (
            <PasswordChangeMessage onClick={toPage('login')} />
          )}
        </LoginModalLayout>
      </>
    )
  );
}

export default LoginModal;
