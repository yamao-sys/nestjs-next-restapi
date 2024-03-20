/* eslint-disable */
import type * as Types from '../../@types';

export type Methods = {
  /** ログインユーザのTODOを取得 */
  get: {
    status: 200;
    /** TODOの取得成功 */
    resBody: Types.FetchTodoDto;
  };

  /** ログインユーザのTODOの更新 */
  put: {
    status: 200;
    /** TODOの更新成功 */
    resBody: Types.UpdateTodoResponseDto;
    reqBody: Types.UpdateTodoDto;
  };

  /** ログインユーザのTODOの削除 */
  delete: {
    status: 200;
    /** TODOの削除成功 */
    resBody: Types.DeleteTodoResponseDto;
  };
};
