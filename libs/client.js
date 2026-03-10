//これは「microcms-js-sdkの初期化」を行うファイルです。
//「microcms-js-sdk」とは？
//microCMSを使うためのライブラリです。

import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN,
  apiKey: process.env.API_KEY,
});
