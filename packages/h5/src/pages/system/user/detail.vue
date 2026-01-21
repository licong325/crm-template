<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { getUserDetail as fetchUserDetail } from '@shared/api'
import type { UserInfo } from '@shared/types'

const router = useRouter()
const route = useRoute()

const userId = route.params.id as string
const loading = ref(true)
const userInfo = ref<UserInfo | null>(null)

// 获取用户详情
const getUserDetail = async () => {
  loading.value = true
  try {
    userInfo.value = await fetchUserDetail(userId)
  } catch {
    // 获取失败
  } finally {
    loading.value = false
  }
}

// 编辑
const handleEdit = () => {
  router.push(`/system/user/edit/${userId}`)
}

// 返回
const onClickLeft = () => {
  router.back()
}

onMounted(() => {
  getUserDetail()
})
</script>

<template>
  <div class="user-detail-page">
    <!-- 导航栏 -->
    <van-nav-bar
      title="用户详情"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #right>
        <van-icon name="edit" size="18" @click="handleEdit" />
      </template>
    </van-nav-bar>

    <van-loading v-if="loading" class="loading" />

    <template v-else-if="userInfo">
      <!-- 用户头像和基本信息 -->
      <div class="user-header">
        <van-image
          round
          width="80"
          height="80"
          :src="userInfo.avatar || 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'"
        />
        <h3 class="nickname">{{ userInfo.nickname }}</h3>
        <van-tag :type="userInfo.status === 1 ? 'success' : 'danger'" size="large">
          {{ userInfo.status === 1 ? '启用' : '禁用' }}
        </van-tag>
      </div>

      <!-- 详细信息 -->
      <van-cell-group inset title="基本信息" class="info-group">
        <van-cell title="用户名" :value="userInfo.username" />
        <van-cell title="昵称" :value="userInfo.nickname" />
        <van-cell title="手机号" :value="userInfo.phone" />
        <van-cell title="邮箱" :value="userInfo.email" />
        <van-cell title="性别" :value="userInfo.gender === 1 ? '男' : '女'" />
      </van-cell-group>

      <van-cell-group inset title="组织信息" class="info-group">
        <van-cell title="所属部门" :value="userInfo.deptName" />
        <van-cell title="角色">
          <template #value>
            <van-tag
              v-for="role in userInfo.roleNames"
              :key="role"
              type="primary"
              size="medium"
              style="margin-left: 4px"
            >
              {{ role }}
            </van-tag>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group inset title="时间信息" class="info-group">
        <van-cell title="创建时间" :value="userInfo.createTime" />
        <van-cell title="最后登录" :value="userInfo.lastLoginTime" />
      </van-cell-group>
    </template>
  </div>
</template>

<style scoped>
.user-detail-page {
  min-height: 100vh;
  background-color: #f7f8fa;
  padding-bottom: 20px;
}

.loading {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}

.user-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.nickname {
  margin: 12px 0 8px;
  font-size: 20px;
  color: #fff;
}

.info-group {
  margin-top: 12px;
}
</style>
