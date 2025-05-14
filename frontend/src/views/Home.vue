<template>
  <div class="home">
    <h1 class="page-title">最新文章</h1>
    
    <!-- 添加API连接测试按钮 -->
    <div class="api-test">
      <button @click="testApiConnection" class="test-btn">测试API连接</button>
      <div v-if="testResult" class="test-result" :class="{ success: testSuccess }">
        {{ testResult }}
      </div>
    </div>
    
    <div v-if="loading" class="loading">
      加载中...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else>
      <div v-if="posts.length === 0" class="no-posts">
        暂无文章
      </div>
      
      <div v-else class="posts-grid">
        <div v-for="post in posts" :key="post._id" class="post-card card">
          <router-link :to="{ name: 'PostDetail', params: { id: post._id }}">
            <div class="post-image">
              <img :src="post.coverImage" :alt="post.title">
            </div>
            <div class="post-content">
              <h2 class="post-title">{{ post.title }}</h2>
              <p class="post-meta">
                <span class="post-category">{{ post.category }}</span>
                <span class="post-date">{{ formatDate(post.createdAt) }}</span>
              </p>
              <p class="post-summary">{{ post.summary }}</p>
            </div>
          </router-link>
        </div>
      </div>
      
      <div class="pagination">
        <button 
          :disabled="page === 1" 
          @click="changePage(page - 1)"
          class="page-btn prev-btn"
        >
          上一页
        </button>
        
        <span class="page-info">{{ page }} / {{ totalPages || 1 }}</span>
        
        <button 
          :disabled="page === totalPages || totalPages === 0" 
          @click="changePage(page + 1)"
          class="page-btn next-btn"
        >
          下一页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import postsApi from '../api/posts.js';
import axios from 'axios';

const posts = ref([]);
const loading = ref(true);
const error = ref(null);
const page = ref(1);
const totalPages = ref(0);

// API测试相关
const testResult = ref('');
const testSuccess = ref(false);

// 测试API连接
const testApiConnection = async () => {
  try {
    const response = await axios.get('/api/test');
    testResult.value = response.data.message;
    testSuccess.value = true;
    console.log('API测试响应:', response.data);
  } catch (err) {
    testResult.value = '连接后端API失败: ' + (err.response?.data?.message || err.message);
    testSuccess.value = false;
    console.error('API测试错误:', err);
  }
};

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// 获取文章列表
const fetchPosts = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const response = await postsApi.getPosts(page.value);
    posts.value = response.data;
    totalPages.value = response.totalPages;
  } catch (err) {
    error.value = '获取文章列表失败，请稍后再试';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// 切换页码
const changePage = (newPage) => {
  page.value = newPage;
  fetchPosts();
  window.scrollTo(0, 0);
};

onMounted(() => {
  fetchPosts();
});
</script>

<style scoped>
.page-title {
  margin-bottom: 30px;
  font-size: 2rem;
  color: var(--secondary-color);
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.post-card {
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.post-card a {
  color: var(--text-color);
  display: block;
}

.post-image {
  height: 180px;
  overflow: hidden;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.post-card:hover .post-image img {
  transform: scale(1.05);
}

.post-content {
  padding: 15px;
}

.post-title {
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 10px;
}

.post-category {
  background-color: var(--primary-color);
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
}

.post-summary {
  font-size: 0.9rem;
  color: #555;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.page-btn {
  padding: 8px 15px;
  border-radius: 4px;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  margin: 0 15px;
}

.loading,
.error,
.no-posts {
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: #666;
}

.error {
  color: #e74c3c;
}

.api-test {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.test-btn {
  margin-right: 10px;
}

.test-result {
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
  color: red;
}

.test-result.success {
  color: green;
}
</style> 