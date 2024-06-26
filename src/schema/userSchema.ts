import { z } from 'zod';

const NICKNAME = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 12,
  MIN_ERROR_MESSAGE: '닉네임은 최소 2자리 이상으로 입력해 주세요.',
  MAX_ERROR_MESSAGE: '닉네임은 최대 12자리 이하로 입력해 주세요.',
};

const PASSWORD = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 16,
  MIN_ERROR_MESSAGE: '비밀번호는 최소 8자리 이상으로 입력해 주세요.',
  MAX_ERROR_MESSAGE: '비밀번호는 최대 16자리 이하로 입력해 주세요.',
  FORMAT_REGEX: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%^&*]).*$/,
  FORMAT_ERROR_MESSAGE:
    '비밀번호는 숫자, 영문 대문자, 특수문자를 한번 이상 사용한 조합으로 입력해 주세요.',
};

const CONFIRM_PASSWORD = {
  CONFIRM_ERROR_MESSAGE: '비밀번호 확인이 일치하지 않습니다.',
};

const EMAIL = {
  FORMAT_ERROR_MESSSAGE: '올바른 이메일 형식으로 입력해 주세요.',
};

const ANSWER = {
  MIN_LENGTH: 1,
  MAX_LENGTH: 12,
  MIN_ERROR_MESSAGE: '비밀번호 찾기 답을 정확히 입력해 주세요.',
  MAX_ERROR_MESSAGE: '비밀번호 찾기 답은 최대 12자리 이하로 입력해 주세요.',
};

export const UserSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
  question: z.string(),
  answer: z.string(),
});

export const LoginFormSchema = UserSchema.pick({
  email: true,
  password: true,
});

export const SignupFormSchema = UserSchema.omit({ id: true })
  .extend({
    nickname: z
      .string()
      .min(NICKNAME.MIN_LENGTH, { message: NICKNAME.MIN_ERROR_MESSAGE })
      .max(NICKNAME.MAX_LENGTH, { message: NICKNAME.MAX_ERROR_MESSAGE }),
    email: z.string().email({ message: EMAIL.FORMAT_ERROR_MESSSAGE }),
    password: z
      .string()
      .min(PASSWORD.MIN_LENGTH, { message: PASSWORD.MIN_ERROR_MESSAGE })
      .max(PASSWORD.MAX_LENGTH, { message: PASSWORD.MAX_ERROR_MESSAGE })
      .regex(PASSWORD.FORMAT_REGEX, { message: PASSWORD.FORMAT_ERROR_MESSAGE }),
    confirmPassword: z.string(),
    question: z.string(),
    answer: z
      .string()
      .min(ANSWER.MIN_LENGTH, {
        message: ANSWER.MIN_ERROR_MESSAGE,
      })
      .max(ANSWER.MAX_LENGTH, {
        message: ANSWER.MAX_ERROR_MESSAGE,
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: CONFIRM_PASSWORD.CONFIRM_ERROR_MESSAGE,
    path: ['confirmPassword'],
  });

export const FindPasswordFormSchema = UserSchema.pick({
  email: true,
  question: true,
  answer: true,
});

export const NewPasswordFormSchema = UserSchema.pick({
  password: true,
  confirmPassword: true,
})
  .extend({
    password: z
      .string()
      .min(PASSWORD.MIN_LENGTH, { message: PASSWORD.MIN_ERROR_MESSAGE })
      .max(PASSWORD.MAX_LENGTH, { message: PASSWORD.MAX_ERROR_MESSAGE })
      .regex(PASSWORD.FORMAT_REGEX, { message: PASSWORD.FORMAT_ERROR_MESSAGE }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: CONFIRM_PASSWORD.CONFIRM_ERROR_MESSAGE,
    path: ['confirmPassword'],
  });

export type UserSchemaType = z.infer<typeof UserSchema>;
export type User = Omit<UserSchemaType, 'confirmPassword'>;
export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;
export type SignupFormSchemaType = z.infer<typeof SignupFormSchema>;
export type FindPasswordFormSchemaType = z.infer<typeof FindPasswordFormSchema>;
export type NewPasswordFormSchemaType = z.infer<typeof NewPasswordFormSchema>;
