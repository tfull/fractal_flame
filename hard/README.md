# fractal flame (hard)
C++ で記述されている。

## hard との違い
1. `F(x, y) = (ax+by+c,dx+ey+f)`
のパラメータを設定する必要がある。
2. variations の確率を設定する必要がある。
3. 意図的な設計ができる。

## 使い方

### コンパイル
`bash compile.sh`  
または  
`make`

### 実行
#### フラクタルフレームの出力
`bash execute_render.sh $1 $2 $3`  
$1はパラメータの入力ファイル名  
$2は出力用の PPM ファイル名  
$3は出力用の PNG ファイル名  
あるいは
`./bin/render`  
標準入力にパラメータを入力  
標準出力に PPM データを出力

#### グリッドの出力
各 variation のグリッドを見るには、  
`bash execute_grid.sh $1 $2 $3`  
$1は variation の番号  
$2は出力用の PPM ファイル名  
$3は出力用の PNG ファイル名  
あるいは  
`./bin/grid $1`  
標準出力に PPM データが出力される。

### バイナリの削除
`bash clean.sh`  
あるいは  
`make clean`

## GUI

`gui/` 下で次を実行し、ブラウザで `localhost:4567` にアクセスする。

```
ruby server.rb
```

## Reference

- カラーセラピーライフ
  - https://www.i-iro.com/dic/
  -  (2021/10/23 アクセス)
