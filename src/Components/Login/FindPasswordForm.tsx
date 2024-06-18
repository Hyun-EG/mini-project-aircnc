import { SubmitHandler, useForm } from 'react-hook-form';
import Form from '../Form.tsx';
import Select from '../Select.tsx';
import Input from '../Input.tsx';
import Button from '../Button.tsx';

export interface FindPasswordFormFields {
  findPasswordQuestion: string;
  findPasswordAnswer: string;
}

function FindPasswordForm() {
  const { register, handleSubmit } = useForm<FindPasswordFormFields>();

  const onSubmit: SubmitHandler<FindPasswordFormFields> = (data) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
      <Button type="submit">비밀번호 찾기</Button>
    </Form>
  );
}

export default FindPasswordForm;
