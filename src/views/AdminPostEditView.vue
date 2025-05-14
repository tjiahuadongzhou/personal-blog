<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getPostById, createPost, updatePost, uploadImage } from '../api/posts';
import { ElMessage } from 'element-plus';
import { Plus, Delete, QuestionFilled } from '@element-plus/icons-vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

// 定义props
const props = defineProps({
  id: {
    type: String,
    default: null
  },
  isNewPost: {
    type: Boolean,
    default: false
  }
});

// 开发调试日志
console.log('组件初始化，props:', props);

const router = useRouter();
const route = useRoute();
const formRef = ref(null);

// Markdown编辑器工具栏配置
const toolbars = [
  'bold', 'italic', 'strikethrough', 'heading', 'line', 'quote', 'list', 'ordered-list', 
  'check', 'code', 'inline-code', 'link', 'image', 'table', 'preview', 'fullscreen', 'html-preview'
];

// 处理编辑器内容变化
const handleEditorChange = (content) => {
  postForm.value.content = content;
};

// 处理编辑器中的图片上传
const handleUploadImage = async (files, callback) => {
  const uploadPromises = [];
  
  for (let i = 0; i < files.length; i++) {
    uploadPromises.push(
      new Promise(async (resolve) => {
        try {
          const response = await uploadImage(files[i]);
          if (response.success) {
            // 返回完整的图片URL给编辑器
            const fullUrl = window.location.origin.replace(/(:\d+)/, '') + ':3000' + response.imageUrl;
            resolve(fullUrl);
          } else {
            ElMessage.error('图片上传失败');
            resolve(false);
          }
        } catch (error) {
          console.error('图片上传失败:', error);
          ElMessage.error('图片上传失败');
          resolve(false);
        }
      })
    );
  }
  
  // 等待所有图片上传完成
  const urls = await Promise.all(uploadPromises);
  // 将成功的URL传给回调函数
  callback(urls.filter(url => url !== false));
};

const postForm = ref({
  _id: null,
  title: '',
  content: '',
  imageUrl: '',
  published: false
});

const rules = {
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
    { min: 1, max: 100, message: '标题长度应在1-100个字符之间', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入文章内容', trigger: 'blur' }
  ]
};

const isLoading = ref(false);
const isSaving = ref(false);
const previewVisible = ref(false);
const markdownHelpVisible = ref(false);

// 计算属性：判断当前是编辑模式还是新建模式
const isEditing = computed(() => {
  console.log('isEditing计算: props.isNewPost=', props.isNewPost, 'props.id=', props.id, 'route.params.id=', route.params.id);
  return !props.isNewPost && (props.id || route.params.id);
});

// 获取文章ID，优先使用props中的id
const getPostId = computed(() => {
  return props.id || route.params.id;
});

// 获取文章详情（编辑模式）
const fetchPost = async () => {
  console.log('fetchPost被调用，isEditing=', isEditing.value);
  if (!isEditing.value) return;
  
  const postId = getPostId.value;
  if (!postId) {
    console.log('没有找到文章ID，无法获取文章详情');
    return;
  }
  
  console.log('正在获取文章详情，ID:', postId);
  isLoading.value = true;
  
  try {
    const response = await getPostById(postId);
    const post = response.data;
    postForm.value = {
      _id: post._id,
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl || '',
      published: post.published || false
    };
    console.log('文章详情获取成功:', post);
  } catch (error) {
    console.error('获取文章详情失败:', error);
    ElMessage.error('获取文章详情失败');
  } finally {
    isLoading.value = false;
  }
};

// 图片上传前的验证
const beforeImageUpload = (file) => {
  const isJpgOrPng = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'].includes(file.type);
  const isLt5M = file.size / 1024 / 1024 < 5;

  if (!isJpgOrPng) {
    ElMessage.error('只能上传JPG/PNG/GIF/WEBP格式的图片!');
    return false;
  }
  if (!isLt5M) {
    ElMessage.error('图片大小不能超过5MB!');
    return false;
  }
  return true;
};

// 自定义上传方法
const customUpload = async ({ file }) => {
  try {
    const response = await uploadImage(file);
    postForm.value.imageUrl = response.imageUrl;
    ElMessage.success('图片上传成功');
  } catch (error) {
    console.error('图片上传失败:', error);
    ElMessage.error('图片上传失败');
  }
};

// 删除当前图片
const removeImage = () => {
  postForm.value.imageUrl = '';
};

// 图片预览
const previewImage = () => {
  if (!postForm.value.imageUrl) {
    ElMessage.warning('请先设置图片URL');
    return;
  }
  previewVisible.value = true;
};

// 保存文章（创建或更新）
const handleSubmit = async () => {
  console.log('提交表单，isEditing=', isEditing.value);
  if (!formRef.value) return;
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      isSaving.value = true;
      
      try {
        if (isEditing.value) {
          console.log('更新文章:', postForm.value);
          await updatePost(postForm.value._id, postForm.value);
          ElMessage.success('文章更新成功');
        } else {
          console.log('创建文章:', postForm.value);
          await createPost(postForm.value);
          ElMessage.success('文章创建成功');
        }
        // 保存成功后返回文章列表
        router.push('/admin/posts');
      } catch (error) {
        console.error(`${isEditing.value ? '更新' : '创建'}文章失败:`, error);
        ElMessage.error(`${isEditing.value ? '更新' : '创建'}文章失败`);
      } finally {
        isSaving.value = false;
      }
    }
  });
};

// 显示Markdown帮助
const showMarkdownHelp = () => {
  markdownHelpVisible.value = true;
};

// 返回列表
const goBackToList = () => {
  console.log('返回列表');
  router.push('/admin/posts');
};

onMounted(() => {
  // 打印路由信息和props
  console.log('组件挂载，路由参数:', route.params);
  console.log('组件挂载，props:', props);
  
  // 页面加载时获取文章详情
  fetchPost();
});
</script>

<template>
  <div class="post-edit">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h1>{{ isEditing ? '编辑文章' : '新建文章' }}</h1>
          <div>
            <el-button @click="goBackToList">返回列表</el-button>
            <router-link :to="'/admin/posts'" class="fallback-link">备用: 返回列表</router-link>
            <a href="/admin/posts" class="native-link">原生: 返回列表</a>
          </div>
        </div>
      </template>
      
      <!-- 调试信息 -->
      <div class="debug-info">
        <p><strong>isNewPost:</strong> {{ props.isNewPost }}</p>
        <p><strong>ID from props:</strong> {{ props.id }}</p>
        <p><strong>ID from route:</strong> {{ route.params.id }}</p>
        <p><strong>isEditing computed:</strong> {{ isEditing }}</p>
      </div>
      
      <div v-if="isLoading" class="loading-container">
        <el-skeleton :rows="6" animated />
      </div>
      
      <el-form
        v-else
        ref="formRef"
        :model="postForm"
        :rules="rules"
        label-position="top"
        @submit.prevent="handleSubmit"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="postForm.title" placeholder="请输入文章标题" />
        </el-form-item>
        
        <el-form-item label="文章内容" prop="content">
          <div class="editor-header">
            <span>Markdown编辑器</span>
            <el-button type="info" plain size="small" @click="showMarkdownHelp">
              <el-icon><QuestionFilled /></el-icon> Markdown帮助
            </el-button>
          </div>
          <MdEditor
            v-model="postForm.content"
            language="zh-CN"
            :toolbars="toolbars"
            previewTheme="github"
            style="height: 500px"
            @onChange="handleEditorChange"
            @upload-img="handleUploadImage"
          />
        </el-form-item>
        
        <el-form-item label="封面图片">
          <div class="upload-container">
            <el-upload
              class="image-uploader"
              :show-file-list="false"
              :before-upload="beforeImageUpload"
              :http-request="customUpload"
            >
              <el-image
                v-if="postForm.imageUrl"
                :src="postForm.imageUrl"
                fit="cover"
                class="preview-image"
              />
              <el-icon v-else class="upload-icon"><Plus /></el-icon>
            </el-upload>
            
            <div class="image-actions" v-if="postForm.imageUrl">
              <el-button type="danger" size="small" @click="removeImage">
                <el-icon><Delete /></el-icon> 删除图片
              </el-button>
            </div>
          </div>
          
          <el-input
            v-model="postForm.imageUrl"
            placeholder="或者直接输入图片URL"
            class="mt-10"
          >
            <template #append>
              <el-button @click="previewImage">预览</el-button>
            </template>
          </el-input>
        </el-form-item>
        
        <el-form-item>
          <el-switch
            v-model="postForm.published"
            active-text="发布"
            inactive-text="保存为草稿"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" native-type="submit" :loading="isSaving">
            {{ isEditing ? '更新文章' : '创建文章' }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    
    <!-- 图片预览对话框 -->
    <el-dialog
      v-model="previewVisible"
      title="图片预览"
      width="50%"
      destroy-on-close
    >
      <div class="preview-container">
        <el-image
          v-if="postForm.imageUrl"
          :src="postForm.imageUrl"
          fit="contain"
          style="width: 100%"
        />
        <div v-else class="no-image">
          未设置图片URL
        </div>
      </div>
    </el-dialog>
    
    <!-- Markdown帮助对话框 -->
    <el-dialog
      v-model="markdownHelpVisible"
      title="Markdown语法帮助"
      width="65%"
    >
      <div class="markdown-help">
        <div class="help-section">
          <h3>基本语法</h3>
          <table class="help-table">
            <thead>
              <tr>
                <th>类型</th>
                <th>Markdown语法</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>标题</td>
                <td># 一级标题<br>## 二级标题<br>### 三级标题</td>
                <td>使用#的数量表示标题级别</td>
              </tr>
              <tr>
                <td>粗体</td>
                <td>**粗体文本**</td>
                <td>文本两侧各加两个星号</td>
              </tr>
              <tr>
                <td>斜体</td>
                <td>*斜体文本*</td>
                <td>文本两侧各加一个星号</td>
              </tr>
              <tr>
                <td>链接</td>
                <td>[链接文本](https://example.com)</td>
                <td>方括号内是显示文本，圆括号内是URL</td>
              </tr>
              <tr>
                <td>图片</td>
                <td>![替代文本](图片URL)</td>
                <td>与链接类似，但前面加叹号</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="help-section">
          <h3>列表和引用</h3>
          <table class="help-table">
            <tbody>
              <tr>
                <td>无序列表</td>
                <td>- 列表项<br>- 另一个列表项</td>
                <td>使用短横线+空格开始一行</td>
              </tr>
              <tr>
                <td>有序列表</td>
                <td>1. 第一项<br>2. 第二项</td>
                <td>使用数字+点+空格开始一行</td>
              </tr>
              <tr>
                <td>引用</td>
                <td>> 这是一段引用文本</td>
                <td>使用大于号+空格开始一行</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="help-section">
          <h3>代码和表格</h3>
          <table class="help-table">
            <tbody>
              <tr>
                <td>行内代码</td>
                <td>`代码`</td>
                <td>代码两侧加反引号</td>
              </tr>
              <tr>
                <td>代码块</td>
                <td>```<br>代码块<br>```</td>
                <td>代码块前后各三个反引号</td>
              </tr>
              <tr>
                <td>表格</td>
                <td>| 表头1 | 表头2 |<br>| ------ | ------ |<br>| 内容1 | 内容2 |</td>
                <td>使用竖线分隔表格列</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.native-link {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #f56c6c;
  text-decoration: underline;
}
</style> 