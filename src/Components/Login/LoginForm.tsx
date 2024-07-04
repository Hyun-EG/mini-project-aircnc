import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RootState } from '../../redux/store.ts';
import {
  setIsFailed,
  clearModalState,
} from '../../redux/slices/loginModalSlice.ts';
import {
  LoginFormSchema,
  LoginFormSchemaType,
} from '../../schema/userSchema.ts';
import { useLogin } from '../../hooks/auth.tsx';
import Form from '../Form.tsx';
import Input from '../Input.tsx';
import LoginModalTitle from './LoginModalTitle.tsx';
import SubmitButton from './SubmitButton.tsx';

export type LoginFormFields = LoginFormSchemaType;

function LoginForm() {
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.loginModal.email);
  const { mutateAsync: logIn } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormFields>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      const response = await logIn({ email, password: data.password });

      if (response.resultCode === 200) {
        dispatch(clearModalState());
        return;
      }

      dispatch(setIsFailed(true));
      setError('password', {
        message: '비밀번호가 일치하지 않습니다.',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <LoginModalTitle>비밀번호를 입력해 주세요.</LoginModalTitle>
      <Input
        register={register('password')}
        message={errors.password?.message}
        type="password"
        placeholder="비밀번호"
      />
      <SubmitButton isSubmitting={isSubmitting}>로그인</SubmitButton>
    </Form>
  );
}

export default LoginForm;
