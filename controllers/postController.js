const Post = require('../models/Post');

// 获取所有文章 (用于后台管理)
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '服务器错误',
      error: error.message
    });
  }
};

// 获取所有已发布文章 (用于前台展示)
exports.getPublishedPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    
    const posts = await Post.find({ published: true })
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);
    
    const total = await Post.countDocuments({ published: true });
    
    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '服务器错误',
      error: error.message
    });
  }
};

// 根据ID获取单篇文章
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: '找不到该文章'
      });
    }
    
    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '服务器错误',
      error: error.message
    });
  }
};

// 创建新文章
exports.createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    
    res.status(201).json({
      success: true,
      message: '文章创建成功',
      data: post
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: '文章创建失败',
      error: error.message
    });
  }
};

// 更新文章
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: '找不到该文章'
      });
    }
    
    res.status(200).json({
      success: true,
      message: '文章更新成功',
      data: post
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: '文章更新失败',
      error: error.message
    });
  }
};

// 删除文章
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: '找不到该文章'
      });
    }
    
    res.status(200).json({
      success: true,
      message: '文章已成功删除'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '文章删除失败',
      error: error.message
    });
  }
};

exports.getAdminPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, published } = req.query;
    const query = { adminRequest: true };
    
    if (published !== undefined) {
      query.published = published === 'true';
    }
    
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
      
    const total = await Post.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 上传图片
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: '请上传图片文件'
      });
    }

    // 构建图片URL
    const imageUrl = `/uploads/${req.file.filename}`;
    
    return res.status(200).json({
      success: true,
      imageUrl: imageUrl,
      message: '图片上传成功'
    });
  } catch (error) {
    console.error('上传图片失败:', error);
    return res.status(500).json({
      success: false,
      message: '上传图片失败'
    });
  }
}; 