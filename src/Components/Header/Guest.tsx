import styled from 'styled-components';
import { IconPlus, IconMinus } from '@tabler/icons-react';
import Button from '../Button.tsx';

export const GuestSelectContainer = styled.div`
  position: absolute;
  width: fit-content;
  top: calc(100% + 0.5rem);
  right: 0;
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  padding: 1rem;
  @media (min-width: 601px) {
    width: 30%;
  }
`;

export const GuestOptionLabel = styled.label``;

export const GuestOptionCounter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const GuestTotalCount = styled.span`
  min-width: 2rem;
  display: flex;
  justify-content: center;
`;

type GuestType = 'total';

interface GuestProps {
  counts: Record<GuestType, number>;
  onChange: (delta: number) => void;
}

export default function Guest({ counts, onChange }: GuestProps) {
  return (
    <GuestSelectContainer>
      <GuestOptionLabel>인원</GuestOptionLabel>
      <GuestOptionCounter>
        <Button
          $size="small"
          $shape="circle"
          $color="white"
          $border
          onClick={() => {
            onChange(-1);
          }}
        >
          <IconMinus size={16} />
        </Button>
        <GuestTotalCount>{counts.total}</GuestTotalCount>
        <Button
          $size="small"
          $shape="circle"
          $color="white"
          $border
          onClick={() => {
            onChange(1);
          }}
        >
          <IconPlus size={16} />
        </Button>
      </GuestOptionCounter>
    </GuestSelectContainer>
  );
}
