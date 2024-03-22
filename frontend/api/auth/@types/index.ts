/* eslint-disable */
/** 会員登録のリクエストのDTO */
export type SignUpDto = {
	email: string;
	password: string;
};

/** 会員登録のレスポンス */
export type SignUpResponseDto = {
	email: string;
	errors?: string[] | undefined;
};

/** Sign in params. */
export type SignInDto = {
	email: string;
	password: string;
	errors?: string[] | undefined;
};

/** ログインのレスポンス */
export type SignInResponseDto = {
	errors: string[];
};

/** バリデーションエラー */
export type ValidationErrorResponseDto = {
	statusCode: number;
	message: string[];
	error: string;
};
