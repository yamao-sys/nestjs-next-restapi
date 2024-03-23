/* eslint-disable */
/** TODO一覧のレスポンスのDTO */
export type FetchAllTodosResponseDto = {
	todos?:
		| {
				id: string;
				title: string;
				content: string;
		  }[]
		| undefined;
};

/** TODO取得時のレスポンスのDTO */
export type FetchTodoResponseDto = {
	id: string;
	title: string;
	content: string;
};

/** TODO作成のrequest DTO */
export type CreateTodoDto = {
	title: string;
	content: string;
};

/** TODO作成のresponse DTO */
export type CreateTodoResponseDto = {
	title?: string | undefined;
	content?: string | undefined;
	errors?: string[] | undefined;
};

/** TODO更新のrequest DTO */
export type UpdateTodoDto = {
	title: string;
	content: string;
};

/** TODO更新のresponse DTO */
export type UpdateTodoResponseDto = {
	title?: string | undefined;
	content?: string | undefined;
	errors?: string[] | undefined;
};

/** TODO削除のresponse DTO */
export type DeleteTodoResponseDto = {
	message: string;
};
