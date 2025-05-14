<template>
  <div class="post-detail-container">
    <div v-if="isLoading" class="loading-container">
      <el-skeleton :rows="10" animated />
    </div>
    
    <div v-else-if="post" class="post-wrapper">
      <article class="post-content-wrapper">
        <header class="post-header">
          <h1 class="post-title">{{ post.title }}</h1>
          
          <div class="post-meta">
            <span class="post-date">发布于：{{ formatDate(post.createdAt) }}</span>
          </div>
        </header>
        
        <div v-if="post.imageUrl" class="post-image">
          <img :src="post.imageUrl" alt="文章图片" loading="lazy">
        </div>
        
        <!-- 使用Markdown渲染器显示内容 -->
        <div class="post-content">
          <MdPreview :modelValue="post.content" previewTheme="github" />
        </div>
      </article>
      
      <div class="post-navigation">
        <div v-if="prevPost" @click="navigateToPost(prevPost._id)" class="nav-item prev-post">
          <el-icon><ArrowLeft /></el-icon>
          <span>上一篇: {{ prevPost.title }}</span>
        </div>
        <div v-if="nextPost" @click="navigateToPost(nextPost._id)" class="nav-item next-post">
          <span>下一篇: {{ nextPost.title }}</span>
          <el-icon><ArrowRight /></el-icon>
        </div>
      </div>
    </div>
    
    <div v-else class="not-found-container">
      <el-empty description="文章未找到" />
      <el-button type="primary" @click="goToHomePage">返回首页</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPostById, getPublishedPosts } from '../api/posts';
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import { ElMessage } from 'element-plus';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';

const post = ref(null);
const isLoading = ref(true);
const route = useRoute();
const router = useRouter();
const prevPost = ref(null);
const nextPost = ref(null);

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// 导航到其他文章
const navigateToPost = (postId) => {
  isLoading.value = true;
  router.push(`/posts/${postId}`);
};

// 返回首页
const goToHomePage = () => {
  router.push('/');
};

// 获取上一篇和下一篇文章
const fetchAdjacentPosts = async (currentPostId) => {
  try {
    const response = await getPublishedPosts(1, 100); // 获取足够多的文章以找到相邻文章
    if (response.success && response.data) {
      const posts = response.data;
      const currentIndex = posts.findIndex(p => p._id === currentPostId);
      
      if (currentIndex > 0) {
        prevPost.value = posts[currentIndex - 1];
      }
      
      if (currentIndex < posts.length - 1) {
        nextPost.value = posts[currentIndex + 1];
      }
    }
  } catch (error) {
    console.error('获取相邻文章失败:', error);
  }
};

const fetchPost = async () => {
  const postId = route.params.id;
  
  if (postId) {
    try {
      // 滚动到页面顶部，保持稳定体验
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
      
      const response = await getPostById(postId);
      if (response.success) {
        post.value = response.data;
        
        // 获取上一篇和下一篇文章
        await fetchAdjacentPosts(postId);
        
        // 更新页面标题
        document.title = `${post.value.title} - 我的博客`;
        
        // 等待DOM更新后，强制重新计算布局
        await nextTick();
      } else {
        ElMessage.error(response.message || '获取文章详情失败');
        post.value = null;
      }
    } catch (error) {
      console.error('获取文章详情失败:', error);
      ElMessage.error('获取文章详情失败');
      post.value = null;
    } finally {
      isLoading.value = false;
    }
  } else {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchPost();
});

// 监听路由变化，重新获取文章
router.beforeEach((to, from, next) => {
  // 只有在文章详情页路由改变时才重新获取
  if (to.name === 'PostDetail' && from.name === 'PostDetail' && to.params.id !== from.params.id) {
    isLoading.value = true;
  }
  next();
});

// 监听路由参数变化，确保在同一组件内切换文章时也能更新内容
router.afterEach((to, from) => {
  if (to.name === 'PostDetail' && from.name === 'PostDetail' && to.params.id !== from.params.id) {
    fetchPost();
  }
});
</script>

<style scoped>
.post-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  min-height: calc(100vh - 230px); /* 减去header和footer的高度 */
  will-change: transform; /* 提高滚动性能 */
}

.post-wrapper {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* 防止内容溢出导致的布局问题 */
  contain: layout; /* 优化渲染性能 */
}

.post-content-wrapper {
  padding: 30px;
}

.post-header {
  margin-bottom: 24px;
}

.post-title {
  font-size: 2.2rem;
  color: var(--secondary-color);
  margin-bottom: 16px;
  line-height: 1.3;
  font-weight: 700;
}

.post-image {
  margin: 24px 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.post-image img {
  width: 100%;
  height: auto;
  max-height: 450px;
  object-fit: cover;
  display: block;
  transform: translateZ(0); /* 启用GPU加速 */
}

.post-meta {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--light-gray);
  padding-bottom: 16px;
}

.post-content {
  line-height: 1.8;
  font-size: 1.1rem;
  color: var(--text-color);
  margin-top: 32px;
  overflow-wrap: break-word; /* 防止长文本破坏布局 */
  contain: content; /* 优化渲染性能 */
}

.post-content :deep(img) {
  max-width: 100%;
  border-radius: 6px;
  height: auto;
  transform: translateZ(0); /* 启用GPU加速 */
}

.post-content :deep(pre) {
  background-color: #f6f8fa;
  padding: 16px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 16px 0;
}

.post-content :deep(code) {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.9em;
}

.post-content :deep(h2) {
  margin-top: 32px;
  margin-bottom: 16px;
  font-size: 1.6em;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--light-gray);
}

.post-content :deep(h3) {
  margin-top: 24px;
  margin-bottom: 16px;
  font-size: 1.3em;
}

.post-content :deep(blockquote) {
  border-left: 4px solid var(--primary-color);
  padding-left: 16px;
  color: var(--text-light);
  margin: 16px 0;
}

.post-content :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 16px 0;
}

.post-content :deep(th), 
.post-content :deep(td) {
  border: 1px solid var(--border-color);
  padding: 8px 12px;
  text-align: left;
}

.post-content :deep(th) {
  background-color: var(--light-gray);
}

.post-navigation {
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
  background-color: var(--light-gray);
  border-top: 1px solid var(--border-color);
}

.nav-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.2s;
  max-width: 45%;
}

.nav-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.nav-item span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.prev-post {
  margin-right: auto;
}

.next-post {
  margin-left: auto;
  text-align: right;
}

.loading-container, .not-found-container {
  padding: 40px;
  text-align: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.not-found-container .el-button {
  margin-top: 20px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .post-detail-container {
    padding: 16px;
  }
  
  .post-content-wrapper {
    padding: 20px;
  }

  .post-title {
    font-size: 1.8rem;
  }
  
  .post-navigation {
    flex-direction: column;
    gap: 12px;
  }
  
  .nav-item {
    max-width: 100%;
  }
}
</style> 