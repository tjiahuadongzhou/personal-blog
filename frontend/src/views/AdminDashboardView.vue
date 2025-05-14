<template>
  <div class="admin-dashboard">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h1>文章管理后台</h1>
          <div>
            <el-button type="primary" @click="handleCreatePost">
              <el-icon><Plus /></el-icon> 新建文章
            </el-button>
            <router-link to="/admin/posts/new" class="fallback-link">
              备用链接: 新建文章
            </router-link>
          </div>
        </div>
      </template>
      
      <el-table
        v-loading="isLoading"
        :data="posts"
        stripe
        style="width: 100%"
        empty-text="暂无文章数据"
      >
        <el-table-column prop="title" label="标题" min-width="180" />
        
        <el-table-column prop="createdAt" label="创建时间" width="180">
          <template #default="scope">
            {{ formatDate(scope.row.createdAt) }}
          </template>
        </el-table-column>
        
        <el-table-column prop="published" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.published ? 'success' : 'info'">
              {{ scope.row.published ? '已发布' : '草稿' }}
            </el-tag>
          </template>
        </el-table-column>
        
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="scope">
            <el-button-group>
              <el-button 
                type="primary" 
                @click="handleEditPost(scope.row._id)"
                size="small"
              >
                <el-icon><Edit /></el-icon> 编辑
              </el-button>
              
              <el-button 
                type="danger" 
                @click="handleDelete(scope.row._id)"
                size="small"
              >
                <el-icon><Delete /></el-icon> 删除
              </el-button>
            </el-button-group>
            <router-link :to="`/admin/posts/edit/${scope.row._id}`" class="fallback-link-small">
              备用: 编辑
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAllAdminPosts, deletePost } from '../api/posts';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Plus } from '@element-plus/icons-vue';

const router = useRouter();
const posts = ref([]);
const isLoading = ref(true);

// 处理新建文章按钮点击
const handleCreatePost = () => {
  console.log('点击了新建文章按钮');
  router.push({
    name: 'AdminPostCreate'
  });
};

// 处理编辑文章按钮点击
const handleEditPost = (postId) => {
  console.log('点击了编辑按钮，文章ID:', postId);
  router.push({
    name: 'AdminPostEdit',
    params: { id: postId }
  });
};

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

// 获取所有文章
const fetchPosts = async () => {
  isLoading.value = true;
  
  try {
    const response = await getAllAdminPosts();
    posts.value = response.data;
  } catch (error) {
    console.error('获取文章列表失败:', error);
    ElMessage.error('获取文章列表失败');
  } finally {
    isLoading.value = false;
  }
};

// 删除文章
const handleDelete = async (postId) => {
  try {
    await ElMessageBox.confirm(
      '确定要删除这篇文章吗？此操作不可恢复',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    );
    
    await deletePost(postId);
    ElMessage.success('文章已成功删除');
    // 删除成功后刷新列表
    fetchPosts();
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除文章失败:', error);
      ElMessage.error('删除文章失败');
    }
  }
};

onMounted(() => {
  fetchPosts();
});
</script>

<style scoped>
.admin-dashboard {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.fallback-link {
  display: block;
  margin-top: 8px;
  font-size: 12px;
  color: #333;
  text-decoration: underline;
}

.fallback-link-small {
  display: block;
  margin-top: 8px;
  font-size: 12px;
  color: #333;
  text-decoration: underline;
}
</style> 