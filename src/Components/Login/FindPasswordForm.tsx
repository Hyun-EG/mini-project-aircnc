import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FindPasswordFormSchema,
  FindPasswordFormSchemaType,
} from '../../schema/userSchema.ts';
import Form from '../Form.tsx';
import Select from '../Select.tsx';
import Input from '../Input.tsx';
import Button from '../Button.tsx';

type FindPasswordFormFields = FindPasswordFormSchemaType;

function FindPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindPasswordFormFields>({
    resolver: zodResolver(FindPasswordFormSchema),
  });

  const onSubmit: SubmitHandler<FindPasswordFormFields> = (data) => {
    console.log(errors, data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h3>이메일과 비밀번호 찾기 답변을 입력해 주세요.</h3>
      <Input register={register('email')} type="text" placeholder="이메일" />
      <Select register={register('question')}>
        <option value="" hidden>
          비밀번호 찾기 질문을 선택해 주세요.
        </option>
        <option value="treasure">나의 보물 1호는?</option>
        <option value="friend">제일 친한 친구는?</option>
        <option value="elementary_school">내가 졸업한 초등학교 이름은?</option>
        <option value="book">기억에 남는 책 이름은?</option>
      </Select>
      <Input register={register('answer')} type="text" placeholder="정답 :" />
      <Button type="submit">비밀번호 찾기</Button>
    </Form>
  );
}

export default FindPasswordForm;
