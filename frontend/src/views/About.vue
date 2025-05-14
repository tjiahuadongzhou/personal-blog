<template>
  <div class="about">
    <div class="card">
      <h1 class="page-title">关于我的博客</h1>
      
      <div class="about-content">
        <p>欢迎来到我的个人博客！这是一个使用 Node.js, Express, MongoDB 和 Vue 3 构建的全栈博客网站。</p>
        
        <h2>技术栈</h2>
        <ul>
          <li><strong>后端</strong>: Node.js, Express, Mongoose</li>
          <li><strong>数据库</strong>: MongoDB</li>
          <li><strong>前端</strong>: Vue 3, Vue Router, Axios</li>
          <li><strong>构建工具</strong>: Vite</li>
        </ul>
        
        <h2>博客功能</h2>
        <ul>
          <li>文章展示，支持按分类浏览</li>
          <li>文章详情页面</li>
          <li>简洁美观的响应式设计</li>
          <li>文章分页功能</li>
          <li>后台管理系统（开发中）</li>
        </ul>
        
        <p class="contact">如果有任何问题或建议，欢迎联系我！</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// 组件逻辑在这里
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  margin-bottom: 30px;
  font-size: 2rem;
  color: var(--secondary-color);
  text-align: center;
}

.about-content {
  line-height: 1.8;
  font-size: 1.1rem;
}

.about-content p {
  margin-bottom: 20px;
}

.about-content h2 {
  margin: 30px 0 15px;
  color: var(--secondary-color);
  font-size: 1.5rem;
}

.about-content ul {
  margin-bottom: 20px;
  padding-left: 20px;
}

.about-content li {
  margin-bottom: 10px;
}

.contact {
  margin-top: 30px;
  font-style: italic;
  text-align: center;
}
</style> 