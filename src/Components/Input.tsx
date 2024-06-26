import { InputHTMLAttributes, createElement, forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage.tsx';

const InputLayout = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 16px;
  box-sizing: border-box;
  background-color: inherit;
  font-size: 1.25rem;
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn<string>;
  message?: string | undefined;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ register = {}, message = '', ...props }, ref) => (
    <label htmlFor={register ? register.name : ''}>
      {createElement(InputLayout, { ref, ...register, ...props })}
      <ErrorMessage>{message}</ErrorMessage>
    </label>
  ),
);
Input.displayName = 'Input';

export default Input;
