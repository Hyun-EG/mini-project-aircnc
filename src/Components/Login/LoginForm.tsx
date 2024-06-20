import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Form from '../Form.tsx';
import Input from '../Input.tsx';
import Button from '../Button.tsx';

export const LoginFormSchema = z.object({
  email: z.string().email({ message: '올바른 이메일 형식으로 입력해 주세요.' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 최소 8자리 이상으로 입력해 주세요.' }),
});

export type LoginFormFields = z.infer<typeof LoginFormSchema>;

function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormFields>({
    resolver: zodResolver(LoginFormSchema),
  });

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
