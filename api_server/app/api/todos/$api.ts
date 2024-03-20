import type { AspidaClient, BasicHeaders } from 'aspida';
import type { Methods as Methods_1l17dp7 } from './todos';
import type { Methods as Methods_1614r9x } from './todos/_id@string';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/todos';
  const GET = 'GET';
  const POST = 'POST';
  const PUT = 'PUT';
  const DELETE = 'DELETE';

  return {
    todos: {
      _id: (val1: string) => {
        const prefix1 = `${PATH0}/${val1}`;

        return {
          /**
           * ログインユーザのTODOを取得
           * @returns TODOの取得成功
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods_1614r9x['get']['resBody'],
              BasicHeaders,
              Methods_1614r9x['get']['status']
            >(prefix, prefix1, GET, option).json(),
          /**
           * ログインユーザのTODOを取得
           * @returns TODOの取得成功
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods_1614r9x['get']['resBody'],
              BasicHeaders,
              Methods_1614r9x['get']['status']
            >(prefix, prefix1, GET, option)
              .json()
              .then((r) => r.body),
          /**
           * ログインユーザのTODOの更新
           * @returns TODOの更新成功
           */
          put: (option: {
            body: Methods_1614r9x['put']['reqBody'];
            config?: T | undefined;
          }) =>
            fetch<
              Methods_1614r9x['put']['resBody'],
              BasicHeaders,
              Methods_1614r9x['put']['status']
            >(prefix, prefix1, PUT, option).json(),
          /**
           * ログインユーザのTODOの更新
           * @returns TODOの更新成功
           */
          $put: (option: {
            body: Methods_1614r9x['put']['reqBody'];
            config?: T | undefined;
          }) =>
            fetch<
              Methods_1614r9x['put']['resBody'],
              BasicHeaders,
              Methods_1614r9x['put']['status']
            >(prefix, prefix1, PUT, option)
              .json()
              .then((r) => r.body),
          /**
           * ログインユーザのTODOの削除
           * @returns TODOの削除成功
           */
          delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods_1614r9x['delete']['resBody'],
              BasicHeaders,
              Methods_1614r9x['delete']['status']
            >(prefix, prefix1, DELETE, option).json(),
          /**
           * ログインユーザのTODOの削除
           * @returns TODOの削除成功
           */
          $delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods_1614r9x['delete']['resBody'],
              BasicHeaders,
              Methods_1614r9x['delete']['status']
            >(prefix, prefix1, DELETE, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      /**
       * ログインユーザのTODOを全て取得
       * @returns TODO一覧の取得完了
       */
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods_1l17dp7['get']['resBody'],
          BasicHeaders,
          Methods_1l17dp7['get']['status']
        >(prefix, PATH0, GET, option).json(),
      /**
       * ログインユーザのTODOを全て取得
       * @returns TODO一覧の取得完了
       */
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods_1l17dp7['get']['resBody'],
          BasicHeaders,
          Methods_1l17dp7['get']['status']
        >(prefix, PATH0, GET, option)
          .json()
          .then((r) => r.body),
      /**
       * ログインユーザのTODOを作成
       * @returns TODOの作成成功
       */
      post: (option: {
        body: Methods_1l17dp7['post']['reqBody'];
        config?: T | undefined;
      }) =>
        fetch<
          Methods_1l17dp7['post']['resBody'],
          BasicHeaders,
          Methods_1l17dp7['post']['status']
        >(prefix, PATH0, POST, option).json(),
      /**
       * ログインユーザのTODOを作成
       * @returns TODOの作成成功
       */
      $post: (option: {
        body: Methods_1l17dp7['post']['reqBody'];
        config?: T | undefined;
      }) =>
        fetch<
          Methods_1l17dp7['post']['resBody'],
          BasicHeaders,
          Methods_1l17dp7['post']['status']
        >(prefix, PATH0, POST, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH0}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
