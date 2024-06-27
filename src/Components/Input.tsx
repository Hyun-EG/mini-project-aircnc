import { InputHTMLAttributes, createElement, forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage.tsx';

const InputLayout = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #999;
  border-radius: 16px;
  outline-color: #ff385c;
  box-sizing: border-box;
  background-color: inherit;
  font-size: 1rem;
`;

const InputLabel = styled.label`
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  margin-top: 1rem;
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn<string>;
  label?: string;
  message?: string | undefined;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ register = {}, label = '', message = '', ...props }, ref) => (
    <label htmlFor={register ? register.name : ''}>
      {label.length ? <InputLabel>{label}</InputLabel> : ''}
      {createElement(InputLayout, { ref, ...register, ...props })}
      {message && <ErrorMessage>{message}</ErrorMessage>}
    </label>
  ),
);
Input.displayName = 'Input';

export default Input;
