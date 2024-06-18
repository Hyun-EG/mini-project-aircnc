import { useEffect, useState } from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm.tsx';
import SignupForm from './SignupForm.tsx';
import FindPasswordForm from './FindPasswordForm.tsx';

const LoginModalLayout = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px;
  background-color: black;
  border-radius: 16px;
`;

const LoginModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const LoginModalLinkText = styled.nav`
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
`;

const LoginModalLinkButton = styled.button`
  padding: 0;
  margin: 0;
  display: inline-block;
  color: #ff385c;
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

  const handleOnBackgroundClick = () => {
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
        <LoginModalBackground onClick={handleOnBackgroundClick} />
        <LoginModalLayout>
          {status !== 'findPassword' && (
            <h3>에어씨엔씨에 오신 것을 환영합니다.</h3>
          )}
          {status === 'login' && (
            <>
              <LoginForm />
              <LoginModalLinkText>
                <p>계정이 없거나 비밀번호를 잊으셨나요?</p>
                <LoginModalLinkButton type="button" onClick={toPage('signup')}>
                  가입하기
                </LoginModalLinkButton>
                <span>|</span>
                <LoginModalLinkButton
                  type="button"
                  onClick={toPage('findPassword')}
                >
                  비밀번호 찾기
                </LoginModalLinkButton>
              </LoginModalLinkText>
            </>
          )}
          {status === 'signup' && (
            <>
              <SignupForm />
              <LoginModalLinkText>
                <p>이미 계정이 있으신가요?</p>
                <LoginModalLinkButton type="button" onClick={toPage('login')}>
                  로그인 하러 가기
                </LoginModalLinkButton>
              </LoginModalLinkText>
            </>
          )}
          {status === 'findPassword' && <FindPasswordForm />}
        </LoginModalLayout>
      </>
    )
  );
}

export default LoginModal;
