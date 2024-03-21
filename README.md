# nestjs-next-restapi

Nest.jsのREST API構築(OpenAPI aspida)

Nest.jsのアーキテクチャ
https://zenn.dev/morinokami/articles/nestjs-overview

【migration】
参考
・https://typeorm.io/migrations#creating-a-new-migration
・https://qiita.com/jpnm0415shkm/items/f7208f7925adf33e215b

【migration作成】
npx ts-node ./node_modules/.bin/typeorm migration:generate -d ./data-source.ts ./migrations/path

【migration実行】
npx ts-node ./node_modules/.bin/typeorm migration:run -d ./data-source.ts

【CRUDの構築】
参考
・https://zenn.dev/engineerhikaru/articles/69eb781a7fb5e0#2.-typeorm%E3%81%AE%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97
・https://thriveread.com/typeormmodule-with-forroot-and-forfeature/

【OpenAPI】
参考
・https://zenn.dev/dyoshikawa/articles/ed61d6bf0e8ef1
・https://buildersbox.corp-sansan.com/entry/2023/08/14/182118
・https://note.com/shift_tech/n/n66f43685f2f9
・https://qiita.com/m_mitsuhide/items/1bd7c81ba31642de4ba3
・https://zenn.dev/dyoshikawa/articles/ed61d6bf0e8ef1#express-openapi-validator%E3%81%A7api%E3%83%90%E3%83%AA%E3%83%87%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3
・https://zenn.dev/kondo/articles/a1cf004449742c#express-openapi-validator

選定ポイント
- フロントエンドとバックエンドをともにtypescriptを使用していればnpm経由で比較的容易に導入できる
	- Aspida
		- https://zenn.dev/dyoshikawa/articles/ed61d6bf0e8ef1
		- https://github.com/aspida/openapi2aspida
		- https://github.com/aspida/aspida/tree/main/packages/aspida-fetch#readme
		- モックサーバとしてmswがある
			- https://github.com/mswjs/msw
			- Aspidaで自動生成したレスポンスの型と組み合わせることで型安全なモックサーバを立てる
				- → バックエンドの実装を待たずにフロントエンドの開発も進められる
	- OpenApiGeneratorはバックエンドとフロントエンドが異なる言語の時に良さそう

- OpenAPI Generator
	- https://5thfloor.co.jp/blog/webapp-development-with-openapi-and-typescript
- openapi-typescript
	- https://github.com/drwpow/openapi-typescript
- orval
	- https://orval.dev/

【openapi.ymlからスキーマファイルを作成する】
npm run openapi-gen

◆ swaggerを1ファイルにまとめると肥大化してくるな...
- swagger-merger
	- https://techblog.finatext.com/swagger-merger-5e29bd27907

☆ GoでSwaggerファイル分割を行うにあたっての参考
・https://techblog.finatext.com/split-swagger-file-generate-code-in-oapi-codegen-c8c2dfbdc39d

ファイル分割したものを一つに
npx swagger-merger -i ../swagger/todos/index.yml -o ../swagger/todos/swagger.yml

一つにまとめたymlをもとに型ファイルを作成
rm -rf api/todos && npx openapi2aspida -i ../swagger/todos/swagger.yml -o api/todos

【参考】
・https://zenn.dev/ryota0222/articles/b811120b7d2701
・https://zenn.dev/mizu4ma/articles/d3b937b321f3b4

それぞれのエンドポイントごとにバリデータを設定
【参考】
・https://github.com/cdimascio/express-openapi-validator/blob/master/examples/9-nestjs/src/app.module.ts
・https://qiita.com/mana-vv/items/6d6946085e360883e5ad


## ServerComponentに関して
https://qiita.com/newbee1939/items/7ce919f9a1a7153582b8

## ServerActions or API?
https://monotein.com/blog/server-actions-or-api

- Server Actrions
	- メリット
		- 手軽でコード量を抑えられる
		- Typescript一色で書けるので型安全
	- デメリット
		- SQLインジェクションなどの脆弱性の危険性 → 適切なセキュリティ対策
		- バックエンドもTypescriptが扱えるメンバーが揃った体制でないと開発がきつそう

本リポジトリでは従来通りのAPI Routesでやってみる
