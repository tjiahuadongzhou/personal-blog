<template>
  <div class="home-container">
    <h1 class="page-title">最新博客文章</h1>
    
    <div v-if="isLoading" class="loading-indicator">
      加载中...
    </div>
    
    <div v-else-if="posts.length > 0" class="posts-list">
      <div v-for="post in posts" :key="post._id" class="post-item">
        <router-link :to="`/posts/${post._id}`" class="post-link">
          <h2 class="post-title">{{ post.title }}</h2>
          
          <div v-if="post.imageUrl" class="post-image">
            <img :src="post.imageUrl" alt="文章图片">
          </div>
          
          <p class="post-summary">
            {{ truncateContent(post.content) }}
          </p>
        </router-link>
      </div>
    </div>
    
    <div v-else class="no-posts-message">
      暂无已发布的文章
    </div>

    <!-- 分页控件 -->
    <div v-if="totalPages > 1" class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalItems"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPublishedPosts } from '../api/posts';
import { ElMessage } from 'element-plus';

// 响应式变量
const posts = ref([]);
const isLoading = ref(true);
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(0);
const totalPages = ref(0);

// 截断文章内容，显示前200个字符
const truncateContent = (content) => {
  if (!content) return '';
  return content.length > 200 ? content.substring(0, 200) + '...' : content;
};

// 处理页码变化
const handlePageChange = (page) => {
  currentPage.value = page;
  fetchPosts();
  // 滚动到页面顶部
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// 获取文章数据
const fetchPosts = async () => {
  isLoading.value = true;
  
  try {
    const response = await getPublishedPosts(currentPage.value, pageSize.value);
    if (response.success) {
      posts.value = response.data;
      totalItems.value = response.total || 0;
      totalPages.value = response.totalPages || Math.ceil(totalItems.value / pageSize.value);
    } else {
      ElMessage.error(response.message || '获取文章列表失败');
      posts.value = [];
    }
  } catch (error) {
    console.error('获取文章失败:', error);
    ElMessage.error('获取文章列表失败，请稍后再试');
    posts.value = [];
  } finally {
    isLoading.value = false;
  }
};

// 组件挂载后获取数据
onMounted(() => {
  fetchPosts();
});
</script>

<style scoped>
.home-container {
  padding: 20px 0;
}

.no-posts-message {
  text-align: center;
  padding: 40px 0;
  color: var(--text-muted);
  font-size: 1.2rem;
}

.loading-indicator {
  text-align: center;
  padding: 40px 0;
  color: var(--text-muted);
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 20px;
}
</style> 