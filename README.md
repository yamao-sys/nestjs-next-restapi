# nestjs-next-restapi-sample

NestJS × Next.jsのREST APIのサービス構築(OpenAPI aspida)

## 技術構成
◆ バックエンド
- NestJS
- typeorm
- class-validator
- cookie-parser
- @nestjs/swagger
- express-openapi-validator

◆ フロントエンド
- Next.js(v14.1.4)
- swagger-merger
- aspida
- @aspida/fetch
- openapi2aspida

## OpenAPIの選定背景
バックエンド・フロントエンドを分けて開発することが主流になっている
→ バックエンドのAPI完成待ちが発生しがち
→ 事前にスキーマを定義しておくことでバックエンド・フロントエンドそれぞれ並行して開発を進めることができる
→ 全体としての工数を削減する

※ TypeScript一色で開発するような技術スタックのサービスの場合、メンバー皆がフルスタックであることが想定される。
→ Swagger UIは優先度を下げる(YMLファイルによる定義ファイルで仕様の確認を行うイメージ)

他にも
- 型安全性をバックエンド・フロントエンド間で享受できる
	- バックエンド
		- リクエスト・レスポンスのバリデーション
			- 特にExpressではexpress-openapi-validatorを使用することにより、バリデーションコードを随所に仕込まなくても良くなるため、コードの可読性にも寄与
	- フロントエンド
		- 型およびAPIクライアントの自動生成 → 工数削減

今回は、TypeScriptで使用できるOpenAPIのライブラリのうち、手軽に利用できるaspidaを採用。

## 起こり得る課題と対応
### 膨大な長さのSwaggerファイル
単一のSwagger(YAMLファイル)でAPI定義書を作成すると、開発が進むにつれて量が多くなり複雑性も大きくなることで可読性が損なわれてくる
→ エンドポイントのドメインごとにディレクトリを作成し、それぞれrootファイルおよびpathとschemaを定義していくことで分割する

ディレクトリ構成は以下

- api_server/app/swagger
	- domain_name
		- actions.yml(rootファイル)
		- components(リクエスト・レスポンスのDTO)
			- *.dto.ts
		- swagger.yml(分割したファイルを統合したSwagger。swagger-mergerにより作成する。)
	- errors(共通のschema)

それぞれのドメインごとのswagger.ymlを元に
・frontendでAPIクライアントおよびリクエスト・レスポンスの型を自動生成する(後述する`API定義書と実装の乖離`のコマンドにて)
・api_serverでリクエストとレスポンスのバリデーションを行う(express-openapi-validator)

### API定義書と実装の乖離
APIクライアントや型を手動で作成していると、API定義書のSwaggerのメンテナンスが形骸化してしまってくる。
→ Swaggerを元にフロントエンドのAPIクライアントや型を自動生成する、バックエンドのリクエスト・レスポンスのバリデーションを簡単に行えるように

・フロントエンドのAPIクライアントや型の自動生成
```
$ docker-compose exect frontend sh

$ sh generate_types.sh -e (domain)
```
例) sh generate_types.sh -e todos

→ frontend/api/todos配下にAPIクライアントや型が生成される

## 仕様
- 認証
	- 会員登録
	- ログイン

- TODOリスト
	- 一覧表示
	- 作成
	- 更新
	- 削除

## 環境構築
```
$ docker-compose build

$ docker-compose up -d
```
