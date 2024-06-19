import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginFormFields } from './LoginForm.tsx';
import { FindPasswordFormFields } from './FindPasswordForm.tsx';
import Form from '../Form.tsx';
import Input from '../Input.tsx';
import Select from '../Select.tsx';
import Button from '../Button.tsx';

type SignupFormFields = LoginFormFields &
  FindPasswordFormFields & {
    nickname: string;
    verifyPassword: string;
  };

function SignupForm() {
  const { register, handleSubmit } = useForm<SignupFormFields>();

  const onSubmit: SubmitHandler<SignupFormFields> = (data) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input register={register('nickname')} type="text" placeholder="닉네임" />
      <Input register={register('email')} type="text" placeholder="이메일" />
      <Input
        register={register('password')}
        type="password"
        placeholder="비밀번호"
      />
      <Input
        register={register('verifyPassword')}
        type="password"
        placeholder="비밀번호 확인"
      />
      <Select register={register('findPasswordQuestion')}>
        <option value="" hidden>
          비밀번호 찾기 질문을 선택해 주세요.
        </option>
        <option value="treasure">나의 보물 1호는?</option>
        <option value="friend">제일 친한 친구는?</option>
        <option value="elementary_school">내가 졸업한 초등학교 이름은?</option>
        <option value="book">기억에 남는 책 이름은?</option>
      </Select>
      <Input
        register={register('findPasswordAnswer')}
        type="text"
        placeholder="정답 :"
      />
      <Button type="submit">회원가입</Button>
    </Form>
  );
}

export default SignupForm;
