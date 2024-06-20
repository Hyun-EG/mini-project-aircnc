import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormSchema } from '../../schema/userSchema.ts';
import Form from '../Form.tsx';
import Input from '../Input.tsx';
import Button from '../Button.tsx';

export type LoginFormFields = z.infer<typeof LoginFormSchema>;

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormFields> = (data) => {
    console.log(errors, data);
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
