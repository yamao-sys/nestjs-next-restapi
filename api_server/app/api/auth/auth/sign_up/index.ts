/* eslint-disable */
import type * as Types from '../../@types';

export type Methods = {
  /** 会員登録 */
  post: {
    status: 200;
    /** 会員登録成功 */
    resBody: Types.SignUpResponseDto;
    reqBody: Types.SignUpDto;
  };
};
