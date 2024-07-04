import { useDispatch } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  setModalStatus,
  setEmail,
} from '../../redux/slices/loginModalSlice.ts';
import {
  EmailFormSchema,
  EmailFormSchemaType,
} from '../../schema/userSchema.ts';
import { useValidateEmail } from '../../hooks/auth.tsx';
import Form from '../Form.tsx';
import Input from '../Input.tsx';
import LoginModalTitle from './LoginModalTitle.tsx';
import SubmitButton from './SubmitButton.tsx';

export type EmailFormFields = EmailFormSchemaType;

function EmailForm() {
  const dispatch = useDispatch();
  const { mutateAsync: validateEmail } = useValidateEmail();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormFields>({
    resolver: zodResolver(EmailFormSchema),
  });

  const onSubmit: SubmitHandler<EmailFormFields> = async (data) => {
    try {
      const resultCode = await validateEmail(data.email);

      if (resultCode === 200) {
        dispatch(setModalStatus('signup'));
        return;
      }

      dispatch(setEmail(data.email));
      dispatch(setModalStatus('login'));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <LoginModalTitle>에어씨엔씨에 오신 것을 환영합니다.</LoginModalTitle>
      <LoginModalTitle>로그인 또는 회원가입</LoginModalTitle>
      <Input
        register={register('email')}
        message={errors.email?.message}
        type="text"
        placeholder="이메일"
      />
      <SubmitButton isSubmitting={isSubmitting}>계속</SubmitButton>
    </Form>
  );
}

export default EmailForm;
