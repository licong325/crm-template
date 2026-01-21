<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'

const _route = useRoute()
const router = useRouter()

// TODO: 后续使用 _route.params.id 获取客户详情

// 客户信息
const customer = ref({
  id: '1',
  name: '张三科技有限公司',
  contact: '张三',
  phone: '13800138001',
  email: 'zhangsan@example.com',
  address: '北京市朝阳区xxx街道xxx号',
  industry: '互联网',
  source: '网络推广',
  status: 1,
  remark: '重点客户，需要定期跟进',
  createTime: '2024-01-15 10:00:00'
})

// 跟进记录
const followList = ref([
  { id: '1', content: '电话沟通，客户对产品感兴趣', time: '2024-01-20 14:00' },
  { id: '2', content: '发送产品资料', time: '2024-01-18 10:00' },
  { id: '3', content: '首次拜访', time: '2024-01-15 09:00' }
])

// 拨打电话
const handleCall = () => {
  window.location.href = `tel:${customer.value.phone}`
}

// 新增跟进
const handleAddFollow = () => {
  showToast('新增跟进')
}

// 返回
const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="detail-page">
    <!-- 导航栏 -->
    <van-nav-bar title="客户详情" left-arrow @click-left="goBack" />

    <!-- 基本信息 -->
    <div class="info-card">
      <div class="card-header">
        <span class="customer-name">{{ customer.name }}</span>
        <van-tag type="success">活跃</van-tag>
      </div>
      <van-cell-group :border="false">
        <van-cell title="联系人" :value="customer.contact" />
        <van-cell title="手机号" :value="customer.phone" is-link @click="handleCall" />
        <van-cell title="邮箱" :value="customer.email" />
        <van-cell title="行业" :value="customer.industry" />
        <van-cell title="来源" :value="customer.source" />
        <van-cell title="地址" :value="customer.address" />
      </van-cell-group>
    </div>

    <!-- 备注 -->
    <div class="section-card">
      <div class="section-title">备注</div>
      <p class="remark-text">{{ customer.remark || '暂无备注' }}</p>
    </div>

    <!-- 跟进记录 -->
    <div class="section-card">
      <div class="section-header">
        <span class="section-title">跟进记录</span>
        <span class="add-btn" @click="handleAddFollow">+ 新增</span>
      </div>
      <div class="follow-list">
        <div v-for="item in followList" :key="item.id" class="follow-item">
          <div class="follow-dot"></div>
          <div class="follow-content">
            <p class="follow-text">{{ item.content }}</p>
            <p class="follow-time">{{ item.time }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部操作栏 -->
    <div class="action-bar">
      <van-button icon="phone-o" @click="handleCall">电话</van-button>
      <van-button icon="edit" type="primary">编辑</van-button>
    </div>
  </div>
</template>

<style scoped>
.detail-page {
  min-height: 100%;
  padding-bottom: 80px;
  background-color: #f7f8fa;
}

.info-card {
  margin: 12px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #f5f5f5;

    .customer-name {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }
  }
}

.section-card {
  margin: 12px;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.add-btn {
  font-size: 14px;
  color: #1989fa;
}

.remark-text {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.follow-list {
  .follow-item {
    display: flex;
    padding: 12px 0;
    border-bottom: 1px solid #f5f5f5;

    &:last-child {
      border-bottom: none;
    }
  }

  .follow-dot {
    width: 8px;
    height: 8px;
    margin-top: 6px;
    margin-right: 12px;
    background: #1989fa;
    border-radius: 50%;
  }

  .follow-content {
    flex: 1;
  }

  .follow-text {
    margin: 0 0 4px;
    font-size: 14px;
    color: #333;
  }

  .follow-time {
    margin: 0;
    font-size: 12px;
    color: #999;
  }
}

.action-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  background: #fff;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.05);

  .van-button {
    flex: 1;
  }
}
</style>
