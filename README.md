# 个人博客网站

一个使用现代Web技术栈构建的个人博客平台，提供文章发布、分类和管理功能。

## 项目特点

- 响应式设计，适配移动端和桌面端
- 文章分类和标签系统
- 管理员后台用于内容管理
- RESTful API设计
- Vue.js前端框架
- Node.js + Express后端

## 技术栈

- **前端**：Vue.js, HTML5, CSS3, JavaScript
- **后端**：Node.js, Express
- **数据库**：MongoDB (通过Mongoose ODM)
- **构建工具**：Vite

## 安装说明

1. 克隆仓库
```bash
git clone https://github.com/tjiahuadongzhou/my-personal-blog.git
cd my-personal-blog
```

2. 安装依赖
```bash
# 安装后端依赖
npm install

# 安装前端依赖
cd frontend
npm install
```

3. 配置环境变量
```bash
# 在根目录创建.env文件，添加必要的环境变量
PORT=3000
MONGODB_URI=你的MongoDB连接字符串
```

4. 运行项目
```bash
# 开发模式运行后端 (根目录)
npm run dev

# 开发模式运行前端 (frontend目录)
cd frontend
npm run dev
```

## 项目结构

```
my-personal-blog/
├── controllers/        # 控制器逻辑
├── models/             # 数据模型
├── routes/             # API路由
├── frontend/           # Vue前端项目
│   ├── src/            # 源代码
│   │   ├── api/        # API调用
│   │   ├── assets/     # 静态资源
│   │   ├── components/ # 组件
│   │   ├── views/      # 页面视图
│   │   ├── router/     # 路由配置
│   │   ├── App.vue     # 主应用组件
│   │   └── main.js     # 入口文件
├── docs/               # 文档
├── scripts/            # 辅助脚本
├── .gitignore          # Git忽略配置
├── package.json        # 项目依赖
└── server.js           # 服务器入口
```

## 功能

- 博客文章的创建、编辑和删除
- 文章分类和标签管理
- 响应式设计，良好的移动端体验
- 管理员后台

## 贡献

欢迎提交问题和功能请求！随时通过提交PR来贡献代码。

## 许可证

此项目采用MIT许可证 - 详见LICENSE文件了解更多信息。 