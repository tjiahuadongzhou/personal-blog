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
            <a href="/admin/posts/new" class="native-link">
              原生链接: 新建文章
            </a>
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
            <div>
              <router-link :to="`/admin/posts/edit/${scope.row._id}`" class="fallback-link-small">
                备用: 编辑
              </router-link>
              <a :href="`/admin/posts/edit/${scope.row._id}`" class="native-link-small">
                原生: 编辑
              </a>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.fallback-link {
  display: block;
  margin-top: 8px;
  font-size: 12px;
  color: #333;
  text-decoration: underline;
}

.native-link {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #f56c6c;
  text-decoration: underline;
}

.fallback-link-small {
  display: block;
  margin-top: 8px;
  font-size: 12px;
  color: #333;
  text-decoration: underline;
}

.native-link-small {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #f56c6c;
  text-decoration: underline;
}
</style> 