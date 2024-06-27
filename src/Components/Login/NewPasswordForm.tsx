import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  NewPasswordFormSchema,
  NewPasswordFormSchemaType,
} from '../../schema/userSchema.ts';
import Form from '../Form.tsx';
import Input from '../Input.tsx';
import SubmitButton from './SubmitButton.tsx';

export type NewPasswordFormFields = NewPasswordFormSchemaType;

function NewPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewPasswordFormFields>({
    mode: 'onTouched',
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
        message={errors.password?.message}
        type="password"
        placeholder="새 비밀번호"
      />
      <Input
        register={register('confirmPassword')}
        message={errors.confirmPassword?.message}
        type="password"
        placeholder="새 비밀번호 확인"
      />
      <SubmitButton isSubmitting={isSubmitting}>변경하기</SubmitButton>
    </Form>
  );
}

export default NewPasswordForm;
