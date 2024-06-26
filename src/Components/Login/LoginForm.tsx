import { useDispatch } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { setUser } from '../../redux/slices/userSlice.ts';
import { setModalStatus } from '../../redux/slices/loginModalSlice.ts';
import {
  LoginFormSchema,
  LoginFormSchemaType,
  User,
} from '../../schema/userSchema.ts';
import Form from '../Form.tsx';
import Input from '../Input.tsx';
import Button from '../Button.tsx';
import ErrorMessage from '../ErrorMessage.tsx';

export type LoginFormFields = LoginFormSchemaType;

function LoginForm() {
  const dispatch = useDispatch();

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

      const matchEmail = users.filter((user) => user.email === data.email);
      if (!matchEmail.length) {
        throw new Error();
      }

      const isMatchPassword = matchEmail[0].password === data.password;
      if (!isMatchPassword) {
        throw new Error();
      }

      dispatch(setUser(matchEmail[0]));
      dispatch(setModalStatus(null));
    } catch (error) {
      console.error(error);
      setError('root', {
        message: '올바른 이메일이나 비밀번호가 아닙니다.',
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h3>에어씨엔씨에 오신 것을 환영합니다.</h3>
      <Input register={register('email')} type="text" placeholder="이메일" />
      <Input
        register={register('password')}
        message={errors.root?.message}
        type="password"
        placeholder="비밀번호"
      />
      <Button disabled={isSubmitting} type="submit">
        로그인
      </Button>
    </Form>
  );
}

export default LoginForm;
