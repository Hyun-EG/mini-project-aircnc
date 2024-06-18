import { SubmitHandler, useForm } from 'react-hook-form';
import Form from '../Form.tsx';
import Input from '../Input.tsx';
import Button from '../Button.tsx';

export interface LoginFormFields {
  email: string;
  password: string;
}

function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormFields>();

  const onSubmit: SubmitHandler<LoginFormFields> = (data) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input register={register('email')} type="text" placeholder="이메일" />
      <Input
        register={register('password')}
        type="password"
        placeholder="비밀번호"
      />
      <Button type="submit">로그인</Button>
    </Form>
  );
}

export default LoginForm;
