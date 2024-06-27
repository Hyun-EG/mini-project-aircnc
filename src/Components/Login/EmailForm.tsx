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
  User,
} from '../../schema/userSchema.ts';
import Form from '../Form.tsx';
import Input from '../Input.tsx';
import LoginModalTitle from './LoginModalTitle.tsx';
import SubmitButton from './SubmitButton.tsx';

export type EmailFormFields = EmailFormSchemaType;

function EmailForm() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormFields>({
    resolver: zodResolver(EmailFormSchema),
  });

  const fetchUser = async () => {
    try {
      const response = await fetch('/src/assets/users.json');
      const users = await response.json();

      return users;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const onSubmit: SubmitHandler<EmailFormFields> = async (data) => {
    try {
      const users: User[] = await fetchUser();
      if (!users) {
        throw new Error();
      }

      const matchEmail = users.filter((user) => user.email === data.email);
      if (!matchEmail.length) {
        dispatch(setModalStatus('signup'));
      }

      dispatch(setEmail(matchEmail[0].email));
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
