/* eslint-disable */
/** 会員登録のリクエストのDTO */
export type SignUpDto = {
  email: string;
  password: string;
};

/** 会員登録のレスポンス */
export type SignUpResponseDto = {
  id: string;
  email: string;
};

/** Sign in params. */
export type SignInDto = {
  email: string;
  password: string;
};
