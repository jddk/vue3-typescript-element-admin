### 介绍

> 本项目参考 vue-element-admin 项目开发 https://panjiachen.github.io/vue-element-admin-site/zh/guide/

vue3-typescript-element-admin 是一个后台前端解决方案，它基于 vue3、typescript 和 element-plus 实现。
它使用了最新的前端技术栈，

### 目录结构

```bash
├── doc # 项目文档,采用docsify
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── icons                  # 项目所有 svg icons
│   ├── layout                 # 全局 layout
│   ├── router                 # 路由
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   └── main.js                # 入口文件 加载组件 初始化等
├── tests                      # 测试
├── .env.dev                   # 开发环境变量
└── .env.prod                  # 生产环境变量
```

### 安装

```
# 克隆项目
git clone https://github.com/jddk/vue3-typescript-element-admin

# 进入项目目录
cd vue3-typescript-element-admin

# 安装依赖
npm install

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 本地开发 启动项目
npm run serve
```
