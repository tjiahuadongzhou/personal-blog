const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { 
  getAllPosts, 
  getPostById, 
  createPost, 
  updatePost, 
  deletePost,
  uploadImage
} = require('../controllers/postController');

// 配置Multer存储
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function(req, file, cb) {
    // 生成唯一文件名: 时间戳-原始文件名
    const uniquePrefix = Date.now() + '-';
    cb(null, uniquePrefix + file.originalname);
  }
});

// 限制只上传图片文件
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('不支持的文件类型，仅支持: jpeg, jpg, png, gif, webp'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// 获取所有文章（包括未发布的）
router.get('/posts', getAllPosts);

// 获取单篇文章详情（用于编辑）
router.get('/posts/:id', getPostById);

// 创建新文章
router.post('/posts', createPost);

// 更新文章
router.put('/posts/:id', updatePost);

// 删除文章
router.delete('/posts/:id', deletePost);

// 上传图片
router.post('/upload', upload.single('image'), uploadImage);

module.exports = router; 