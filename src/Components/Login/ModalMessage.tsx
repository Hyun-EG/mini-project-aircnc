import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../redux/store.ts';
import { setModalStatus } from '../../redux/slices/loginModalSlice.ts';
import Button from '../Button.tsx';

const MessageLayout = styled.h3``;

function ModalMessage() {
  const message = useSelector((state: RootState) => state.loginModal.message);
  const dispatch = useDispatch();

  return (
    <>
      <MessageLayout>{message}</MessageLayout>
      <Button
        $size="medium"
        $shape="full"
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
