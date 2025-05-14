<template>
  <div class="category-posts">
    <h1 class="page-title">{{ category }} 分类</h1>
    
    <div v-if="loading" class="loading">
      加载中...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else>
      <div v-if="posts.length === 0" class="no-posts">
        该分类下暂无文章
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
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import postsApi from '../api/posts.js';

const route = useRoute();
const category = ref(route.params.category);

const posts = ref([]);
const loading = ref(true);
const error = ref(null);
const page = ref(1);
const totalPages = ref(0);

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// 获取分类文章列表
const fetchCategoryPosts = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const response = await postsApi.getPosts(page.value, 10, category.value);
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
  fetchCategoryPosts();
  window.scrollTo(0, 0);
};

// 监听路由参数变化
watch(() => route.params.category, (newCategory) => {
  category.value = newCategory;
  page.value = 1;
  fetchCategoryPosts();
});

onMounted(() => {
  fetchCategoryPosts();
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
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 10px;
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
</style> 