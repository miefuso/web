# CSS設定・stylelint導入

## 日付

2026-03-06

## 作業概要

CSS の各種設定整備と stylelint の導入を行った。

---

## 実施内容

### 1. フォント設定

- Google Fonts（Noto Sans JP / Noto Serif JP / Noto Sans）を導入
- ウェイト：100 / 300 / 400 / 500 / 700 / 900 を読み込み
- `_variables.scss` にフォントファミリー変数・ウェイト変数を追加

```scss
$font-sans-jp: "Noto Sans JP", sans-serif;
$font-serif-jp: "Noto Serif JP", serif;
$font-sans: "Noto Sans", sans-serif;

$fw-thin: 100;
$fw-light: 300;
$fw-regular: 400;
$fw-medium: 500;
$fw-bold: 700;
$fw-black: 900;
```

### 2. フォントサイズ基準の設定

`html { font-size: 62.5%; }` を設定し `1rem = 10px` として計算できるようにした。

```scss
html {
  font-size: 62.5%;
}
body {
  font-size: $base-font-size;
} // 16px 相当
```

### 3. レスポンシブ対応（ブレイクポイント・mixin）

`_variables.scss` にブレイクポイント変数を追加し、`_mixin.scss` にメディアクエリ mixin を追加。

```scss
// モバイルファースト
@include mq-md { ... }   // min-width: 768px 以上

// デスクトップファースト
@include mq-down-md { ... } // max-width: 767px 以下
```

### 4. stylelint 導入

| パッケージ                       | 役割                         |
| -------------------------------- | ---------------------------- |
| `stylelint`                      | SCSS の静的解析              |
| `stylelint-config-standard-scss` | 標準ルールセット             |
| `stylelint-config-recess-order`  | CSS プロパティ記述順序の強制 |

```bash
npm run lint:css  # 実行コマンド
```

### 5. scss-lint から stylelint への移行

`.scss-lint.yml` のルールを `.stylelintrc.json` に移行。

| 旧ルール（scss-lint）              | 新ルール（stylelint）              |
| ---------------------------------- | ---------------------------------- |
| `ImportantRule`                    | `declaration-no-important`         |
| `Indentation: 2`                   | `indentation: 2`                   |
| `HexLength: short`                 | `color-hex-length: short`          |
| `HexNotation: lowercase`           | `color-hex-case: lower`            |
| `IdSelector`                       | `selector-max-id: 0`               |
| `FinalNewline`                     | `no-missing-end-of-source-newline` |
| `NameFormat: hyphenated_lowercase` | `selector-class-pattern`           |

---

## 次回タスク

- stylelint の動作確認・エラー修正
- トップページのスタイル実装（FV セクション）
