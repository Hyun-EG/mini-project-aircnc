import { InputHTMLAttributes, createElement, forwardRef } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
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

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<FieldValues> | object;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ register = {}, ...props }, ref) =>
    createElement(InputLayout, { ref, ...register, ...props }),
);
Input.displayName = 'Input';

export default Input;
