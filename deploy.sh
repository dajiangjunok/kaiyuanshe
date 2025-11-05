#!/bin/bash
set -e
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

export PATH=$PATH:/usr/local/go/bin
export GOPROXY=https://goproxy.cn,direct

# ================= 配置 =================
BASE_DIR=$HOME/website
TMP_DIR=/tmp/deploy_$(date +%s)

mkdir -p $TMP_DIR

# echo "🔄 拉取最新代码..."
git -C $BASE_DIR reset --hard
git -C $BASE_DIR pull origin main

# ================= 前端 =================
echo "📦 构建前端到临时目录..."
cp -r $BASE_DIR $TMP_DIR/frontend
cd $TMP_DIR/frontend
npm install
npm run build

echo "🚀 同步前端到生产目录..."
rsync -a --delete $TMP_DIR/frontend/ $BASE_DIR/

echo "♻️ 热重载前端服务..."
pm2 describe frontend >/dev/null 2>&1 \
  && pm2 reload frontend \
  || pm2 start npm --name frontend -- start --prefix $BASE_DIR

# ================= 后端 =================
echo "🔨 构建后端到临时目录..."
mkdir -p $TMP_DIR/backend
cd $BASE_DIR/kaiyuanshe
go build -o $TMP_DIR/backend/app

echo "♻️ 替换后端二进制..."
mv $TMP_DIR/backend/app $BASE_DIR/kaiyuanshe/app

echo "♻️ 重启后端服务..."
sudo systemctl restart kaiyuanshe

# ================= 清 =================
rm -rf $TMP_DIR

echo "✅ 部署完成！"

