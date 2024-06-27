import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  padding: 1rem 0;
  border: none;
  border-radius: 16px;
  color: #fff;
  background-color: #ff385c;
  font-size: 1.25rem;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    filter: brightness(90%);
  }
`;

export default Button;
