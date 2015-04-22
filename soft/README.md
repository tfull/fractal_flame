# Fractal Flame (soft)

This is written by Scala.

## The Difference from "hard"

* You do not need to set parameters of functions. Those are randomly set.
* You do not need to set probability of variations. Those are randomly set.
* Some parameters are randomly set. So you cannot get arbitrary result and cannot have reproducibility.

## Validation

* Scala: Scala 2.11.6

## Usage

### Compilation

```
bash compile.sh
```
or
```
make
```

### Execution

```
bash execute.sh $(input)
```
$(input) means input file.


### Cleanup

```
bash clean.sh
```
or
```
make clean
```

# フラクタルフレーム (soft)

Scala で記述されている。

## "hard" との違い
* 関数のパラメータを設定する必要が無い。
* variations の確率を設定する必要が無い。
* パラメータが自動でランダムに設定されるため、意図的な結果を得にくく、再現性がとれない。沢山のデータを作って好きな画像を選択するという用途で使うと良い。

## 動作確認

* Scala: Scala 2.11.6

## 使い方

### コンパイル方法
```
bash compile.sh
```
あるいは  
```
make
```

### 実行
```
bash execute.sh $input
```
$input は入力ファイル名  
$input の拡張子を ppm, png に変更したものが image ディレクトリ内に生成される。

### バイナリの削除
```
bash clean.sh
```
あるいは  
```
make clean
```
