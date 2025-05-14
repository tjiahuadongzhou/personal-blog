const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '标题不能为空'],
    trim: true
  },
  content: {
    type: String,
    required: [true, '内容不能为空']
  },
  published: {
    type: Boolean,
    default: false
  },
  imageUrl: {
    type: String
  }
}, { 
  timestamps: true // 自动管理 createdAt 和 updatedAt
});

// 文章查询前处理中间件
postSchema.pre('find', function() {
  // 对于公开查询，默认只返回已发布的文章
  if (!this.getQuery().adminRequest) {
    this.find({ published: true });
  }
  // 移除内部字段
  this.select('-__v');
});

module.exports = mongoose.model('Post', postSchema); 