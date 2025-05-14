import { createRouter, createWebHistory } from 'vue-router';

// 使用动态导入实现组件懒加载
const HomeView = () => import('../views/HomeView.vue');
const PostDetail = () => import('../views/PostDetail.vue');
const NotFound = () => import('../views/NotFound.vue');

// 下面这些组件需要创建
const AdminDashboardView = () => import('../views/AdminDashboardView.vue');
const AdminPostEditView = () => import('../views/AdminPostEditView.vue');

const routes = [
  // 前台路由
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/posts/:id',
    name: 'PostDetail',
    component: PostDetail,
    props: true // 将路由参数作为组件属性传递
  },
  
  // 后台管理路由
  {
    path: '/admin',
    redirect: '/admin/posts' // 重定向到文章列表
  },
  {
    path: '/admin/posts',
    name: 'AdminDashboard',
    component: AdminDashboardView
  },
  {
    path: '/admin/posts/new',
    name: 'AdminPostCreate',
    component: AdminPostEditView,
    props: { isNewPost: true } // 传递属性标识是新建文章
  },
  {
    path: '/admin/posts/edit/:id',
    name: 'AdminPostEdit',
    component: AdminPostEditView,
    props: route => ({ id: route.params.id, isNewPost: false }) // 合并路由参数和自定义属性
  },
  
  // 404页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // 切换页面时滚动到顶部
    return { top: 0 };
  }
});

export default router; 