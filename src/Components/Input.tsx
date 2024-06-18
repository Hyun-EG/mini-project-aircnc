import { createElement } from 'react';
import styled from 'styled-components';

const InputLayout = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 16px;
  box-sizing: border-box;
  background-color: inherit;
  font-size: 24px;
`;

function Input({ ...props }) {
  return createElement(InputLayout, { ...props });
}

export default Input;
