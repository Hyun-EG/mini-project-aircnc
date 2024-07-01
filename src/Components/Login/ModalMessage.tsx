import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setModalStatus } from '../../redux/slices/loginModalSlice.ts';
import Button from '../Button.tsx';

const MessageLayout = styled.h3``;

interface MessageProps {
  message?: string;
}

function ModalMessage({ message = '' }: MessageProps) {
  const dispatch = useDispatch();

  return (
    <>
      <MessageLayout>{message}</MessageLayout>
      <Button
        $size="medium"
        $shape="rounded"
        $color="primary"
        onClick={() => {
          dispatch(setModalStatus('email'));
        }}
      >
        확인
      </Button>
    </>
  );
}

export default ModalMessage;
