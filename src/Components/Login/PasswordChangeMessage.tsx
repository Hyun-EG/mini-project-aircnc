import styled from 'styled-components';
import Button from '../Button.tsx';

const MessageLayout = styled.h3``;

interface MessageProps {
  onClick: () => void;
}

function PasswordChangeMessage({ onClick }: MessageProps) {
  return (
    <>
      <MessageLayout>비밀번호 변경이 완료되었습니다.</MessageLayout>
      <Button onClick={onClick}>확인</Button>
    </>
  );
}

export default PasswordChangeMessage;
