# CRM 项目模板

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.5+-4FC08D?logo=vue.js" alt="Vue">
  <img src="https://img.shields.io/badge/TypeScript-5.6+-3178C6?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Pinia-2.x-FFD859" alt="Pinia">
  <img src="https://img.shields.io/badge/Element%20Plus-2.x-409EFF" alt="Element Plus">
  <img src="https://img.shields.io/badge/Vant-4.x-07C160" alt="Vant">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
</p>

<p align="center">
  基于 Vue 3 + TypeScript + Vite 的企业级 CRM 客户关系管理系统模板
  <br>
  支持 PC 端和移动端双端开发，采用 Monorepo 架构
</p>

---

## 目录

- [项目简介](#项目简介)
- [功能特性](#功能特性)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [快速开始](#快速开始)
- [开发指南](#开发指南)
- [架构设计](#架构设计)
- [API 文档](#api-文档)
- [状态管理](#状态管理)
- [权限系统](#权限系统)
- [Mock 数据](#mock-数据)
- [部署指南](#部署指南)
- [常见问题](#常见问题)
- [更新日志](#更新日志)
- [贡献指南](#贡献指南)
- [License](#license)

---

## 项目简介

CRM 项目模板是一个开箱即用的企业级客户关系管理系统前端解决方案。采用最新的 Vue 3 技术栈，支持 PC 端（Element Plus）和移动端（Vant 4）双端开发，通过 Monorepo 架构实现代码复用，大幅提升开发效率。

### 演示账号

| 账号 | 密码 | 角色 | 权限说明 |
|------|------|------|----------|
| user1 | 123456 | 超级管理员 | 拥有所有权限 |
| user2 | 123456 | 项目经理 | 部分系统管理权限 |
| user3 | 123456 | 团队负责人 | 部门管理权限 |
| user4 | 123456 | 开发人员 | 基础查看权限 |
| user5 | 123456 | 运营人员 | 客户相关权限 |

---

## 功能特性

### 已实现功能

- [x] **用户认证** - JWT Token 认证、自动刷新、安全退出
- [x] **权限控制** - RBAC 模型，支持路由级和按钮级权限
- [x] **布局框架** - PC 端侧边栏布局 + H5 端 TabBar 布局
- [x] **用户管理** - 用户 CRUD、角色分配、部门分配
- [x] **角色管理** - 角色 CRUD、权限树分配
- [x] **部门管理** - 树形结构部门管理
- [x] **Mock 服务** - MSW 模拟后端接口，开箱即用
- [x] **状态持久化** - Pinia 状态持久化，刷新不丢失
- [x] **响应式设计** - H5 端自动适配不同屏幕尺寸
- [x] **TypeScript** - 完整的类型定义，提升开发体验
- [x] **代码复用** - Monorepo 架构，PC/H5 共享业务逻辑

### 待实现功能

- [ ] 客户管理 - 客户 CRUD、标签、公海池
- [ ] 联系人管理 - 联系人维护、快捷通讯
- [ ] 商机管理 - 商机跟进、阶段推进、销售漏斗
- [ ] 合同管理 - 合同审批、回款计划
- [ ] 任务日程 - 待办事项、日历视图
- [ ] 数据报表 - 销售业绩、数据分析、可视化图表
- [ ] 消息通知 - 站内信、实时推送
- [ ] 系统配置 - 数据字典、操作日志

---

## 技术栈

### 核心框架

| 技术 | 版本 | 说明 |
|------|------|------|
| [Vue](https://vuejs.org/) | 3.5+ | 渐进式 JavaScript 框架 |
| [TypeScript](https://www.typescriptlang.org/) | 5.6+ | JavaScript 超集，提供类型系统 |
| [Vite](https://vitejs.dev/) | 6.x | 下一代前端构建工具 |
| [Pinia](https://pinia.vuejs.org/) | 2.x | Vue 官方状态管理库 |
| [Vue Router](https://router.vuejs.org/) | 4.x | Vue 官方路由管理 |
| [Axios](https://axios-http.com/) | 1.x | HTTP 请求库 |

### PC 端

| 技术 | 说明 |
|------|------|
| [Element Plus](https://element-plus.org/) | 基于 Vue 3 的桌面端 UI 组件库 |
| [ECharts](https://echarts.apache.org/) | 数据可视化图表库 |
| [VueUse](https://vueuse.org/) | Vue 组合式工具函数集合 |
| [Sass](https://sass-lang.com/) | CSS 预处理器 |

### H5 端

| 技术 | 说明 |
|------|------|
| [Vant 4](https://vant-ui.github.io/vant/) | 轻量、可定制的移动端 UI 组件库 |
| [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport) | 自动将 px 转换为 vw，实现移动端适配 |

### 开发工具

| 技术 | 说明 |
|------|------|
| [pnpm](https://pnpm.io/) | 快速、节省磁盘空间的包管理器 |
| [MSW](https://mswjs.io/) | Mock Service Worker，API 模拟 |
| [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import) | API 自动导入 |
| [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) | 组件自动注册 |

---

## 项目结构

```
crm-template/
├── packages/                       # Monorepo 工作空间
│   │
│   ├── shared/                     # 共享代码包 (@crm/shared)
│   │   ├── api/                    # API 接口层
│   │   │   ├── index.ts            # 统一导出
│   │   │   ├── request.ts          # Axios 封装 (拦截器、错误处理)
│   │   │   ├── auth.ts             # 认证相关 API
│   │   │   └── system.ts           # 系统管理 API (用户/角色/部门)
│   │   │
│   │   ├── types/                  # TypeScript 类型定义
│   │   │   ├── index.ts            # 统一导出
│   │   │   ├── user.ts             # 用户相关类型
│   │   │   ├── permission.ts       # 权限相关类型
│   │   │   ├── api.ts              # API 响应类型
│   │   │   └── common.ts           # 通用类型
│   │   │
│   │   ├── stores/                 # Pinia 状态管理
│   │   │   ├── index.ts            # 统一导出
│   │   │   ├── user.ts             # 用户状态 (登录、信息)
│   │   │   ├── permission.ts       # 权限状态 (菜单、权限列表)
│   │   │   └── app.ts              # 应用状态 (主题、语言、侧边栏)
│   │   │
│   │   ├── utils/                  # 工具函数
│   │   │   ├── index.ts            # 统一导出
│   │   │   ├── auth.ts             # Token 管理
│   │   │   ├── storage.ts          # 本地存储封装
│   │   │   ├── format.ts           # 格式化工具
│   │   │   └── validate.ts         # 验证工具
│   │   │
│   │   ├── constants/              # 常量定义
│   │   │   ├── index.ts            # 统一导出
│   │   │   ├── http.ts             # HTTP 相关常量
│   │   │   ├── enums.ts            # 枚举定义
│   │   │   └── storage-keys.ts     # 存储 Key 定义
│   │   │
│   │   ├── env.d.ts                # 环境变量类型声明
│   │   ├── index.ts                # 包入口
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── pc/                         # PC 端应用 (@crm/pc)
│   │   ├── public/
│   │   │   ├── mockServiceWorker.js  # MSW Worker
│   │   │   └── vite.svg
│   │   │
│   │   ├── src/
│   │   │   ├── components/         # 公共组件
│   │   │   │
│   │   │   ├── directives/         # 自定义指令
│   │   │   │   ├── index.ts
│   │   │   │   └── permission.ts   # v-permission 权限指令
│   │   │   │
│   │   │   ├── layouts/            # 布局组件
│   │   │   │   ├── index.vue       # 主布局 (侧边栏 + 顶栏 + 内容区)
│   │   │   │   └── components/
│   │   │   │       ├── Sidebar.vue # 侧边栏菜单
│   │   │   │       └── Navbar.vue  # 顶部导航栏
│   │   │   │
│   │   │   ├── pages/              # 页面组件
│   │   │   │   ├── login/          # 登录页
│   │   │   │   ├── dashboard/      # 首页仪表盘
│   │   │   │   ├── system/         # 系统管理
│   │   │   │   │   ├── user/       # 用户管理
│   │   │   │   │   ├── role/       # 角色管理
│   │   │   │   │   └── dept/       # 部门管理
│   │   │   │   ├── customer/       # 客户管理 (待实现)
│   │   │   │   └── error/          # 错误页面
│   │   │   │
│   │   │   ├── router/             # 路由配置
│   │   │   │   └── index.ts        # 路由定义 + 守卫
│   │   │   │
│   │   │   ├── styles/             # 全局样式
│   │   │   │   └── index.scss
│   │   │   │
│   │   │   ├── App.vue
│   │   │   ├── main.ts             # 入口文件
│   │   │   └── env.d.ts
│   │   │
│   │   ├── index.html
│   │   ├── vite.config.ts          # Vite 配置
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── h5/                         # H5 移动端应用 (@crm/h5)
│       ├── public/
│       │   ├── mockServiceWorker.js  # MSW Worker
│       │   └── vite.svg
│       │
│       ├── src/
│       │   ├── components/         # 公共组件
│       │   │
│       │   ├── layouts/            # 布局组件
│       │   │   └── index.vue       # TabBar 布局
│       │   │
│       │   ├── pages/              # 页面组件
│       │   │   ├── login/          # 登录页
│       │   │   ├── home/           # 首页
│       │   │   ├── customer/       # 客户管理
│       │   │   │   ├── index.vue   # 客户列表
│       │   │   │   ├── detail.vue  # 客户详情
│       │   │   │   └── form.vue    # 新增/编辑
│       │   │   ├── mine/           # 我的
│       │   │   ├── system/         # 系统管理
│       │   │   │   ├── user/       # 用户管理
│       │   │   │   ├── role/       # 角色管理
│       │   │   │   └── dept/       # 部门管理
│       │   │   └── error/          # 错误页面
│       │   │
│       │   ├── router/             # 路由配置
│       │   │   └── index.ts
│       │   │
│       │   ├── styles/             # 全局样式
│       │   │   └── index.scss
│       │   │
│       │   ├── App.vue
│       │   ├── main.ts
│       │   └── env.d.ts
│       │
│       ├── index.html
│       ├── vite.config.ts          # Vite 配置 (含 px-to-viewport)
│       ├── package.json
│       └── tsconfig.json
│
├── mock/                           # Mock 数据包 (@crm/mock)
│   ├── handlers/                   # API 处理器
│   │   ├── index.ts                # 统一导出
│   │   ├── auth.ts                 # 认证接口
│   │   └── user.ts                 # 系统管理接口
│   │
│   ├── data/                       # 模拟数据
│   │   └── user.ts                 # 用户、角色、部门、菜单数据
│   │
│   ├── browser.ts                  # MSW 浏览器配置
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
├── pnpm-workspace.yaml             # pnpm 工作空间配置
├── tsconfig.json                   # TypeScript 根配置
├── package.json                    # 根包配置
└── README.md
```

---

## 快速开始

### 环境要求

| 工具 | 版本要求     | 说明                     |
|------|----------|------------------------|
| Node.js | '>=' 18.0.0 | 推荐使用 LTS 版本（当前20.15.0） |
| pnpm | '>=' 8.0.0 | 包管理器（当前10.11.0）        |

```bash
# 检查 Node 版本
node -v

# 安装 pnpm (如果没有安装)
npm install -g pnpm

# 检查 pnpm 版本
pnpm -v
```

### 安装依赖

```bash
# 克隆项目
git clone <repository-url>
cd crm-template

# 安装所有依赖 (会自动安装所有 workspace 包的依赖)
pnpm install
```

### 启动开发服务器

```bash
# 启动 PC 端开发服务器
pnpm dev:pc
# 访问 http://localhost:5173

# 启动 H5 端开发服务器
pnpm dev:h5
# 访问 http://localhost:3000

# 同时启动两端 (需要两个终端窗口)
# 终端 1
pnpm dev:pc
# 终端 2
pnpm dev:h5
```

### 构建生产版本

```bash
# 构建 PC 端
pnpm build:pc
# 输出目录: packages/pc/dist

# 构建 H5 端
pnpm build:h5
# 输出目录: packages/h5/dist
```

### 其他命令

```bash
# 代码格式化
pnpm format

# ESLint 检查并修复
pnpm lint
```

---

## 开发指南

### 添加新页面 (PC 端)

1. 在 `packages/pc/src/pages/` 下创建页面组件

```vue
<!-- packages/pc/src/pages/example/index.vue -->
<script setup lang="ts">
// 组件逻辑
</script>

<template>
  <div class="page-container">
    <!-- 页面内容 -->
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  // 样式
}
</style>
```

2. 在 `packages/pc/src/router/index.ts` 中添加路由

```typescript
// 动态路由配置
export const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: '/example',
    component: Layout,
    meta: { title: '示例模块', icon: 'Setting' },
    children: [
      {
        path: '',
        name: 'Example',
        component: () => import('@/pages/example/index.vue'),
        meta: {
          title: '示例页面',
          permission: 'example:list'  // 权限标识
        }
      }
    ]
  }
]
```

3. 在 Mock 数据中添加菜单权限 (`mock/data/user.ts`)

### 添加新页面 (H5 端)

1. 在 `packages/h5/src/pages/` 下创建页面组件
2. 在 `packages/h5/src/router/index.ts` 中添加路由

```typescript
{
  path: '/example',
  name: 'Example',
  component: () => import('@/pages/example/index.vue'),
  meta: {
    title: '示例',
    keepAlive: true,    // 是否缓存
    showTabBar: false   // 是否显示底部导航
  }
}
```

### 添加新 API

1. 在 `packages/shared/types/` 中定义类型

```typescript
// packages/shared/types/example.ts
export interface ExampleInfo {
  id: string
  name: string
  // ...
}

export interface ExampleListParams {
  page?: number
  pageSize?: number
  keyword?: string
}
```

2. 在 `packages/shared/api/` 中添加 API 函数

```typescript
// packages/shared/api/example.ts
import { get, post, put, del } from './request'
import type { ExampleInfo, ExampleListParams, PageResult } from '../types'

/** 获取列表 */
export function getExampleList(params: ExampleListParams) {
  return get<PageResult<ExampleInfo>>('/example', params)
}

/** 获取详情 */
export function getExampleDetail(id: string) {
  return get<ExampleInfo>(`/example/${id}`)
}

/** 创建 */
export function createExample(data: Partial<ExampleInfo>) {
  return post<ExampleInfo>('/example', data)
}

/** 更新 */
export function updateExample(id: string, data: Partial<ExampleInfo>) {
  return put<ExampleInfo>(`/example/${id}`, data)
}

/** 删除 */
export function deleteExample(id: string) {
  return del<void>(`/example/${id}`)
}
```

3. 在 `packages/shared/api/index.ts` 中导出

```typescript
export * from './example'
```

4. 在 `mock/handlers/` 中添加 Mock 处理器

### 使用权限指令 (PC 端)

```vue
<template>
  <!-- 单个权限 -->
  <el-button v-permission="'system:user:add'">新增</el-button>

  <!-- 多个权限 (满足任一即可) -->
  <el-button v-permission="['system:user:edit', 'system:user:delete']">
    操作
  </el-button>
</template>
```

### H5 端适配说明

H5 端使用 `postcss-px-to-viewport` 自动将 `px` 转换为 `vw`。

- 设计稿宽度: 375px
- 直接使用 px 编写样式，构建时自动转换

```css
/* 编写 */
.box {
  width: 100px;
  height: 50px;
  font-size: 14px;
}

/* 构建后 */
.box {
  width: 26.66667vw;
  height: 13.33333vw;
  font-size: 3.73333vw;
}
```

---

## 架构设计

### Monorepo 架构

```
┌─────────────────────────────────────────────────────────┐
│                     crm-template                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │                    packages/                      │  │
│  │  ┌─────────┐   ┌─────────┐   ┌─────────────────┐  │  │
│  │  │   pc    │   │   h5    │   │     shared      │  │  │
│  │  │ (应用)   │   │ (应用)  │   │   (共享代码)    │  │  │
│  │  └────┬────┘   └────┬────┘   └────────┬────────┘   │  │
│  │       │             │                  │           │  │
│  │       └─────────────┴──────────────────┘           │  │
│  │                     │                              │  │
│  │              ┌──────┴──────┐                       │  │
│  │              │    mock     │                       │  │
│  │              │  (API模拟)  │                       │  │
│  │              └─────────────┘                       │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 数据流架构

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Component  │ ──► │    Store     │ ──► │     API      │
│   (页面组件)  │ ◄── │   (Pinia)    │ ◄── │   (Axios)    │
└──────────────┘     └──────────────┘     └──────────────┘
       │                    │                    │
       │                    │                    │
       ▼                    ▼                    ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Template   │     │   Storage    │     │  Mock/Server │
│   (UI 渲染)   │     │  (持久化)    │     │   (后端)     │
└──────────────┘     └──────────────┘     └──────────────┘
```

### PC 端布局结构

```
┌─────────────────────────────────────────────────────────────┐
│  Logo              面包屑导航              用户信息  退出    │  ← Navbar
├──────────┬──────────────────────────────────────────────────┤
│          │                                                  │
│  首页    │                                                  │
│          │                                                  │
│  系统    │                    主内容区域                     │
│  ├─用户  │                                                  │
│  ├─角色  │             (Router View)                        │
│  └─部门  │                                                  │
│          │                                                  │
│  客户    │                                                  │
│          │                                                  │
│          │                                                  │
│ Sidebar  │                                                  │
└──────────┴──────────────────────────────────────────────────┘
```

### H5 端布局结构

```
┌────────────────────────────┐
│         NavBar             │  ← 页面标题/返回
├────────────────────────────┤
│                            │
│                            │
│         主内容区域          │
│                            │
│      (Router View)         │
│                            │
│                            │
│                            │
├────────────────────────────┤
│  首页  │  客户  │  我的    │  ← TabBar (可选显示)
└────────────────────────────┘
```

---

## API 文档

### 请求/响应格式

**统一响应格式:**

```typescript
interface ApiResponse<T> {
  code: number      // 状态码: 0=成功, 401=未授权, 404=未找到
  message: string   // 提示信息
  data: T           // 响应数据
}
```

**分页响应格式:**

```typescript
interface PageResult<T> {
  list: T[]         // 数据列表
  total: number     // 总条数
  page: number      // 当前页码
  pageSize: number  // 每页条数
}
```

### 认证接口

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/auth/login` | 用户登录 |
| POST | `/api/auth/logout` | 用户登出 |
| GET | `/api/auth/user-info` | 获取当前用户信息 |
| GET | `/api/auth/permissions` | 获取用户权限 |
| POST | `/api/auth/change-password` | 修改密码 |

**登录请求:**

```typescript
// 请求
POST /api/auth/login
{
  "username": "admin",
  "password": "123456"
}

// 响应
{
  "code": 0,
  "message": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 7200,
    "userInfo": {
      "id": "1",
      "username": "admin",
      "nickname": "超级管理员",
      "avatar": "",
      "roles": ["admin"]
    }
  }
}
```

### 系统管理接口

**用户管理:**

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/system/users` | 获取用户列表 |
| GET | `/api/system/users/:id` | 获取用户详情 |
| POST | `/api/system/users` | 创建用户 |
| PUT | `/api/system/users/:id` | 更新用户 |
| DELETE | `/api/system/users/:id` | 删除用户 |

**角色管理:**

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/system/roles` | 获取角色列表 |
| GET | `/api/system/roles/:id` | 获取角色详情 |
| POST | `/api/system/roles` | 创建角色 |
| PUT | `/api/system/roles/:id` | 更新角色 |
| DELETE | `/api/system/roles/:id` | 删除角色 |

**部门管理:**

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/system/depts` | 获取部门树 |
| GET | `/api/system/depts/:id` | 获取部门详情 |
| POST | `/api/system/depts` | 创建部门 |
| PUT | `/api/system/depts/:id` | 更新部门 |
| DELETE | `/api/system/depts/:id` | 删除部门 |

**菜单管理:**

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/system/menus` | 获取菜单树 (用于角色权限配置) |

---

## 状态管理

项目使用 Pinia 进行状态管理，所有 Store 定义在 `packages/shared/stores/` 中。

### useUserStore

管理用户登录状态和信息。

```typescript
import { useUserStore } from '@shared/stores'

const userStore = useUserStore()

// 状态
userStore.token           // JWT Token
userStore.userInfo        // 用户信息对象

// 计算属性
userStore.isLoggedIn      // 是否已登录
userStore.userId          // 用户 ID
userStore.username        // 用户名
userStore.nickname        // 昵称
userStore.avatar          // 头像
userStore.roles           // 角色列表

// 方法
await userStore.login({ username, password })  // 登录
await userStore.getUserInfo()                  // 获取用户信息
await userStore.logout()                       // 登出
userStore.resetState()                         // 重置状态
```

### usePermissionStore

管理用户权限和菜单。

```typescript
import { usePermissionStore } from '@shared/stores'

const permissionStore = usePermissionStore()

// 状态
permissionStore.menus         // 菜单树
permissionStore.permissions   // 权限标识列表
permissionStore.isLoaded      // 是否已加载

// 方法
await permissionStore.loadPermissions()           // 加载权限
permissionStore.hasPermission('system:user:add')  // 检查单个权限
permissionStore.hasAnyPermission(['a', 'b'])      // 检查任一权限
permissionStore.hasAllPermissions(['a', 'b'])     // 检查所有权限
```

### useAppStore

管理应用全局状态。

```typescript
import { useAppStore } from '@shared/stores'

const appStore = useAppStore()

// 状态
appStore.language           // 语言: 'zh-CN' | 'en-US'
appStore.theme              // 主题: 'light' | 'dark' | 'auto'
appStore.sidebarCollapsed   // 侧边栏是否收起
appStore.loading            // 全局加载状态

// 计算属性
appStore.isDark             // 是否深色模式

// 方法
appStore.setLanguage('en-US')      // 设置语言
appStore.setTheme('dark')          // 设置主题
appStore.toggleSidebar()           // 切换侧边栏
appStore.setLoading(true)          // 设置加载状态
```

### 状态持久化

使用 `pinia-plugin-persistedstate` 实现状态持久化:

| Store | 持久化字段 | 存储 Key |
|-------|-----------|----------|
| useUserStore | token | crm_user |
| useAppStore | language, theme, sidebarCollapsed | crm_app |

---

## 权限系统

### RBAC 权限模型

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│   User   │ ──► │   Role   │ ──► │   Menu   │
│   用户   │     │   角色   │     │  菜单/权限 │
└──────────┘     └──────────┘     └──────────┘
     │                │                │
     │                │                │
     ▼                ▼                ▼
  用户信息         角色信息         权限标识
  - roleIds        - menuIds        - permission
```

### 权限控制层级

1. **路由级权限** - 控制页面访问
2. **按钮级权限** - 控制操作按钮显示

### 权限标识规范

```
模块:资源:操作

示例:
- system:user:list    // 用户列表
- system:user:add     // 新增用户
- system:user:edit    // 编辑用户
- system:user:delete  // 删除用户
```

### 路由权限配置

```typescript
// packages/pc/src/router/index.ts
{
  path: '/system/user',
  name: 'SystemUser',
  component: () => import('@/pages/system/user/index.vue'),
  meta: {
    title: '用户管理',
    permission: 'system:user:list'  // 权限标识
  }
}
```

### 按钮权限使用

```vue
<!-- 方式 1: v-permission 指令 -->
<el-button v-permission="'system:user:add'">新增</el-button>

<!-- 方式 2: 直接判断 -->
<el-button v-if="permissionStore.hasPermission('system:user:add')">
  新增
</el-button>
```

---

## Mock 数据

项目使用 [MSW (Mock Service Worker)](https://mswjs.io/) 模拟后端 API。

### Mock 数据位置

```
mock/
├── handlers/           # API 处理器
│   ├── index.ts        # 统一导出
│   ├── auth.ts         # 认证相关
│   └── user.ts         # 系统管理
│
├── data/               # 模拟数据
│   └── user.ts         # 用户、角色、部门、菜单
│
└── browser.ts          # MSW 配置
```

### 添加新的 Mock 接口

1. 在 `mock/handlers/` 中创建处理器

```typescript
// mock/handlers/example.ts
import { http, HttpResponse, delay } from 'msw'

export const exampleHandlers = [
  // GET 请求
  http.get('/api/example', async () => {
    await delay(300)
    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: { /* 数据 */ }
    })
  }),

  // POST 请求
  http.post('/api/example', async ({ request }) => {
    const body = await request.json()
    await delay(500)
    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: { id: '1', ...body }
    })
  })
]
```

2. 在 `mock/handlers/index.ts` 中导出

```typescript
import { exampleHandlers } from './example'

export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...exampleHandlers  // 添加
]
```

### 禁用 Mock

如需连接真实后端，注释掉 main.ts 中的 Mock 初始化:

```typescript
// packages/pc/src/main.ts 或 packages/h5/src/main.ts

// 注释以下代码
// async function enableMocking() {
//   const { worker } = await import('@crm/mock')
//   return worker.start({ ... })
// }
// enableMocking().then(() => { ... })

// 直接启动应用
app.mount('#app')
```

---

## 部署指南

### 构建生产版本

```bash
# 构建 PC 端
pnpm build:pc

# 构建 H5 端
pnpm build:h5
```

### Nginx 配置示例

**PC 端:**

```nginx
server {
    listen 80;
    server_name crm.example.com;

    root /path/to/packages/pc/dist;
    index index.html;

    # 处理 SPA 路由
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 代理 (如需)
    location /api {
        proxy_pass http://backend-server:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # 静态资源缓存
    location /assets {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**H5 端:**

```nginx
server {
    listen 80;
    server_name m.crm.example.com;

    root /path/to/packages/h5/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend-server:8080;
    }
}
```

### 环境变量配置

创建 `.env.production` 文件:

```bash
# packages/pc/.env.production
VITE_API_BASE_URL=https://api.example.com

# packages/h5/.env.production
VITE_API_BASE_URL=https://api.example.com
```

### Docker 部署

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages ./packages
COPY mock ./mock

RUN pnpm install --frozen-lockfile
RUN pnpm build:pc

FROM nginx:alpine
COPY --from=builder /app/packages/pc/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 常见问题

### 1. 安装依赖失败

```bash
# 清除缓存后重试
pnpm store prune
rm -rf node_modules
rm -rf packages/*/node_modules
pnpm install
```

### 2. TypeScript 类型错误

```bash
# 重新生成类型声明
pnpm build:pc --mode development
# 或重启 IDE
```

### 3. Mock 数据不生效

- 检查浏览器控制台是否有 MSW 启动日志
- 确认 `public/mockServiceWorker.js` 文件存在
- 清除浏览器缓存后重试

### 4. H5 端样式不生效

- 检查是否使用了 `px` 单位
- 确认 `postcss-px-to-viewport` 配置正确
- 检查是否有样式被覆盖

### 5. 权限不生效

- 检查用户角色是否正确配置
- 确认 Mock 数据中菜单权限已添加
- 查看控制台是否有权限加载错误

### 6. 如何对接真实后端

1. 修改 API Base URL (环境变量或直接修改)
2. 注释掉 Mock 初始化代码
3. 确保后端 API 响应格式与项目一致

---

## 更新日志

### v1.0.0 (2024-01-xx)

**新功能:**
- 初始化项目结构
- 用户认证 (登录/登出)
- 权限控制 (路由级 + 按钮级)
- 系统管理 (用户/角色/部门)
- PC 端布局框架
- H5 端布局框架
- Mock 数据服务

---

## 贡献指南

### 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**类型:**
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式 (不影响功能)
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试
- `chore`: 构建/工具变更

**示例:**

```
feat(user): add user avatar upload

- Add upload component
- Add avatar preview
- Update user API

Closes #123
```

### 开发流程

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/xxx`)
3. 提交更改 (`git commit -m 'feat: add xxx'`)
4. 推送分支 (`git push origin feature/xxx`)
5. 创建 Pull Request

---

## License

[MIT](LICENSE)

---

<p align="center">
  如果这个项目对你有帮助，请给一个 Star ⭐
</p>
