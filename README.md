# XPro 语言学习应用

一个使用现代Web技术栈构建的语言学习平台，帮助用户高效学习外语的应用原型。

## 项目特点

- 响应式设计，适配移动端和桌面端
- 个性化学习计划和进度跟踪
- 单词库管理和测试系统
- 统计分析和学习效果评估
- 交互式学习体验
- 现代化用户界面

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
xpro-language-app/
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
├── design/             # 设计原型和规格
│   ├── prototypes/     # HTML原型
│   └── specs/          # 设计规格
├── docs/               # 文档
├── scripts/            # 辅助脚本
├── .gitignore          # Git忽略配置
├── package.json        # 项目依赖
└── server.js           # 服务器入口
```

## 功能

- 用户注册和学习进度管理
- 单词库创建和管理
- 测试会话和学习模式
- 数据统计和学习分析
- 个性化学习路径

## 设计原型

本仓库包含项目的设计原型，位于`design/prototypes`目录下：
- 登录页面
- 主页
- 单词库管理
- 测试会话
- 学习统计
- 单词学习界面

## 贡献

欢迎提交问题和功能请求！随时通过提交PR来贡献代码。

## 许可证

此项目采用MIT许可证 - 详见LICENSE文件了解更多信息。 