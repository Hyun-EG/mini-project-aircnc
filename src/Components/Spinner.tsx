import styled, { keyframes } from 'styled-components';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerElement = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3f51b5;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${rotate} 1s linear infinite;
`;

function Spinner() {
  return (
    <SpinnerContainer>
      <SpinnerElement />
    </SpinnerContainer>
  );
}

export default Spinner;
