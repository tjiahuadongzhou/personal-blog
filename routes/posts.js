const express = require('express');
const router = express.Router();
const { getPublishedPosts, getPostById } = require('../controllers/postController');

// 测试路由
router.get('/test', (req, res) => {
  res.json({ message: '后端API连接测试成功', success: true });
});

// 获取所有已发布的文章
router.get('/posts', getPublishedPosts);

// 获取单个文章详情
router.get('/posts/:id', getPostById);

module.exports = router; 