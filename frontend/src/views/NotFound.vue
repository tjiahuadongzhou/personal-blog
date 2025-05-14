<template>
  <div class="not-found">
    <div class="card">
      <h1 class="error-code">404</h1>
      <h2 class="error-title">页面未找到</h2>
      <p class="error-message">抱歉，您访问的页面不存在或已被移除。</p>
      <router-link to="/" class="go-home-btn">返回首页</router-link>
    </div>
  </div>
</template>

<script setup>
// 组件逻辑在这里
</script>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  text-align: center;
}

.card {
  max-width: 500px;
  width: 100%;
}

.error-code {
  font-size: 8rem;
  font-weight: bold;
  color: var(--primary-color);
  margin: 0;
  line-height: 1;
}

.error-title {
  font-size: 2rem;
  color: var(--secondary-color);
  margin: 10px 0 20px;
}

.error-message {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 30px;
}

.go-home-btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.go-home-btn:hover {
  background-color: #2980b9;
}
</style> 