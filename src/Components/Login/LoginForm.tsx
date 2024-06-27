import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RootState } from '../../redux/store.ts';
import { setUser } from '../../redux/slices/userSlice.ts';
import {
  setIsFailed,
  clearModalState,
} from '../../redux/slices/loginModalSlice.ts';
import {
  LoginFormSchema,
  LoginFormSchemaType,
  User,
} from '../../schema/userSchema.ts';
import Form from '../Form.tsx';
import Input from '../Input.tsx';
import LoginModalTitle from './LoginModalTitle.tsx';
import SubmitButton from './SubmitButton.tsx';

export type LoginFormFields = LoginFormSchemaType;

function LoginForm() {
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.loginModal.email);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormFields>({
    resolver: zodResolver(LoginFormSchema),
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

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      const users: User[] = await fetchUser();
      if (!users) {
        throw new Error();
      }

      const matchEmail = users.filter((user) => user.email === email);
      if (!matchEmail.length) {
        throw new Error();
      }

      const isMatchPassword = matchEmail[0].password === data.password;
      if (!isMatchPassword) {
        throw new Error();
      }

      dispatch(setUser(matchEmail[0]));
      dispatch(clearModalState());
    } catch (error) {
      console.error(error);
      dispatch(setIsFailed(true));
      setError('password', {
        message: '비밀번호가 일치하지 않습니다.',
      });
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
