import React from 'react';
import styled from 'styled-components';

interface GuestSelectProps {
  isOpen: boolean;
}

const GuestSelectContainer = styled.div<GuestSelectProps>`
  width: 30vh;
  max-height: ${(props) => (props.isOpen ? '25vh' : '0')};
  position: absolute;
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
`;

const ConfirmButton = styled.button`
  width: 80%;
  height: 5vh;
  margin-top: 10px;
  background-color: #ff385c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 2vh;
`;

type GuestType = 'adult' | 'child' | 'cat';

interface GuestProps {
  isOpen: boolean;
  counts: Record<GuestType, number>;
  onChange: (type: GuestType, delta: number) => void;
  onConfirm: () => void;
}

const getLabel = (type: GuestType): string => {
  switch (type) {
    case 'adult':
      return '성인';
    case 'child':
      return '어린이';
    case 'cat':
      return '고양이';
    default:
      return '';
  }
};

export default function Guest({
  isOpen,
  counts,
  onChange,
  onConfirm,
}: GuestProps) {
  return (
    <GuestSelectContainer isOpen={isOpen}>
      {(['adult', 'child', 'cat'] as GuestType[]).map((type) => (
        <GuestOption key={type}>
          <GuestOptionLabel>{getLabel(type)}</GuestOptionLabel>
          <GuestOptionCounter>
            <GuestOptionButton
              onClick={(e) => {
                e.stopPropagation();
                onChange(type, -1);
              }}
            >
              -
            </GuestOptionButton>
            <div>{counts[type]}</div>
            <GuestOptionButton
              onClick={(e) => {
                e.stopPropagation();
                onChange(type, 1);
              }}
            >
              +
            </GuestOptionButton>
          </GuestOptionCounter>
        </GuestOption>
      ))}
      <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
    </GuestSelectContainer>
  );
}
