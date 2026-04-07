# DevLog

## 概要

microCMS（Headless CMS）を使用し、Next.js × TypeScriptで構築したブログサイトです。
APIから記事データを取得し、ISR / SSGを用いたデータ取得・表示の設計から実装まで一貫して行いました。
パフォーマンスと更新性を両立した構成を意識しています。

## URL

https://next-microcms-blog-fawn.vercel.app/

## 使用技術

- microCMS（Headless CMS）
- Next.js（ISR / SSG）
- TypeScript
- Tailwind CSS
- Styled-components
- Jest（テスト）
- Git / GitHub
- SEO設定（Next.js）
- Vercel（デプロイ）

## 主な機能

- 記事一覧表示
- 記事詳細ページ表示
- microCMSからのデータ取得（API連携）
- ISRによる記事更新反映
- SEOを意識したメタデータ設定
- レスポンシブ対応
- テストコードによるAPI処理の検証

## 工夫した点

- microCMSのAPIを活用し、記事一覧・詳細ページのデータ取得処理を設計
- ISR / SSGを用いて、パフォーマンスと更新性を両立した構成を実装
- TypeScriptを導入し、型定義やジェネリクスを活用して型安全な開発を実現
- コンポーネント設計を意識し、再利用性・保守性の高い構成を構築
- Jestを用いてAPIモックを作成し、データ取得処理のテストを実施
- SEOを意識した設計を行い、検索エンジンへの最適化に対応

## セットアップ方法

以下の手順でローカル環境で動作確認できます。

```
npm install
npm run dev
```

## 環境変数

microCMSのAPIを利用するため、以下の環境変数を設定してください。
各値はmicroCMSで発行したものを使用して「.env.localファイルなどに」記載してください。

```
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

## テスト実行

npm run test
