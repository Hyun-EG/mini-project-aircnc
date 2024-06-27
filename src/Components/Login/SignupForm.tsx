import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SignupFormSchema,
  SignupFormSchemaType,
} from '../../schema/userSchema.ts';
import Form from '../Form.tsx';
import Input from '../Input.tsx';
import Select from '../Select.tsx';
import Button from '../Button.tsx';

type SignupFormFields = SignupFormSchemaType;

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormFields>({
    resolver: zodResolver(SignupFormSchema),
  });

  const onSubmit: SubmitHandler<SignupFormFields> = (data) => {
    console.log(errors, data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h3>에어씨엔씨에 오신 것을 환영합니다.</h3>
      <Input
        register={register('nickname')}
        label="닉네임"
        message={errors.nickname?.message}
        type="text"
        placeholder="2자리 이상의 닉네임"
      />
      <Input
        register={register('email')}
        label="이메일"
        message={errors.email?.message}
        type="text"
        placeholder="예: abc@xyz.com"
      />
      <Input
        register={register('password')}
        label="비밀번호"
        message={errors.password?.message}
        type="password"
        placeholder="숫자, 알파벳 대문자, 특수문자를 모두 사용"
      />
      <Input
        register={register('confirmPassword')}
        message={errors.confirmPassword?.message}
        type="password"
        placeholder="비밀번호 확인"
      />
      <Select register={register('question')} label="비밀번호 찾기 질문">
        <option value="" hidden>
          비밀번호 찾기 질문을 선택해 주세요.
        </option>
        <option value="treasure">나의 보물 1호는?</option>
        <option value="friend">제일 친한 친구는?</option>
        <option value="elementary_school">내가 졸업한 초등학교 이름은?</option>
        <option value="book">기억에 남는 책 이름은?</option>
      </Select>
      <Input
        register={register('answer')}
        message={errors.answer?.message}
        type="text"
        placeholder="정답 :"
      />
      <Button type="submit">회원가입</Button>
    </Form>
  );
}

export default SignupForm;
