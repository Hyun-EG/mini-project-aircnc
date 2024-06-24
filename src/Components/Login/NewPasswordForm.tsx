import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewPasswordFormSchema } from '../../schema/userSchema.ts';
import Form from '../Form.tsx';
import Input from '../Input.tsx';
import Button from '../Button.tsx';

export type NewPasswordFormFields = z.infer<typeof NewPasswordFormSchema>;

function NewPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordFormFields>({
    resolver: zodResolver(NewPasswordFormSchema),
  });

  const onSubmit: SubmitHandler<NewPasswordFormFields> = (data) => {
    console.log(errors, data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h3>새로운 비밀번호를 입력해 주세요.</h3>
      <Input
        register={register('password')}
        type="password"
        placeholder="새 비밀번호"
      />
      <Input
        register={register('confirmPassword')}
        type="password"
        placeholder="새 비밀번호 확인"
      />
      <Button type="submit">변경하기</Button>
    </Form>
  );
}

export default NewPasswordForm;
