/* eslint-disable */
import type * as Types from '../@types';

export type Methods = {
  /** ログインユーザのTODOを全て取得 */
  get: {
    status: 200;
    /** TODO一覧の取得完了 */
    resBody: Types.FetchAllTodosDto;
  };

  /** ログインユーザのTODOを作成 */
  post: {
    status: 201;
    /** TODOの作成成功 */
    resBody: Types.CreateTodoResponseDto;
    reqBody: Types.CreateTodoDto;
  };
};
