import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RootState } from '../../redux/store.ts';
import {
  setMessage,
  setModalStatus,
} from '../../redux/slices/loginModalSlice.ts';
import {
  FindPasswordFormSchema,
  FindPasswordFormSchemaType,
  QUESTION_VALUES,
  QUESTION_OBJECT,
} from '../../schema/userSchema.ts';
import { useFindPassword } from '../../hooks/auth.tsx';
import Form from '../Form.tsx';
import Select from '../Select.tsx';
import Input from '../Input.tsx';
import SubmitButton from './SubmitButton.tsx';

type FindPasswordFormFields = FindPasswordFormSchemaType;

function FindPasswordForm() {
  const email = useSelector((state: RootState) => state.loginModal.email);
  const dispatch = useDispatch();
  const { mutateAsync: findPassword } = useFindPassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FindPasswordFormFields>({
    resolver: zodResolver(FindPasswordFormSchema),
  });

  const onSubmit: SubmitHandler<FindPasswordFormFields> = async (data) => {
    try {
      const response = await findPassword({ ...data, email });

      if (response.resultCode === 200) {
        dispatch(setMessage(`임시 비밀번호는 ${response.body}입니다.`));
        dispatch(setModalStatus('message'));
        return;
      }

      setError('answer', {
        message: '비밀번호 찾기 질문 또는 답변이 일치하지 않습니다.',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h3>비밀번호 찾기 질문과 답변을 입력해 주세요.</h3>
      <Select
        register={register('question')}
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
      <SubmitButton isSubmitting={isSubmitting}>비밀번호 찾기</SubmitButton>
    </Form>
  );
}

export default FindPasswordForm;
