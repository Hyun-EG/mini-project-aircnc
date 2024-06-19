import { useEffect, useState } from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm.tsx';
import SignupForm from './SignupForm.tsx';
import FindPasswordForm from './FindPasswordForm.tsx';

const LoginModalLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 32px;
  background-color: white;
  box-sizing: border-box;
  overflow: scroll;
  @media (min-width: 769px) {
    top: 50%;
    left: 50%;
    width: fit-content;
    height: fit-content;
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

type LoginModalStatus = 'login' | 'signup' | 'findPassword';

interface LoginModalProps {
  initialStatus: LoginModalStatus;
  isOpenModal: boolean;
}

function LoginModal({ initialStatus, isOpenModal }: LoginModalProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [status, setStatus] = useState<LoginModalStatus>(initialStatus);

  const handleCloseModalClick = () => {
    setIsVisible(false);
  };

  const toPage = (status: LoginModalStatus) => {
    return () => {
      setStatus(status);
    };
  };

  useEffect(() => {
    setIsVisible(isOpenModal);
  }, [isOpenModal]);

  return (
    isVisible && (
      <>
        <LoginModalBackground onClick={handleCloseModalClick} />
        <LoginModalLayout>
          <LoginModalCloseButton onClick={handleCloseModalClick}>
            X
          </LoginModalCloseButton>
          {status !== 'findPassword' && (
            <h3>에어씨엔씨에 오신 것을 환영합니다.</h3>
          )}
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
        </LoginModalLayout>
      </>
    )
  );
}

export default LoginModal;
