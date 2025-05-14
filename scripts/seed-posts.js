require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('../models/Post');

// 提供更多真实的图片URL
const imageUrls = [
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1601933470096-0e34634ffcde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1564865878941-82e8a130e1d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1603468620905-8de7d86b781e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1546900703-cf06143d1239?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1529661503489-531948eec3c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1544256718-3bcf237f3974?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400'
];

// 随机获取图片URL
const getRandomImageUrl = () => {
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[randomIndex];
};

const samplePosts = [
  {
    title: '欢迎使用我的个人博客',
    content: '这是我的第一篇博客文章。在这个博客中，我将分享我的编程经验、技术文章和个人感悟。希望你能喜欢这里的内容！',
    published: true,
    imageUrl: imageUrls[0]
  },
  {
    title: 'JavaScript中的异步编程',
    content: '异步编程是JavaScript中的重要概念。在这篇文章中，我们将探讨Promise、async/await以及回调函数的使用方法和最佳实践。\n\n## Promise的基础用法\n\n```javascript\nconst myPromise = new Promise((resolve, reject) => {\n  // 异步操作\n  if (success) {\n    resolve(result);\n  } else {\n    reject(error);\n  }\n});\n```\n\n## 使用async/await\n\n```javascript\nasync function fetchData() {\n  try {\n    const response = await fetch(\'https://api.example.com/data\');\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error(\'Error fetching data:\', error);\n  }\n}\n```',
    published: true,
    imageUrl: imageUrls[1]
  },
  {
    title: 'Vue 3的组合式API入门',
    content: 'Vue 3引入了Composition API（组合式API），这是一种新的编写Vue组件的方式。它提供了更好的代码组织、逻辑复用和类型推断。\n\n## setup函数\n\n```javascript\nimport { ref, onMounted } from \'vue\';\n\nexport default {\n  setup() {\n    const count = ref(0);\n    \n    function increment() {\n      count.value++;\n    }\n    \n    onMounted(() => {\n      console.log(\'Component mounted!\');\n    });\n    \n    return {\n      count,\n      increment\n    };\n  }\n};\n```\n\n## script setup语法\n\n```vue\n<script setup>\nimport { ref, onMounted } from \'vue\';\n\nconst count = ref(0);\n\nfunction increment() {\n  count.value++;\n}\n\nonMounted(() => {\n  console.log(\'Component mounted!\');\n});\n</script>\n```',
    published: true,
    imageUrl: imageUrls[2]
  }
];

// 生成更多的样本文章
function generateMorePosts(count) {
  const titles = [
    'Web开发最佳实践',
    '响应式设计的关键原则',
    'CSS Grid布局完全指南',
    'JavaScript性能优化技巧',
    'MongoDB数据建模策略',
    'Express中间件详解',
    'Vue.js状态管理方案比较',
    'RESTful API设计原则',
    '前端测试自动化',
    '服务器端渲染vs客户端渲染',
    '前端安全最佳实践与常见漏洞防范',
    'GraphQL vs REST：API设计的新思路',
    'TypeScript高级类型与设计模式',
    'Node.js性能调优与监控',
    'Docker容器化部署前端应用',
    'WebAssembly入门与实践',
    'CI/CD流程自动化与前端工程化',
    'PWA技术详解与实现',
    '微前端架构实践与思考',
    'Web动画性能优化指南',
    'CSS变量与主题切换实现',
    '前端国际化解决方案',
    '浏览器渲染原理与优化',
    'Web Components组件化开发',
    'SEO优化技巧与前端实践',
    '无障碍访问设计与ARIA标准',
    'WebRTC实时通信技术',
    'HTTP/3与QUIC协议解析',
    'Flutter跨平台开发实践',
    'ServiceWorker与离线应用',
    '前端数据可视化方案',
    '移动Web性能优化策略',
    'Web字体优化与文本渲染',
    '响应式图片与WebP格式',
    'IndexedDB客户端存储实践',
    'WebSocket与Server-Sent Events',
    '消息队列在前端的应用',
    '微服务架构与前端设计',
    'A/B测试与用户体验数据分析',
    '前端代码规范与团队协作'
  ];
  
  const contents = [
    '本文将探讨现代Web开发中的最佳实践，包括代码组织、性能优化、安全性考虑等方面。通过遵循这些实践，开发者可以构建更高质量、更易维护的Web应用。',
    '响应式设计是现代Web开发的基础，本文将详细介绍响应式设计的核心原则，以及如何使用媒体查询、弹性布局和相对单位来创建在各种设备上都表现良好的网站。',
    'CSS Grid布局是一个强大的二维布局系统，本文将从基础概念到高级应用，全面介绍CSS Grid的使用方法，并提供实用的示例和最佳实践。',
    '性能是用户体验的关键因素之一，本文将分享一系列JavaScript性能优化技巧，帮助开发者编写更高效的代码，提升应用的响应速度和整体性能。',
    '数据建模是使用MongoDB等NoSQL数据库的核心挑战之一，本文将介绍几种常用的数据建模策略，并讨论它们在不同场景下的优缺点和适用性。',
    '中间件是Express框架的核心概念之一，本文将深入讲解Express中间件的工作原理、常用中间件的用法，以及如何开发自定义中间件来扩展应用功能。',
    '状态管理是复杂Vue应用的关键部分，本文将比较Vuex、Pinia和简单响应式状态等不同的状态管理方案，帮助开发者为自己的项目选择最合适的解决方案。',
    'RESTful API是现代Web应用的标准接口设计风格，本文将详细介绍RESTful设计的核心原则、最佳实践，以及如何处理常见的设计挑战。',
    '自动化测试是确保应用质量的关键手段，本文将介绍前端测试的不同类型、流行的测试工具和框架，以及如何构建有效的测试策略。',
    '服务器端渲染和客户端渲染各有优缺点，本文将深入比较这两种渲染方式在性能、SEO、开发复杂度等方面的差异，帮助开发者做出明智的技术选择。',
    '网络安全对于Web应用至关重要，本文将详细介绍XSS、CSRF、SQL注入等常见安全威胁，并提供实用的防范措施和最佳实践，帮助开发者构建更安全的应用。在现代Web开发中，安全不再是事后考虑的问题，而是整个开发生命周期中的重要环节。本文还将介绍内容安全策略(CSP)、HTTPS实施、安全HTTP头部等重要安全机制。',
    'GraphQL作为REST API的替代方案正在获得越来越多的关注。本文将深入比较GraphQL和REST的设计理念、优缺点，并通过实际案例展示GraphQL如何解决过度获取和数据聚合等传统REST API面临的挑战。文章还会讨论GraphQL在前端缓存、实时更新、文档和类型检查等方面的优势，以及何时选择使用GraphQL或REST。',
    'TypeScript的类型系统远比基础接口和类型别名强大得多。本文将探讨条件类型、映射类型、类型守卫等高级类型特性，并结合实际开发中的常见设计模式，展示如何利用TypeScript的类型系统构建更健壮、更易维护的代码库。文章还会介绍如何处理复杂的类型推断场景和类型兼容性问题。',
    'Node.js性能调优是构建高性能后端服务的关键。本文将详细介绍Node.js应用的性能瓶颈识别方法、内存泄漏调试技巧、CPU分析工具使用，以及如何优化异步操作、数据库访问和文件I/O等常见性能热点。文章还会探讨集群模式、负载均衡和缓存策略等提升Node.js应用整体性能的方案。',
    'Docker容器化为前端应用的部署和持续集成带来了革命性的变化。本文将介绍如何为React、Vue等现代前端应用创建优化的Docker镜像，如何配置多阶段构建减小镜像体积，以及如何通过Docker Compose管理前后端分离的应用。文章还会讨论容器化环境中的前端性能优化策略和自动化部署流程。',
    'WebAssembly正在改变Web平台的性能边界。本文将从基础概念入手，介绍如何将C/C++、Rust等语言编译为WebAssembly模块并在Web应用中使用，探讨适合用WebAssembly实现的功能类型，以及如何处理WebAssembly和JavaScript之间的通信和内存共享。文章还会通过实际案例展示WebAssembly如何显著提升计算密集型应用的性能。',
    '前端工程化是大型项目成功的关键因素。本文将详细介绍现代前端CI/CD流程的构建方法，包括自动化测试、代码质量检查、构建优化和自动化部署等环节。探讨如何使用GitLab CI、GitHub Actions或Jenkins等工具构建完整的前端自动化流程，以及如何通过模块化设计、组件库和微前端架构提升团队协作效率和代码可维护性。',
    'PWA(渐进式Web应用)结合了Web和原生应用的优点。本文将深入介绍PWA的核心技术，包括Service Worker、Web App Manifest和推送通知等，并通过实际案例展示如何将现有Web应用改造为离线可用、可安装的PWA。文章还会探讨PWA在提升用户留存、转化率和整体用户体验方面的潜力，以及当前的浏览器兼容性和最佳实践。',
    '微前端是一种将前端应用拆分为更小、更易管理的独立部分的架构方案。本文将介绍微前端的核心理念、不同的实现方式(如iframe、Web Components、JavaScript运行时集成等)，以及如何解决样式隔离、路由管理、状态共享等常见挑战。文章还会通过真实案例分析微前端架构在大型团队协作、渐进式迁移和技术栈多样性等方面的优势。',
    'Web动画是提升用户体验的重要手段，但不当的实现会导致性能问题。本文将详细介绍影响Web动画性能的因素，如何利用DevTools分析动画性能瓶颈，以及如何通过CSS transforms、will-change属性、requestAnimationFrame、Web Animations API等技术创建高性能的动画效果。文章还会提供针对不同动画类型的最佳实践和常见陷阱的解决方案。',
    'CSS变量(自定义属性)为前端开发带来了全新的灵活性。本文将深入探讨CSS变量的工作原理和高级用法，重点介绍如何利用CSS变量实现灵活的主题切换系统，包括暗色模式、品牌定制化主题和用户可配置的界面。文章还会展示如何结合JavaScript动态操作CSS变量，以及如何处理浏览器兼容性和回退方案。',
    '国际化(i18n)是全球化应用必不可少的一环。本文将介绍前端国际化的挑战和解决方案，包括文本翻译管理、日期时间格式化、数字和货币处理、双向文本支持等方面。详细探讨React-i18next、Vue I18n等流行框架的使用方法，以及如何构建一个可扩展的国际化系统，支持动态语言切换和延迟加载翻译资源，优化国际化应用的性能和用户体验。',
    '了解浏览器的渲染过程对于优化前端性能至关重要。本文将详细解析浏览器从HTML到像素的整个渲染流程，包括DOM构建、样式计算、布局、绘制和合成等关键环节。深入讨论reflow和repaint的性能影响，以及如何通过优化HTML结构、精简CSS选择器、避免布局抖动等技术减少渲染性能瓶颈。文章还会介绍渲染性能分析工具的使用和常见性能优化模式。',
    'Web Components提供了一种标准化的组件封装方式。本文将全面介绍Web Components的核心技术，包括Custom Elements、Shadow DOM和HTML Templates，并通过实际案例展示如何创建可复用、封装良好的原生组件。文章还会探讨Web Components与React、Vue等框架的集成方式，以及如何利用Web Components构建框架无关的组件库，提升组件的可移植性和复用价值。',
    'SEO对于内容驱动的网站至关重要。本文将从前端开发角度详细介绍现代SEO技术，包括语义化HTML、结构化数据、服务器端渲染、预渲染等方案。深入分析搜索引擎如何抓取和索引JavaScript驱动的单页应用，以及如何通过性能优化、移动友好性和用户体验改进提升搜索排名。文章还会提供实用的SEO检查清单和常见问题的解决方案。',
    '无障碍设计(a11y)是确保web内容对所有人可用的重要考量。本文将详细介绍WCAG标准和ARIA规范，以及如何应用这些标准提升应用的无障碍性。探讨键盘导航优化、屏幕阅读器兼容性、颜色对比度和视觉反馈等关键因素，以及如何通过自动化测试和辅助工具检测无障碍问题。文章还会通过实际案例展示无障碍设计如何造福所有用户，而不仅仅是残障人士。',
    'WebRTC为Web应用带来了点对点实时通信能力。本文将深入介绍WebRTC的核心概念、API和工作原理，以及如何实现视频会议、屏幕共享、文件传输等功能。探讨NAT穿透、信令服务器、媒体约束和安全性等WebRTC开发中的关键挑战，并提供实用的最佳实践和性能优化技巧。文章还会通过实际案例展示WebRTC在在线教育、远程协作和客户服务等场景的应用前景。',
    'HTTP/3是基于QUIC协议的全新HTTP版本。本文将深入解析HTTP/3和QUIC的设计理念、技术创新和性能优势，特别是在移动和不稳定网络环境下的改进。探讨HTTP/3相比HTTP/2的变化，以及这些变化对前端开发实践的影响。文章还会介绍如何在生产环境中逐步采用HTTP/3，以及前端开发者如何充分利用新协议的特性提升应用性能和用户体验。',
    'Flutter正在成为跨平台开发的热门选择。本文将从Web开发者的视角出发，介绍Flutter的核心概念、Dart语言特性和与Web开发的异同。深入探讨Flutter的布局系统、组件化开发、状态管理和路由导航等方面，以及如何利用Flutter Web实现真正的一次编写、多平台运行。文章还会通过实际案例比较Flutter与React Native、Ionic等其他跨平台解决方案的优缺点，帮助开发者做出明智的技术选择。',
    'Service Worker为Web应用提供了强大的离线能力。本文将详细介绍Service Worker的生命周期、缓存策略和后台同步等功能，以及如何实现渐进式的离线体验。探讨不同缓存模式(如Cache-First、Network-First等)的适用场景，以及如何处理Service Worker更新和版本管理。文章还会通过实际案例展示如何构建完全离线可用的Web应用，以及如何利用Workbox等工具简化Service Worker的开发和维护。',
    '数据可视化是展现复杂数据的有效手段。本文将全面介绍前端数据可视化的技术栈，包括Canvas、SVG、WebGL等底层技术，以及D3.js、ECharts、Three.js等高级库的特点和适用场景。深入探讨大数据集的渲染优化、交互设计、动画效果和响应式图表等关键主题。文章还会通过实际案例展示如何选择合适的可视化库，以及如何根据数据特点和用户需求设计有效的可视化方案。',
    '移动设备的性能约束和网络条件要求特殊的优化策略。本文将详细介绍移动Web性能的关键指标和优化目标，并提供一系列针对移动环境的实用技巧，包括资源延迟加载、内容优先级处理、触摸响应优化和硬件加速等。深入分析移动Web的渲染性能瓶颈和内存限制，以及如何通过性能预算和持续监控确保良好的移动用户体验。文章还会讨论PWA、AMP等移动优化技术的适用场景和实现方法。',
    '字体对网页的视觉表现和性能都有重大影响。本文将深入探讨Web字体的优化策略，包括字体子集化、WOFF2格式、字体显示控制和本地字体回退等技术。分析字体加载对关键渲染路径的影响，以及如何通过预加载、字体分组和异步加载平衡性能和视觉效果。文章还会详细介绍可变字体(Variable Fonts)的工作原理和应用场景，以及如何利用现代CSS特性实现精细的文本排版和响应式文本设计。',
    '图片是Web性能优化的重点领域。本文将全面介绍响应式图片技术，包括srcset、sizes属性、picture元素和客户端提示等标准方案。深入探讨新一代图片格式(如WebP、AVIF)的特点、兼容性和使用策略，以及如何通过CDN实现自动格式选择和尺寸优化。文章还会分析图片懒加载、渐进式加载和内容感知调整等用户体验优化技术，以及如何在不牺牲视觉质量的前提下最大化图片性能。',
    'IndexedDB提供了强大的客户端存储能力。本文将从基础概念入手，详细介绍IndexedDB的工作原理、API设计和事务模型，以及如何利用IndexedDB实现复杂的离线数据管理。深入探讨索引设计、数据模式演化和同步策略等关键主题，以及如何解决浏览器兼容性和存储限制等常见挑战。文章还会通过实际案例展示如何结合Service Worker和IndexedDB构建具有完整离线功能的Web应用，提供与原生应用媲美的用户体验。',
    '实时通信是现代Web应用的重要组成部分。本文将深入比较WebSocket和Server-Sent Events(SSE)两种主要的实时通信技术，分析它们的工作原理、API设计、适用场景和性能特点。详细介绍如何实现可靠的WebSocket连接，处理重连逻辑、心跳检测和消息队列，以及如何利用SSE构建高效的单向通知系统。文章还会探讨这些技术在聊天应用、实时协作、数据流和通知系统等场景中的最佳实践和架构设计。',
    '消息队列为复杂前端应用提供了强大的架构支持。本文将介绍如何在前端应用中实现消息队列模式，以处理异步操作、状态同步和组件通信等挑战。深入探讨客户端消息队列的实现方法，包括内存队列、IndexedDB持久化和ServiceWorker中转等技术。文章还会通过实际案例展示消息队列如何提升离线应用的可靠性、优化网络请求管理和实现高效的数据同步，特别是在不稳定网络环境下的应用场景。',
    '微服务架构已经从后端扩展到前端领域。本文将详细探讨前端微服务化的实践方法、架构模式和设计原则，以及如何通过微前端、组件化和API网关等技术实现前端服务的解耦和独立部署。分析前端微服务化面临的挑战，包括跨服务通信、数据共享、一致性UI和测试策略等问题，并提供实用的解决方案。文章还会通过案例研究，展示微服务架构如何支持大型前端应用的敏捷开发和可持续迭代。',
    'A/B测试是优化用户体验的科学方法。本文将全面介绍前端A/B测试的实施流程、技术实现和数据分析方法，以及如何将用户行为数据转化为有意义的产品决策。深入探讨A/B测试框架的选择、测试设计原则和统计显著性判断，以及如何避免常见的测试陷阱和数据误解。文章还会通过实际案例分析，展示如何通过持续的小规模实验和数据驱动的迭代，显著提升产品的用户体验和业务指标。',
    '代码规范是保障团队协作效率和代码质量的基础。本文将详细介绍如何建立全面的前端代码规范体系，涵盖编码风格、命名约定、文档要求和架构原则等方面。深入探讨如何通过ESLint、Prettier、StyleLint等工具实现规范的自动检查和修复，以及如何通过代码评审、结对编程和知识分享等实践加强团队规范意识。文章还会分析大型前端团队的工作流程优化、技术债务管理和知识沉淀策略，帮助团队在保持高效率的同时确保代码质量和可维护性。'
  ];
  
  const additionalPosts = [];
  
  for (let i = 0; i < count; i++) {
    const titleIndex = i % titles.length;
    const contentIndex = i % contents.length;
    
    additionalPosts.push({
      title: `${titles[titleIndex]} - ${i + 1}`,
      content: contents[contentIndex],
      published: Math.random() > 0.2, // 80%概率为已发布状态
      imageUrl: getRandomImageUrl()
    });
  }
  
  return additionalPosts;
}

// 连接到MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB连接成功，开始填充数据...');
    
    // 清空现有数据
    await Post.deleteMany({});
    console.log('已清空现有文章数据');
    
    // 合并固定示例和随机生成的文章
    const allPosts = [...samplePosts, ...generateMorePosts(197)]; // 增加到200篇文章(3篇固定+197篇随机)
    
    // 插入示例文章
    const createdPosts = await Post.insertMany(allPosts);
    console.log(`成功创建 ${createdPosts.length} 篇示例文章`);
    
    // 断开数据库连接
    mongoose.connection.close();
    console.log('数据填充完成，数据库连接已关闭');
  })
  .catch(err => {
    console.error('数据填充过程中出错:', err);
    process.exit(1);
  });
