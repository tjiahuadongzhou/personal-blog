import axios from 'axios';

// 创建Axios实例，设置基础URL
const api = axios.create({
  baseURL: 'http://localhost:3000'
});

// 获取已发布的文章列表（前台展示）
export async function getPublishedPosts(page = 1, limit = 10) {
  try {
    const response = await api.get('/api/posts', {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('获取已发布文章列表失败:', error);
    throw error;
  }
}

// 获取单篇文章详情
export async function getPostById(id) {
  try {
    const response = await api.get(`/api/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('获取文章详情失败:', error);
    throw error;
  }
}

// 获取所有文章列表（后台管理）
export async function getAllAdminPosts(page = 1, limit = 10) {
  try {
    const response = await api.get('/api/admin/posts', {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('获取管理员文章列表失败:', error);
    throw error;
  }
}

// 创建新文章
export async function createPost(postData) {
  try {
    const response = await api.post('/api/admin/posts', postData);
    return response.data;
  } catch (error) {
    console.error('创建文章失败:', error);
    throw error;
  }
}

// 更新文章
export async function updatePost(id, postData) {
  try {
    const response = await api.put(`/api/admin/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error('更新文章失败:', error);
    throw error;
  }
}

// 删除文章
export async function deletePost(id) {
  try {
    const response = await api.delete(`/api/admin/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('删除文章失败:', error);
    throw error;
  }
}

// 上传图片
export async function uploadImage(file) {
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await api.post('/api/admin/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('上传图片失败:', error);
    throw error;
  }
} 