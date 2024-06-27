import { SelectHTMLAttributes, createElement, forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';

// TODO: 셀렉트 컴포넌트 스타일 커스텀
const SelectLayout = styled.select`
  width: 100%;
  padding: 16px;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 16px;
  box-sizing: border-box;
  background-color: inherit;
  font-size: 1rem;
`;

const SelectLabel = styled.label`
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  margin-top: 0.5rem;
`;

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  register?: UseFormRegisterReturn<string>;
  label?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, register = {}, label = '', ...props }, ref) => (
    <label htmlFor={register ? register.name : ''}>
      {label.length ? <SelectLabel>{label}</SelectLabel> : ''}
      {createElement(SelectLayout, { ref, ...register, ...props }, children)}
    </label>
  ),
);
Select.displayName = 'Select';

export default Select;
