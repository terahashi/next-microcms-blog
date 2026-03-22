//「styled-componentsなどの動的スタイルで使用するレスポンシブ」

//名前付きエクスポート
export const breakpoints = {
  tablet: '768px',
  pc: '1024px',
} as const; //「as const」で『値は絶対に変わらない“固定値”』として扱う。
