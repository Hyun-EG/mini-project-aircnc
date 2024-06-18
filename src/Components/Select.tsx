import { SelectHTMLAttributes, createElement, forwardRef } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';

// TODO: 셀렉트 컴포넌트 스타일 커스텀
const SelectLayout = styled.select`
  width: 100%;
  padding: 16px;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 16px;
  box-sizing: border-box;
  background-color: inherit;
  font-size: 24px;
`;

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  register?: UseFormRegister<FieldValues> | object;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, register = {}, ...props }, ref) =>
    createElement(SelectLayout, { ref, ...register, ...props }, children),
);
Select.displayName = 'Select';

export default Select;
