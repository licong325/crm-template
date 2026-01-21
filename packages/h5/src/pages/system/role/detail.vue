<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { getRoleDetail as fetchRoleDetail, getMenuTree } from '@shared/api'
import type { RoleInfo, MenuInfo } from '@shared/types'

const router = useRouter()
const route = useRoute()

const roleId = route.params.id as string
const loading = ref(true)
const roleInfo = ref<RoleInfo | null>(null)
const menuTree = ref<MenuInfo[]>([])
const activeNames = ref<number[]>([])

// 扁平化菜单用于查找
const menuMap = ref<Map<string, MenuInfo>>(new Map())

// 构建菜单映射
const buildMenuMap = (tree: MenuInfo[], map: Map<string, MenuInfo>) => {
  tree.forEach(item => {
    map.set(item.id, item)
    if (item.children) {
      buildMenuMap(item.children, map)
    }
  })
}

// 获取角色拥有的权限树（按目录分组）
interface PermissionGroup {
  name: string
  children: string[]
}

const permissionGroups = computed(() => {
  if (!roleInfo.value?.menuIds || menuTree.value.length === 0) return []

  const groups: PermissionGroup[] = []
  const menuIds = roleInfo.value.menuIds

  // 遍历顶级目录
  menuTree.value.forEach(dir => {
    if (dir.type === 'directory' && dir.children) {
      const children: string[] = []

      // 遍历该目录下的菜单
      dir.children.forEach(menu => {
        if (menuIds.includes(menu.id)) {
          children.push(menu.name)
        }
        // 遍历按钮权限
        if (menu.children) {
          menu.children.forEach(btn => {
            if (menuIds.includes(btn.id)) {
              children.push(btn.name)
            }
          })
        }
      })

      if (children.length > 0) {
        groups.push({ name: dir.name, children })
      }
    } else if (dir.type === 'menu' && menuIds.includes(dir.id)) {
      groups.push({ name: dir.name, children: [] })
    }
  })

  return groups
})

// 加载菜单树
const loadMenuTree = async () => {
  try {
    menuTree.value = await getMenuTree()
    buildMenuMap(menuTree.value, menuMap.value)
  } catch {
    // 获取失败
  }
}

// 获取角色详情
const loadRoleDetail = async () => {
  loading.value = true
  try {
    roleInfo.value = await fetchRoleDetail(roleId)
    // 默认展开所有分组
    activeNames.value = permissionGroups.value.map((_, index) => index)
  } catch {
    // 获取失败
  } finally {
    loading.value = false
  }
}

// 编辑
const handleEdit = () => {
  router.push(`/system/role/edit/${roleId}`)
}

// 返回
const onClickLeft = () => {
  router.back()
}

onMounted(async () => {
  await loadMenuTree()
  loadRoleDetail()
})
</script>

<template>
  <div class="role-detail-page">
    <!-- 导航栏 -->
    <van-nav-bar
      title="角色详情"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #right>
        <van-icon name="edit" size="18" @click="handleEdit" />
      </template>
    </van-nav-bar>

    <van-loading v-if="loading" class="loading" />

    <template v-else-if="roleInfo">
      <!-- 角色基本信息 -->
      <div class="role-header">
        <div class="role-icon">
          <van-icon name="shield-o" size="40" color="#fff" />
        </div>
        <h3 class="role-name">{{ roleInfo.name }}</h3>
        <van-tag :type="roleInfo.status === 1 ? 'success' : 'danger'" size="large">
          {{ roleInfo.status === 1 ? '启用' : '禁用' }}
        </van-tag>
      </div>

      <!-- 详细信息 -->
      <van-cell-group inset title="基本信息" class="info-group">
        <van-cell title="角色编码" :value="roleInfo.code" />
        <van-cell title="角色描述" :value="roleInfo.description || '-'" />
        <van-cell title="排序" :value="String(roleInfo.sort)" />
        <van-cell title="创建时间" :value="roleInfo.createTime" />
      </van-cell-group>

      <!-- 权限信息 -->
      <van-cell-group inset title="权限配置" class="info-group">
        <template v-if="permissionGroups.length > 0">
          <van-collapse v-model="activeNames">
            <van-collapse-item
              v-for="(perm, index) in permissionGroups"
              :key="index"
              :title="perm.name"
              :name="index"
            >
              <template v-if="perm.children.length > 0">
                <van-tag
                  v-for="child in perm.children"
                  :key="child"
                  type="primary"
                  size="medium"
                  style="margin: 4px"
                >
                  {{ child }}
                </van-tag>
              </template>
              <span v-else class="no-permission">无子权限</span>
            </van-collapse-item>
          </van-collapse>
        </template>
        <van-cell v-else title="暂无权限配置" />
      </van-cell-group>
    </template>
  </div>
</template>

<style scoped>
.role-detail-page {
  min-height: 100vh;
  background-color: #f7f8fa;
  padding-bottom: 20px;
}

.loading {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}

.role-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.role-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

.role-name {
  margin: 12px 0 8px;
  font-size: 20px;
  color: #fff;
}

.info-group {
  margin-top: 12px;
}

.no-permission {
  color: #999;
  font-size: 14px;
}
</style>
