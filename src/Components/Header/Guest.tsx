import styled from 'styled-components';

interface GuestSelectProps {
  isOpen: boolean;
}

const GuestSelectContainer = styled.div<GuestSelectProps>`
  width: 30vh;
  max-height: ${(props) => (props.isOpen ? '25vh' : '0')};
  position: absolute;
  padding: 1vh 0;
  top: 115%;
  left: 0;
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    max-height 0.3s ease-out,
    visibility 0.3s ease-out;
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  @media (max-width: 768px) {
    width: 20vh;
    height: 12vh;
  }
`;

const GuestOption = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1vh;
  border-bottom: 1px solid lightgrey;

  &:last-child {
    border-bottom: none;
  }
`;

const GuestOptionLabel = styled.div`
  font-size: 1.5vh;
  @media (max-width: 768px) {
    font-size: 2vh;
  }
`;

const GuestOptionCounter = styled.div`
  display: flex;
  align-items: center;
  font-size: 2vh;
`;

const GuestOptionButton = styled.button`
  width: 3vh;
  height: 3vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgrey;
  border-radius: 50%;
  background: none;
  cursor: pointer;
  font-size: 2vh;
  margin: 0 1vh;
  @media (max-width: 768px) {
    width: 4vh;
    height: 4vh;
  }
`;

const ConfirmButton = styled.button`
  width: 60%;
  height: 5vh;
  margin-top: 10px;
  background-color: #ff385c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 2vh;
  @media (max-width: 768px) {
    width: 40%;
  }
`;

type GuestType = 'total';

interface GuestProps {
  isOpen: boolean;
  counts: Record<GuestType, number>;
  onChange: (type: GuestType, delta: number) => void;
  onConfirm: () => void;
}

export default function Guest({
  isOpen,
  counts,
  onChange,
  onConfirm,
}: GuestProps) {
  return (
    <GuestSelectContainer isOpen={isOpen}>
      <GuestOption>
        <GuestOptionLabel>인원</GuestOptionLabel>
        <GuestOptionCounter>
          <GuestOptionButton
            onClick={(e) => {
              e.stopPropagation();
              onChange('total', -1);
            }}
          >
            -
          </GuestOptionButton>
          <div>{counts.total}</div>
          <GuestOptionButton
            onClick={(e) => {
              e.stopPropagation();
              onChange('total', 1);
            }}
          >
            +
          </GuestOptionButton>
        </GuestOptionCounter>
      </GuestOption>
      <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
    </GuestSelectContainer>
  );
}
