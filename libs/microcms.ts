//これは「microcms-js-sdkの初期化」を行うファイルです。
//「microcms-js-sdk」とは？
//microCMSを使うためのライブラリです。

//「microCMS SDK」を読み込む
import { createClient } from 'microcms-js-sdk';

// 環境変数に「MICROCMS_SERVICE_DOMAIN」が設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

// 環境変数に「MICROCMS_API_KEY」が設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

// Client SDKの初期化を行う(microCMS APIクライアントを作る)
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});
