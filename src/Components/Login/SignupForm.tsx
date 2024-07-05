import { useSelector, useDispatch } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styled from 'styled-components';
import { RootState } from '../../redux/store.ts';
import {
  setMessage,
  setModalStatus,
} from '../../redux/slices/loginModalSlice.ts';
import {
  SignupFormSchema,
  SignupFormSchemaType,
  QUESTION_VALUES,
  QUESTION_OBJECT,
} from '../../schema/userSchema.ts';
import { useSignUp } from '../../hooks/auth.tsx';
import Form from '../Form.tsx';
import Input from '../Input.tsx';
import Select from '../Select.tsx';
import SubmitButton from './SubmitButton.tsx';

const SignupTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
`;

type SignupFormFields = SignupFormSchemaType;

function SignupForm() {
  const email = useSelector((state: RootState) => state.loginModal.email);
  const dispatch = useDispatch();
  const { mutateAsync: signUp } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignupFormFields>({
    mode: 'onTouched',
    resolver: zodResolver(SignupFormSchema),
  });

  const onSubmit: SubmitHandler<SignupFormFields> = async (data) => {
    try {
      const { confirmPassword: _, ...userWithoutEmail } = data;
      const response = await signUp({ ...userWithoutEmail, email });

      if (response.result.result_code === 200) {
        dispatch(setMessage('회원가입이 완료되었습니다.'));
        dispatch(setModalStatus('message'));
        return;
      }

      setError('nickname', {
        message: '중복된 닉네임입니다.',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <SignupTitle>회원가입 완료하기</SignupTitle>
      <Input
        register={register('nickname')}
        label="닉네임"
        message={errors.nickname?.message}
        type="text"
        placeholder="2자리 이상의 닉네임"
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
      <Select
        register={register('question')}
        label="비밀번호 찾기 질문"
        message={errors.question?.message}
      >
        <option value="" hidden>
          비밀번호 찾기 질문을 선택해 주세요.
        </option>
        {QUESTION_VALUES.map((value) => (
          <option value={value} key={value}>
            {QUESTION_OBJECT[value]}
          </option>
        ))}
      </Select>
      <Input
        register={register('answer')}
        message={errors.answer?.message}
        type="text"
        placeholder="정답 :"
      />
      <SubmitButton isSubmitting={isSubmitting}>회원가입</SubmitButton>
    </Form>
  );
}

export default SignupForm;
