# 个人博客系统

一个使用现代Web技术栈构建的个人博客系统，提供文章发布、分类和管理功能。

## 项目预览

![博客首页预览](https://github.com/tjiahuadongzhou/personal-blog/blob/main/screenshots/blog_preview.html)

*博客首页 - 展示最新博客文章列表，包括技术、生活、思考等分类*

**注意:** 要查看完整效果图，请在浏览器中打开 http://localhost:5173

## 项目特点

- 现代化UI设计，响应式布局支持各种设备
- 文章分类浏览（技术、生活、思考等）
- 前后端分离架构
- Markdown编辑器支持丰富的内容创作
- 支持搜索和标签过滤

## 技术栈

- **前端**：Vue.js, Element Plus, Axios
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
# 同时运行前端和后端（在根目录）
npm run dev:full

# 或分别运行
# 后端 (根目录)
npm run dev

# 前端 (frontend目录)
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
│   │   ├── assets/     # 静态资源
│   │   ├── components/ # 组件
│   │   ├── views/      # 页面视图
│   │   ├── router/     # 路由配置
│   │   ├── App.vue     # 主应用组件
│   │   └── main.js     # 入口文件
├── public/             # 静态文件
├── .env                # 环境变量
├── server.js           # 服务器入口文件
└── package.json        # 项目依赖
```

## 功能

- 博客文章的创建、编辑和删除
- 文章分类和标签管理
- 评论系统
- 响应式设计，适配移动设备
- 管理员后台

## 贡献

欢迎提交问题和功能请求！随时通过提交PR来贡献代码。

## 许可证

此项目采用MIT许可证 - 详见LICENSE文件了解更多信息。 