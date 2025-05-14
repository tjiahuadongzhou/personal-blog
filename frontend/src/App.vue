<template>
  <div class="app">
    <header class="header" :class="{'fixed': isScrolled}">
      <div class="container">
        <nav class="nav">
          <h1 class="logo">
            <router-link to="/">我的博客</router-link>
          </h1>
          <ul class="nav-links">
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/category/技术">技术</router-link></li>
            <li><router-link to="/category/生活">生活</router-link></li>
            <li><router-link to="/category/思考">思考</router-link></li>
            <li><router-link to="/about">关于</router-link></li>
          </ul>
        </nav>
      </div>
    </header>
    
    <main class="main" :class="{'with-fixed-header': isScrolled}">
      <div class="container">
        <router-view></router-view>
      </div>
    </main>
    
    <footer class="footer">
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} 我的个人博客. 保留所有权利.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 添加滚动检测
const isScrolled = ref(false);

const checkScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
  checkScroll(); // 初始检查
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>

<style>
.header {
  background-color: var(--secondary-color);
  padding: 15px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: position 0.3s, box-shadow 0.3s;
}

.header.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.with-fixed-header {
  padding-top: 70px; /* 根据导航栏高度调整 */
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  list-style: none;
}

.nav-links li {
  margin-left: 20px;
}

.nav-links a {
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-links a:hover, 
.nav-links a.router-link-active {
  background-color: rgba(255, 255, 255, 0.1);
}

.main {
  min-height: calc(100vh - 120px);
  padding: 30px 0;
}

.footer {
  background-color: var(--secondary-color);
  color: white;
  text-align: center;
  padding: 15px 0;
  margin-top: 30px;
}
</style> 