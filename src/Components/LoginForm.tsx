import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import Input from './Input.tsx';
import Button from './Button.tsx';

const LoginFormLayout = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  & :last-child {
    margin-top: 32px;
  }
`;

interface LoginFormFields {
  email: string;
  password: string;
}

function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormFields>();

  const onSubmit: SubmitHandler<LoginFormFields> = (data) => {
    console.log(data);
  };

  return (
    <LoginFormLayout onSubmit={handleSubmit(onSubmit)}>
      <Input register={register('email')} type="text" placeholder="E-mail" />
      <Input
        register={register('password')}
        type="password"
        placeholder="Password"
      />
      <Button type="submit">로그인</Button>
    </LoginFormLayout>
  );
}

export default LoginForm;
