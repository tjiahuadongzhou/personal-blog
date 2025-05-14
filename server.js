require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// 导入路由
const postsRoutes = require('./routes/posts');
const adminPostsRoutes = require('./routes/admin-posts');

// 创建Express实例
const app = express();
const PORT = process.env.PORT || 4000;

// 中间件
app.use(cors()); // 允许所有来源的跨域请求
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// 简单的根路由，用于测试服务器是否启动
app.get('/', (req, res) => {
  res.json({ message: 'Blog server is running!' });
});

// 挂载路由
app.use('/api', postsRoutes);
app.use('/api/admin', adminPostsRoutes);

// 生产环境静态文件服务
if (process.env.NODE_ENV === 'production') {
  // 提供静态文件
  app.use(express.static(path.join(__dirname, 'public')));
  
  // 对于所有非API请求，返回index.html（由Vue Router接管）
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

// 连接MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB 连接成功');
    
    // 启动服务器
    app.listen(PORT, () => {
      console.log(`服务器已启动，运行在 http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB 连接错误:', err);
    process.exit(1); // 数据库连接失败时退出应用
  });

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('服务器错误:', err.stack);
  res.status(500).json({ 
    success: false,
    message: '服务器内部错误' 
  });
}); 